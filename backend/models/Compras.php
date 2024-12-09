<?php
namespace Model;
class Compras extends ActiveRecord{
    public $id_compra;
    public $id_usuario;
    public $id_curso;
    public $id_token;
    public static $tabla='compras';
    public static $columnasDB=['id_compra','id_usuario','id_curso','id_token'];
    public static $primaryKey='id_compra';

    public function __construct($args=[]){
        $this->id_compra=$args['id_compra'] ?? null;
        $this->id_usuario=$args['id_usuario'] ?? null;
        $this->id_curso=$args['id_curso'] ?? null;
        $this->id_token=$args['id_token'] ?? null;
    }
}