<?php
header('Content-Type: application/json');
require_once("./connection.php");
date_default_timezone_set('America/Regina');
session_start();

// Obtén el año del POST, con un valor predeterminado si no se proporciona
$year = isset($_POST['year']) ? intval($_POST['year']) : date('Y');
$user_team = $_SESSION['user_team'];


// Ignorar solicitudes no respondidas
$ignore_requests = $conn->getAll("
    SELECT COUNT(u.ack) as ignored_requests
    FROM mstaudit.unclear as u
    LEFT JOIN mstaudit.laptop_users as lu ON lu.laptop = u.user 
    WHERE u.ack_timestamp IS NULL
    AND u.ack = 0
    AND lu.team = :user_team
    AND role <= 1
    AND status = 'A'
    AND YEAR(u.timestamp) = :year", ['user_team' => $user_team, 'year' => $year]);

// Obtener tiempos de respuesta con cálculo preliminar en SQL
$result_score = $conn->getAll("
    SELECT u.timestamp, u.ack_timestamp, 
           TIMESTAMPDIFF(MINUTE, u.timestamp, u.ack_timestamp) as total_minutes
    FROM mstaudit.unclear as u
    LEFT JOIN mstaudit.laptop_users as lu ON lu.laptop = u.user 
    WHERE u.ack_timestamp IS NOT NULL 
    AND lu.team = :user_team
    AND role <= 1
    AND status = 'A'
    AND YEAR(u.timestamp) = :year", ['user_team' => $user_team, 'year' => $year]);

$conn = null;

// Definir horarios laborales para cada equipo
$work_hours = [
    'FIA' => ['start' => '17:00', 'end' => '02:00', 'days' => [1, 2, 3, 4, 5]], // Lunes a Viernes
    'FIT' => ['start' => '01:00', 'end' => '10:00', 'days' => [1, 2, 3, 4, 5]], // Lunes a Viernes
    'FIM' => ['start' => '08:00', 'end' => '18:00', 'days' => [1, 2, 3, 4], 'friday' => ['start' => '08:00', 'end' => '14:00']], // Lunes a Jueves, Viernes diferente
];

// Función para ajustar minutos según horario laboral
function adjustMinutesForWorkingHours($team, $totalMinutes, $timestamp, $ack_timestamp) {
    global $work_hours;
    $workingMinutes = 0;

    $currentTime = new DateTime($timestamp);
    $endTime = new DateTime($ack_timestamp);
    
    while ($currentTime < $endTime) {
        if (isWorkingTime($team, $currentTime)) {
            $workingMinutes++;
        }
        $currentTime->modify('+1 minute');
    }

    return $workingMinutes;
}

// Función para verificar si un tiempo está dentro del horario laboral
function isWorkingTime($team, $time) {
    global $work_hours;
    $dayOfWeek = $time->format('N');
    $hour = $time->format('H:i');

    if ($team == 'FIM' && $dayOfWeek == 5) { // Viernes para FIM
        $start = $work_hours[$team]['friday']['start'];
        $end = $work_hours[$team]['friday']['end'];
    } else {
        $start = $work_hours[$team]['start'];
        $end = $work_hours[$team]['end'];
    }

    $work_start = new DateTime($time->format('Y-m-d') . ' ' . $start);
    $work_end = new DateTime($time->format('Y-m-d') . ' ' . $end);

    // Ajustar fin de día laboral para casos que cruzan la medianoche
    if ($end == '02:00' || $end == '10:00') {
        $work_end->modify('+1 day');
    }

    return $time >= $work_start && $time <= $work_end && in_array($dayOfWeek, $work_hours[$team]['days']);
}

// Arrays para almacenar los datos
$times = [];
$monthly = [];
$requestsPerMonth = [];
$longResponseCounts = 0;
$unansweredRequests = 0;
$requestsCount = count($result_score);

foreach ($result_score as $row) {
    $timestamp = $row['timestamp'];
    $ack_timestamp = $row['ack_timestamp'];
    $totalMinutes = $row['total_minutes'];

    $workingMinutes = adjustMinutesForWorkingHours($user_team, $totalMinutes, $timestamp, $ack_timestamp);
    $hours = $workingMinutes / 60;

    // Agregar al array de tiempos
    $times[] = $hours;

    // Calcular promedio mensual y anual
    $month = (new DateTime($timestamp))->format('Y-m');
    if (!isset($monthly[$month])) {
        $monthly[$month] = ['total' => 0, 'count' => 0];
    }
    $monthly[$month]['total'] += $hours;
    $monthly[$month]['count']++;

    if (!isset($requestsPerMonth[$month])) {
        $requestsPerMonth[$month] = 0;
    }
    $requestsPerMonth[$month]++;

    // Tiempos de respuesta largos (por ejemplo, mayor a 48 horas)
    if ($workingMinutes > 2880) {
        $longResponseCounts++;
    }
}

// Cálculos con comprobación de división por cero
$averageTime = count($times) > 0 ? round(array_sum($times) / count($times), 2) : 0;
$averageMonthly = array_map(function($data) {
    return $data['count'] > 0 ? round($data['total'] / $data['count'], 2) : 0;
}, $monthly);
ksort($averageMonthly);

// Preparar datos para JSON
$data = [
    'averageYearly' => $averageTime,
    'averageMonthly' => $averageMonthly,
    'requestsPerMonth' => $requestsPerMonth,
    'longResponseCounts' => $longResponseCounts,
    'unansweredRequests' => $ignore_requests[0]['ignored_requests'],
    'totalRequests' => $requestsCount,
    'availableYears' => array_column($result_years, 'year'),
];

// Enviar datos a JS
echo json_encode($data);
?>
