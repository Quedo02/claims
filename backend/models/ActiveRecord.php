<?php
namespace Model;

use Exception;

class ActiveRecord {

    // Base DE DATOS
    protected static $primaryKey = 'id';
    protected static $db;
    protected static $sqlSrv;
    protected static $tabla = '';
    protected static $columnasDB = [];

    // Alertas y Mensajes
    protected static $alertas = [];
    
    // Definir la conexión a la BD - includes/database.php
    public static function setDB($database) {
        self::$db = $database;
    }

    public static function setSQLSrv($database) {
        self::$sqlSrv = $database;
    }

    public static function setAlerta($tipo, $mensaje) {
        static::$alertas[$tipo][] = $mensaje;
    }
    // Validación
    public static function getAlertas() {
        return static::$alertas;
    }

    public function validar() {
        static::$alertas = [];
        return static::$alertas;
    }

    // Registros - CRUD
    public function guardar() {
        $resultado = [
            'resultado' => false,
            'id' => null
        ];
        try {
            if(!is_null($this->{static::$primaryKey})) {
                // actualizar
                $resultado = $this->actualizar();
            } else {
                // Creando un nuevo registro
                $resultado = $this->crear();
            }
        } catch (\Exception $e) {
            // En caso de error, asegúrate de que se retorne un array con error
            $resultado = [
                'resultado' => false,
                'error' => '¡Error! ' . $e->getMessage()
            ];
        }

        return $resultado;
    }

    public static function all() {
        $query = "SELECT * FROM " . static::$tabla;
        $resultado = self::consultarSQL($query);
        return $resultado;
    }
    
    // Busca un registro por su id
    public static function find($id) {
        $query = "SELECT * FROM " . static::$tabla  ." WHERE " . static::$primaryKey . " = $id";
        $resultado = self::consultarSQL($query);
        return array_shift( $resultado ) ;
    }
    
    // Obtener Registro
    public static function get($limite) {
        $query = "SELECT * FROM " . static::$tabla . " LIMIT $limite";
        $resultado = self::consultarSQL($query);
        return array_shift( $resultado ) ;
    }
    
    // Busqueda Where con Columna 
    public static function where($columna, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE $columna = '$valor'";
        $resultado = self::consultarSQL($query);
        return array_shift( $resultado ) ;
    }
    
    // SQL para Consultas Avanzadas.
    public static function SQL($consulta) {
        $query = $consulta;
        $resultado = self::consultarSQL($query);
        return $resultado;
    }

    // crea un nuevo registro
    public function crear() {
        // Sanitizar los datos
        $atributos = $this->sanitizarAtributos();
        // Construir la consulta SQL
        $columnas = array_keys($atributos);
        array_shift($columnas);
        $valores = array_map(function($valor) {
            // Si el valor es NULL, se utiliza la palabra clave NULL en la consulta
            return $valor === null ? null : "$valor";
        }, array_values($atributos));
        array_shift($valores);
    
        $a = array_fill(0, count($columnas), '?');
        
        // Insertar en la base de datos
        $query = "INSERT INTO " . static::$tabla . " (";
        $query .= join(', ', $columnas);
        $query .= ") VALUES (";
        $query .= join(', ', $a);
        $query .= ")";

        // Resultado de la consulta
        $resultado = self::$db->prepare($query);
        // Ejecutar la consulta
        $resultado = $resultado->execute($valores);
        return [
           'resultado' =>  $resultado,
           'id' => self::$db->lastInsertId()
        ];
    }

    public function actualizar() {
        try {
            // Sanitizar los datos
            $atributos = $this->sanitizarAtributos();
    
            // Crear los campos para la consulta preparada
            $valores = [];
            foreach ($atributos as $key => $value) {
                $valores[] = "{$key} = :{$key}";
            }
            
            $query = "UPDATE " . static::$tabla . " SET ";
            $query .= join(', ', $valores);
            $query .= " WHERE " . static::$primaryKey . " = :" . static::$primaryKey;
            $query .= " LIMIT 1";
            
            // Preparar la consulta
            $stmt = self::$db->prepare($query);
            
            // Añadir el ID a los atributos
            $atributos[static::$primaryKey] = $this->{static::$primaryKey};
            
            // Ejecutar la consulta
            if ($stmt->execute($atributos)) {
                return true;
            } else {
                throw new Exception('Error en la ejecución de la consulta.');
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    
    
    // Eliminar un registro - Toma el ID de Active Record
    public function eliminar(){
        // Usar la columna primaria para la condición de eliminación
        $query = "DELETE FROM "  . static::$tabla . " WHERE " . static::$primaryKey . " = :id LIMIT 1";
        
        // Preparar la consulta
        $resultado = self::$db->prepare($query);
        
        // Ejecutar la consulta con el valor de la columna primaria
        $resultado = $resultado->execute([ 'id' => $this->{static::$primaryKey} ]);
        return $resultado;
    }

    
    public static function consultarSQL($query) {
        // Consultar la base de datos
        
        $resultado = self::$db->query($query);
        // Iterar los resultados
        $array = [];
        while($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
            $array[] = static::crearObjeto($registro);
        }
        // retornar los resultados
        return $array;
    }
    
    protected static function crearObjeto($registro) {
        $objeto = new \stdClass;
    
        foreach($registro as $key => $value) {
            $objeto->$key = $value;
        }
    
        return $objeto;
    }

    // protected static function crearObjeto($registro) {
    //     $objeto = new static;
        
    //     foreach($registro as $key => $value) {
    //         // Convertir el nombre de la columna a minúsculas
    //         $key = strtolower($key);
            
    //         if(property_exists($objeto, $key)) {
    //             $objeto->$key = $value;
    //         }
    //     }
    
    //     return $objeto;
    // }

    // Identificar y unir los atributos de la BD
    public function atributos() {
        $atributos = [];
        // var_dump($this);
        // exit;
        foreach(static::$columnasDB as $columna) {
            if($columna === $this->{static::$primaryKey}) continue;
            $atributos[$columna] = $this->$columna;
        }
        return $atributos;
    }

    public function sanitizarAtributos() {
        $atributos = $this->atributos();
        $sanitizado = [];
        foreach($atributos as $key => $value ) {
            $sanitizado[$key] = $value;
        }
        return $sanitizado;
    }

    public function sincronizar($args=[]) {
        foreach($args as $key => $value) {
          if(property_exists($this, $key) && !is_null($value)) {
            $this->$key = $value;
          }
        }
    }
    
}