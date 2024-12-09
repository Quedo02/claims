<?php
namespace Model;
class Tokens extends ActiveRecord{
    public $id_token;
    public $token;
    public $bandera;
    public $intentos;
    public static $tabla='tokens';
    public static $columnasDB=['id_token','token','bandera','intentos'];
    public static $primaryKey='id_token';

    public function __construct($args=[]){
        $this->id_token=$args['id_token'] ?? null;
        $this->token=$args['token'] ?? '';
        $this->bandera=$args['bandera'] ?? null;
        $this->intentos=$args['intentos'] ?? null;
    }
}