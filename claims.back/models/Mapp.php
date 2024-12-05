<?php
namespace Model;
class Mapp extends ActiveRecord{
    private $team;
    private $rol;
    public function __construct($args=[]){
        $this->team = $args['team'] ?? '';
        $this->rol = $args['rol'] ?? null;
    }
    public static function user_data($member_name){
        $sql = "SELECT TOP(1) emp_team, emp_role, emp_name
                FROM [planning-resources].users
                WHERE emp_ad = ? 
                AND emp_status = ? 
                AND (emp_team = ? OR emp_team = ? OR emp_team = ? OR emp_team = ? OR emp_team = ?)";
        $params = array($member_name, "A", "IT_MON_FIM", "IT_MON_FIT", "IT_MON_FIA", "MON_FIM_INT", "IT_CLOUD_FIM");
        $stmt = self::$sqlSrv->prepare($sql);
        $stmt->execute($params);
        $data = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $data; 
    }

    public static function getTeamMembers($team, $trainee = false){
        $sql = "SELECT emp_name
                FROM [planning-resources].users
                WHERE emp_status = ? ";

        $sql .= (!$trainee) ? "AND emp_role = 0" : "AND emp_role <> 1 AND emp_role <> 2"; 
        
        // Si el equipo no es "all", agregamos la condición del equipo
        $params = array("A"); // Param para emp_status
        if ( strtolower($team) !== "all") {
            $sql .= " AND emp_team = ?";
            $params[] = $team; // Agregamos el valor de emp_team a los parámetros
        }else {
            $sql .= " AND (emp_team = 'IT_MON_FIM' OR emp_team = 'IT_MON_FIT' OR emp_team = 'IT_MON_FIA' OR emp_team = 'MON_FIM_INT')";
        }

        // Preparamos y ejecutamos la consulta
        $stmt = self::$sqlSrv->prepare($sql);
        $stmt->execute($params);
        $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $data;        
    }
}