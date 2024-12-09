<?php
namespace Model;
class Usuarios extends ActiveRecord{
    public $id_usuario;
    public $nombre;
    public $apellido;
    public $email;
    public $password_hash;
    public $telefono;
    public static $tabla='usuarios';
    public static $columnasDB=['id_usuario','nombre','apellido','email','password_hash', 'telefono'];
    public static $primaryKey='id_usuario';

    public function __construct($args=[]){
        $this->id_usuario=$args['id_usuario'] ?? null;
        $this->nombre=$args['nombre'] ?? '';
        $this->apellido=$args['apellido'] ?? '';
        $this->email=$args['email'] ?? '';
        $this->password_hash=$args['password_hash'] ?? '';
        $this->telefono=$args['telefono'] ?? null;
    }

    public static function validateUser($usuario, $password){
        $query="SELECT * FROM usuarios WHERE usuario= $usuario AND psswd= $password";

        $resultado=self::SQL($query);
        return $resultado;
    }
}