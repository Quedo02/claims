<?php
namespace Model;
class Policy extends ActiveRecord{
    public $id_policy;
    public $emp_ad;
    public $date;
    public $agrmt;
    public static $tabla = 'policy';
    public static $columnasDB = ['id_policy', 'emp_ad', 'date','agrmt'];
    public function __construct($args = []){
        $this->id_policy = $args['id_policy'] ?? null;
        $this->emp_ad = $args['emp_ad'] ?? '';
        $this->date = $args['date'] ?? '';
        $this->agrmt = $args['agrmt'] ?? null;
    }
}