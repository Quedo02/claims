<?php 
namespace Controllers;
use MVC\Router;
use Model\ActiveRecord;
use Model\Claim;
use Model\Kpi;
use Model\Mapp;
use function PHPSTORM_META\type;

class ApiController{
    public static function get(Router $router, $modelo){
        $modelo = "Model\\" . ucfirst($modelo);
        try{
            $objects = $modelo::all();
            // var_dump($objects);
            // exit;
            $resultado = [
                'code'=>200,
                'response'=>$objects,
            ];
            echo json_encode($resultado);
            exit;
        }catch(\Exception $e){
            $resultado = [
                'code'=>400,
                'response'=>$e
            ];
        }
    }
    public static function create(Router $router, $modelo){
        // $modelo = "Model\\" . ucfirst(rtrim($modelo, 's'));
        $modelo = "Model\\" . ucfirst($modelo);
        $object = new $modelo();
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $data = json_decode(file_get_contents('php://input'), true);
            // var_dump($data);
            // exit;
            $object->sincronizar($data);
            // var_dump($object);
            // exit;
            $resultado = $object->guardar();
            // var_dump($resultado);
            // exit;
            if($resultado['resultado']){
                $resultado = [
                    'code'=>201,
                    'response'=>$resultado['id']
                ];
                echo json_encode($resultado);
                exit;
            }else{
                $resultado = [
                    'code'=>400,
                    'response'=>"Me rompi"
                ];
                echo json_encode($resultado);
                exit;
            }
        }
    }
    public static function update(Router $router, $modelo, $id){
        $modelo = "Model\\" . ucfirst($modelo);
        $object = new $modelo((array)$modelo::find($id));
        if($_SERVER['REQUEST_METHOD']==='PUT'){
            $data = json_decode(file_get_contents('php://input'), true);
            $object->sincronizar($data);
            $resultado = $object->guardar();
            if($resultado){
                $resultado = [
                    'code'=>201,
                    'response'=>$object
                ];
                echo json_encode($resultado);
                exit;
            }else{
                $resultado = [
                    'code'=>400,
                    'response'=>"no"
                ];
                echo json_encode($resultado);
                exit;
            }
        }
    }
    public static function delete(Router $router, $modelo, $id){
        $modelo = "Model\\" . ucfirst($modelo);
        $object = new $modelo((array) $modelo::find($id));
        if($_SERVER['REQUEST_METHOD']==='DELETE'){
            $resultado = $object->eliminar();
            if($resultado){
                $resultado = [
                    'code'=>201,
                ];
                echo json_encode($resultado);
                exit;
            }else{
                $resultado = [
                    'code'=>400,
                    'response'=>"no"
                ];
                echo json_encode($resultado);
                exit;
            }
        }
    }
}