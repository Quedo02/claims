<?php
namespace Model;
class Kpi extends ActiveRecord{
    public $period;
    public $total_claims;
    public $whosent;

    public static $columnasDB = ['whosent', 'period', 'total_claims'];
    public function __construct($args = []){
            $this->whosent = $args['whosent'] ?? '';
            $this->period = $args['period'] ?? null;
            $this->total_claims = $args['total_claims'] ?? null;
    }

    public static function getKPI($members, $group_by, $start_date, $end_date) {
        
        $valid_group_by = ['daily', 'weekly', 'monthly', 'yearly'];
        if (!in_array($group_by, $valid_group_by)) {
            throw new \Exception('Invalid group_by value');
        }

        switch ($group_by) {
            case 'daily':
                $select = "DATE_FORMAT(date, '%Y-%m-%d') AS period";
                break;
            case 'weekly':
                $select = "CONCAT(YEAR(date), '-W', LPAD(WEEKOFYEAR(date), 2, '0')) AS period";
                break;
            case 'monthly':
                $select = "DATE_FORMAT(date, '%Y-%m') AS period";
                break;
            case 'yearly':
                $select = "DATE_FORMAT(date, '%Y') AS period";
                break;
            default:
        }

        $query= "SELECT $select, whosent, COUNT(*) AS total_claims FROM claim 
        WHERE status = 1 AND affected in ('$members') AND date BETWEEN '$start_date' AND '$end_date' AND whosent IS NOT NULL
        GROUP BY period, whosent 
        ORDER BY period, whosent DESC;";
        
        $resultado = self::SQL($query);

        return $resultado;
    }

    public static function getKPIQ($emp_name, $start_date, $end_date) {

        $query= "SELECT claim.id as ID, topicList.points as Points, claim.id_question as Questions FROM claim 
        INNER JOIN topicList ON claim.id_topic = topicList.id_topic 
        WHERE claim.status = 1 AND claim.affected = '$emp_name' AND date BETWEEN '$start_date' AND '$end_date'";
        $resultado = self::SQL($query);

        return $resultado;
    }
}