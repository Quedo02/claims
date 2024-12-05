<?php
namespace Model;
class Mails extends ActiveRecord{
    public $id_mail;
    public $mail;
    public $user;
    public $key;
    public $flag;
    public $id_claim;
    public static $tabla = 'mails';
    public static $columnasDB = ['id_mail', 'mail', 'user','key','flag','id_claim'];
    public function __construct($args = []){
        $this->id_mail = $args['id_mail'] ?? null;
        $this->mail = $args['mail'] ?? '';
        $this->user = $args['user'] ?? '';
        $this->key = $args['key'] ?? '';
        $this->flag = $args['flag'] ?? null;
        $this->id_claim = $args['id_claim'] ?? null;
    }
}