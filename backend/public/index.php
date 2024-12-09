<?php 
require_once __DIR__ . '/../includes/app.php';
use MVC\Router;
use MVC\ViewLoader; 
use Middlewares\AuthMiddleware;
use Middlewares\CorsMiddleware;
use Controllers\LoginController;
use Controllers\ApiController;
use Controllers\FileController;

$viewLoader = new ViewLoader(__DIR__ . '/../views');
$router = new Router($viewLoader);
$router->group(function(Router $router){
    $router->use([CorsMiddleware::class . '::handle']); // Middleware para este grupo
    $router->options('/', function(){},[]);    
    $router->post('/', [LoginController::class, 'index']);
    $router->post('/api/uploadFiles', [FileController::class, 'uploadFiles']);
});

$router->group(function(Router $router){
    $router->use([CorsMiddleware::class . '::handle',/*AuthMiddleware::class . '::handle'*/]); // Middleware para este grupo
    $router->options('/api/{modelo}', function(){},[]);
    // $router->options('/api/{modelo}/{id}', function(){},[]);


    $router->get('/api/{modelo}', [ApiController::class, 'get']);
    $router->post('/api/{modelo}', [ApiController::class, 'create']);
    $router->delete('/api/{modelo}/{id}', [ApiController::class, 'delete']);
    $router->put('/api/{modelo}/{id}', [ApiController::class, 'update']);
});

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();