<?php
namespace Model;
class Simuladores extends ActiveRecord{
    public $id_simulador;
    public $simulador;
    public $precio;
    public static $tabla='simuladores';
    public static $columnasDB=['id_simulador','simulador','precio'];
    public static $primaryKey='id_simulador';

    public function __construct($args=[]){
        $this->id_simulador=$args['id_simulador'] ?? null;
        $this->simulador=$args['simulador'] ?? '';
        $this->precio=$args['precio'] ?? null;
    }
}