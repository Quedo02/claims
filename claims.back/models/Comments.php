<?php
namespace Model;
class Comments extends ActiveRecord{
    public $id_points;
    public $affected_comment;
    public $manager_comment;
    public static $tabla = 'comments';
    public static $columnasDB = ['id_comments', 'affected_comment', 'manager_comment'];
    protected static $primaryKey = 'id_comments';
    public $id_comments;
    public function __construct($args = []){
        $this->id_comments = $args['id_comments'] ?? null;
        $this->id_points = $args['id_points'] ?? null;
        $this->affected_comment = $args['affected_comment'] ?? '';
        $this->manager_comment = $args['manager_comment'] ?? '';
    }
}