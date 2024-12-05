<?php
namespace Model;
class Logs extends ActiveRecord{
    public $id_logs;
    public $author;
    public $creation_date;
    public $id_claim;
    public static $tabla = 'logs';
    public static $columnasDB = ['id_logs', 'author', 'creation_date','id_claim'];
    public function __construct($args = []){
        $this->id_logs = $args['id_logs'] ?? null;
        $this->author = $args['author'] ?? '';
        $this->creation_date = $args['creation_date'] ?? '';
        $this->id_claim = $args['id_claim'] ?? null;
    }
}