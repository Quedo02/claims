<?php
namespace Model;
class TopicList extends ActiveRecord{
    public $id_topic;
    public $topic;
    public $points;
    public static $tabla = 'topicList';
    public static $columnasDB = ['id_topic', 'topic', 'points'];
    public function __construct($args = []){
        $this->id_topic = $args['id_topic'] ?? null;
        $this->topic = $args['topic'] ?? '';
        $this->points = $args['points'] ?? null;
    }
}