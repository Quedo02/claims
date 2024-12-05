<?php
namespace Model;
class Tracing extends ActiveRecord{
    public $id_tracing;
    public $id_claim;
    public $id_comment;
    public $tracing;
    public $result;
    public $points;
    public $status;
    public static $tabla = 'tracing';
    public static $columnasDB = ['id_tracing', 'id_claim', 'id_comment',
    'tracing', 'result', 'points', 'status'];
    protected static $primaryKey = 'id_tracing';
    public function __construct($args = []){
        $this->id_tracing = $args['id_tracing'] ?? null;
        $this->id_claim = $args['id_claim'] ?? null;
        $this->id_comment = $args['id_comment'] ?? null;
        $this->tracing = $args['tracing'] ?? '';
        $this->result = $args['result'] ?? '';
        $this->points = $args['points'] ?? null;
        $this->status = $args['status'] ?? null;
    }
    
    public static function getTracingClaim($id){
        $query="SELECT c.*, t.*
                FROM comments c
                JOIN tracing t ON c.id_comments = t.id_comment
                WHERE t.id_claim=$id";
 
        $resultado=self::SQL($query);
        return $resultado;
    }
}