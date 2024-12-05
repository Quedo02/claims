<?php 
namespace Controllers;
use MVC\Router;
use Model\ActiveRecord;
use Model\Claim;
use Model\Kpi;
use Model\Mapp;
use function PHPSTORM_META\type;

class ApiController{
    public static function get(Router $router, $modelo){
        $modelo = "Model\\" . ucfirst($modelo);
        try{
            $objects = $modelo::all();
            $resultado = [
                'code'=>200,
                'response'=>$objects,
            ];
            echo json_encode($resultado);
            exit;
        }catch(\Exception $e){
            $resultado = [
                'code'=>400,
                'response'=>$e
            ];
        }
    }
    public static function create(Router $router, $modelo){
        // $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        $modelo = "Model\\" . ucfirst($modelo);
        $object = new $modelo();
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $data = json_decode(file_get_contents('php://input'), true);
            $object->sincronizar($data);
            $resultado = $object->guardar();
            if($resultado['resultado']){
                $resultado = [
                    'code'=>201,
                    'response'=>$resultado['id']
                ];
                echo json_encode($resultado);
                exit;
            }else{
                $resultado = [
                    'code'=>400,
                    'response'=>"Me rompi"
                ];
                echo json_encode($resultado);
                exit;
            }
        }
    }
    public static function update(Router $router, $modelo, $id){
        $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        $object = new $modelo((array)$modelo::find($id));
        if($_SERVER['REQUEST_METHOD']==='PUT'){
            $data = json_decode(file_get_contents('php://input'), true);
            $object->sincronizar($data);
            $resultado = $object->guardar();
            if($resultado){
                $resultado = [
                    'code'=>201
                ];
                echo json_encode($resultado);
                exit;
            }else{
                $resultado = [
                    'code'=>400,
                    'response'=>"no"
                ];
                echo json_encode($resultado);
                exit;
            }
        }
    }
    public static function delete(Router $router, $modelo, $id){
        $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        $object = new $modelo((array) $modelo::find($id));
        if($_SERVER['REQUEST_METHOD']==='DELETE'){
            $resultado = $object->eliminar();
            if($resultado){
                $resultado = [
                    'code'=>201,
                ];
                echo json_encode($resultado);
                exit;
            }else{
                $resultado = [
                    'code'=>400,
                    'response'=>"no"
                ];
                echo json_encode($resultado);
                exit;
            }
        }
    }

    public static function KPI(Router $router, $team, $group_by, $start_date, $end_date) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                $team_members = Mapp::getTeamMembers($team, true);
                $members = implode("','" ,array_column($team_members, 'emp_name'));
                $results = [];
                $kpi_data = Kpi::getKPI($members, $group_by, $start_date, $end_date);
                foreach ($kpi_data as $data) {
                    
                    $period = $data->period;
                    $whosent = $data->whosent;
                    $total_claims = (int) $data->total_claims;
                    switch ($group_by) {
                        case 'daily':
                            if (!isset($results[$period])) {
                                $results[$period] = ['External' => ['count' => 0], 'Internal' => ['count' => 0]];
                            }
                            $results[$period][$whosent]['count'] += $total_claims;
                            break;
                        case 'monthly':
                            $month = date('F', strtotime($period)); // Nombre del mes
                            if (!isset($results[$month])) {
                                $results[$month] = ['External' => ['count' => 0], 'Internal' => ['count' => 0]];
                            }
                            $results[$month][$whosent]['count'] += $total_claims;
                            break;
                        case 'weekly':
                            $week = date('W-Y', strtotime($period)); // Número de semana del año
                            if (!isset($results[$week])) {
                                $results[$week] = ['External' => ['count' => 0], 'Internal' => ['count' => 0]];
                            }
                            $results[$week][$whosent]['count'] += $total_claims;
                            break;
                        case 'yearly':
                            $year = date('Y', strtotime($period)); // Año
                            if (!isset($results[$year])) {
                                $results[$year] = ['External' => ['count' => 0], 'Internal' => ['count' => 0]];
                            }
                            $results[$year][$whosent]['count'] += $total_claims;
                            break;
                        default:
                            throw new \Exception('Invalid group_by value');
                    }
                }
                echo json_encode([
                    'code' => 200,
                    'response' => $results
                ]);
                exit;
    
            } catch (\Exception $e) {
                echo json_encode(['code' => 500, 'response' => 'Error processing request: ' . $e->getMessage()]);
                exit;
            }
        } else {
            echo json_encode(['code' => 405, 'response' => 'Invalid request method']);
            exit;
        }
    }

    public static function KPIQ(Router $router, $emp_ad, $start_date, $end_date) {
        $emp_name='';
        $results = [];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                $user_data = Mapp::user_data($emp_ad);

                if (!empty($user_data)) {
                    $emp_name=$user_data['emp_name'];
                }

                $kpi_data = Kpi::getKPIQ($emp_name, $start_date, $end_date);
                echo json_encode([
                    'code' => 200,
                    'response' => $kpi_data
                ]);
                exit;
    
            } catch (\Exception $e) {
                echo json_encode(['code' => 500, 'response' => 'Error processing request: ' . $e->getMessage()]);
                exit;
            }
        } else {
            echo json_encode(['code' => 405, 'response' => 'Invalid request method']);
            exit;
        }
    }


    public static function getMyClaims(Router $router, $modelo){
        $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        try{
            $objects = $modelo::getMyClaims();
            $resultado = [
                'code'=>200,
                'response'=>$objects,
            ];
            echo json_encode($resultado);
            exit;
        }catch(\Exception $e){
            $resultado = [
                'code'=>400,
                'response'=>$e
            ];
        }
    }
    public static function getClaimsCoordinator(Router $router, $modelo){
        $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        try{
            $objects = $modelo::getClaimsCoordinator();
            $resultado = [
                'code'=>200,
                'response'=>$objects,
            ];
            echo json_encode($resultado);
            exit;
        }catch(\Exception $e){
            $resultado = [
                'code'=>400,
                'response'=>$e
            ];
        }
    }

    public static function getTeamMembers(Router $router, $modelo, $team){
        $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        try{
            $objects = $modelo::getTeamMembers($team, true);
            $resultado = [
                'code'=>200,
                'response'=>$objects,
            ];
            echo json_encode($resultado);
            exit;
        }catch(\Exception $e){
            $resultado = [
                'code'=>400,
                'response'=>$e
            ];
        }
    }

    public static function getTracingClaim(Router $router, $modelo, $id){
        $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        try{
            $objects = $modelo::getTracingClaim($id);
            $resultado = [
                'code'=>200,
                'response'=>$objects,
            ];
            echo json_encode($resultado);
            exit;
        }catch(\Exception $e){
            $resultado = [
                'code'=>400,
                'response'=>$e
            ];
        }
    }

    public static function handleGet(Router $router, $modelo, $filtro = null, $id = null) {
        $modelo = "Model\\" . ucfirst($modelo);
        try {
            switch ($filtro) {
                case 'mine':
                    $response = $modelo::getMyClaims();
                    break;
                case 'coordinator':
                    $response = $modelo::getClaimsCoordinator();
                    break;
                case 'tracingclaim':
                    if ($id) {
                        $response = $modelo::getTracingClaim($id);
                    } else {
                        throw new \Exception('ID required for tracingclaim');
                    }
                    break;
                case 'team':
                    if ($id) {
                        $response = $modelo::getTeamMembers($id);
                    } else {
                        throw new \Exception('Team parameter required');
                    }
                    break;
                default:
                    if ($id) {
                        // Caso: GET específico por ID (no definido explícitamente en tu lógica)
                        $response = $modelo::find($id);
                    } else {
                        // Caso general: GET todos los registros
                        $response = $modelo::all();
                    }
            }

            echo json_encode(['code' => 200, 'response' => $response]);
        } catch (\Exception $e) {
            echo json_encode(['code' => 500, 'response' => $e->getMessage()]);
        }
    }
}