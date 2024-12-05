<?php
namespace Model;
class Claim extends ActiveRecord{
    public $id;
    public $affected;
    public $id_topic;
    public $rel_ticket;
    public $description;
    public $date;
    public $rootcause;
    public $fit;
    public $fia;
    public $fim;
    public $id_tracing;
    public $whosent;
    public $id_question;
    public $status;
    public static $tabla = 'claim';
    public static $columnasDB = ['id', 'affected', 'id_topic', 'rel_ticket',
    'description', 'date', 'rootcause', 'fit', 'fia', 'fim',
    'id_tracing', 'whosent', 'id_question', 'status'];

    public function __construct($args = [], $kpi = false){
        $this->id = $args['id'] ?? null;
        $this->affected = $args['affected'] ?? '';
        $this->id_topic = $args['id_topic'] ?? null;
        $this->rel_ticket = $args['rel_ticket'] ?? '';
        $this->description = $args['description'] ?? '';
        $this->date = $args['date'] ?? '';
        $this->rootcause = $args['rootcause'] ?? '';
        $this->fit = $args['fit'] ?? null;
        $this->fia = $args['fia'] ?? null;
        $this->fim = $args['fim'] ?? null;
        $this->id_tracing = $args['id_tracing'] ?? null;
        $this->whosent = $args['whosent'] ?? '';
        $this->id_question = $args['id_question'] ?? '';
        $this->status = $args['status'] ?? 0;
    }

    public static function getMyClaims(){
        // $user = $_SESSION['name'];
        $query = "SELECT claim.id as ID, affected as Affected, topicList.topic as Topic, 
        IF(claim.status = 1, topicList.points, 0) as Points, 
        claim.description as Description, claim.date as Date, WEEK(claim.date, 1) as Week, 
        claim.rel_ticket as Ticket, claim.status as Status FROM claim  
        INNER JOIN topicList ON claim.id_topic = topicList.id_topic WHERE (claim.status = 4 OR claim.status = 1) AND 
        claim.affected = 'CARRASQUEDO Juan (external)'";
        // claim.affected = '$user'";

        $resultado= self::SQL($query);
        return $resultado;
    }

    public static function getClaimsCoordinator(){
        //$user = $_SESSION['name'];
        $query = "SELECT claim.id as ID, claim.affected as Affected, topicList.topic as Topic, 
        IF(claim.status = 1, topicList.points, 0) as Points, 
        claim.description as Description, claim.date as Date, WEEK(claim.date, 1) as Week, 
        claim.rel_ticket as Ticket, claim.status as Status 
        FROM claim INNER JOIN topicList ON claim.id_topic = topicList.id_topic";

        $resultado= self::SQL($query);
        return $resultado;
    }

    public static function getValidClaim($id){
        $query="SELECT claim.id as ID, topicList.topic as Topic, claim.status as Status FROM claim 
        INNER JOIN topicList ON claim.id_topic = topicList.id_topic WHERE claim.status=1
        AND claim.id=$id;";

        $resultado=self::SQL($query);
        return $resultado;
    }

}