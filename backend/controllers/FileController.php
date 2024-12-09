<?php
namespace Controllers;
use MVC\Router;
use Model\Files;

class FileController{
    public static function uploadFiles(Router $router) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Verificar si existe el campo 'id' en los datos enviados
            $id_file = $_POST['id_file'] ?? null;  // Usamos ?? para asegurarnos de que si no existe, $id_file será null
    
            if (!$id_file) {
                // Si no se pasa el id de la reclamación, devolver error
                echo json_encode([
                    'code' => 400,
                    'response' => 'Se necesita un id de reclamación'
                ]);
                exit;
            }
    
            // Directorio donde se guardarán los archivos
            $uploadsDir = __DIR__ . '/../payFile/';
            $fileFolder = $uploadsDir . $id_file;
    
            // Crear la carpeta si no existe
            if (!file_exists($fileFolder)) {
                mkdir($fileFolder, 0777, true); // Usar permisos 0777 para asegurarnos de que es accesible
            }
    
            // Array donde almacenaremos la información de los archivos subidos
            $filesUploaded = [];
    
            // Verificamos que los archivos estén presentes en la solicitud
            if (isset($_FILES['files']) && !empty($_FILES['files']['name'])) {
                // Procesamos cada archivo
                foreach ($_FILES['files']['name'] as $key => $filename) {
                    // Obtenemos el nombre temporal del archivo
                    $fileTmpPath = $_FILES['files']['tmp_name'][$key];
                    $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
    
                    // Generar un nuevo nombre para el archivo
                    $fileCount = count(scandir($fileFolder)) - 2; // Número de archivos en la carpeta (restando los '.' y '..')
                    $newFilename = $id_file . '_' . ($fileCount + 1) . '.' . $fileExtension;
    
                    // Ruta donde guardaremos el archivo
                    $filePath = $fileFolder . '/' . $newFilename;
    
                    // Mover el archivo del directorio temporal a la carpeta destino
                    if (move_uploaded_file($fileTmpPath, $filePath)) {
                        $filesUploaded[] = [
                            'filename' => $newFilename,
                            'originalname' => $filename,
                            'path' => $filePath
                        ];
                    } else {
                        // Si ocurre un error al mover el archivo, devolver un error
                        echo json_encode([
                            'code' => 500,
                            'response' => 'Error al subir el archivo ' . $filename
                        ]);
                        exit;
                    }
                }
    
                // Si los archivos se suben correctamente, devolver el éxito
                echo json_encode([
                    'code' => 201,
                    'response' => 'Archivos subidos correctamente',
                    'folder' => $id_file,
                    'files' => $filesUploaded
                ]);
                exit;
            } else {
                // Si no se enviaron archivos, devolver un error
                echo json_encode([
                    'code' => 400,
                    'response' => 'No se enviaron archivos'
                ]);
                exit;
            }
        } else {
            // Si no es una solicitud POST, devolver un error
            echo json_encode([
                'code' => 405,
                'response' => 'Método de solicitud no permitido'
            ]);
            exit;
        }
    }
}