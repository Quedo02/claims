<?php
namespace Model;
class Points extends ActiveRecord{
    public $id_points;
    public $emp_num;
    public $max_points;
    public $total_points;
    public static $tabla = 'points';
    public static $columnasDB = ['id_points', 'emp_num', 'max_points','total_points'];
    public function __construct($args = []){
        $this->id_points = $args['id_points'] ?? null;
        $this->emp_num = $args['emp_num'] ?? null;
        $this->max_points = $args['max_points'] ?? null;
        $this->total_points = $args['total_points'] ?? null;
    }
}