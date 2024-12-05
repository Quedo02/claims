<?php 
require_once __DIR__ . '/../includes/app.php';
use MVC\Router;
use MVC\ViewLoader; 
use Middlewares\AuthMiddleware;
use Middlewares\CorsMiddleware;
use Controllers\LoginController;
use Controllers\ApiController;
use Controllers\FileController;
use Controllers\MailController;

$viewLoader = new ViewLoader(__DIR__ . '/../views');
$router = new Router($viewLoader);



// API
$router->group(function(Router $router){
    $router->use([CorsMiddleware::class . '::handle']); // Middleware para este grupo
    $router->options('/', function(){},[]);    
    $router->post('/', [LoginController::class, 'index']);
    $router->post('/api/{team}/{group_by}/{start_date}/{end_date}', [ApiController::class, 'KPI']);
    $router->post('/api/{emp_ad}/{start_date}/{end_date}', [ApiController::class, 'KPIQ']);
    $router->post('/api/uploadFiles', [FileController::class, 'uploadFiles']);
});

$router->group(function(Router $router){
    $router->use([CorsMiddleware::class . '::handle',/*AuthMiddleware::class . '::handle'*/]); // Middleware para este grupo
    $router->options('/api/{modelo}', function(){},[]);
    // $router->options('/api/{modelo}/{id}', function(){},[]);
    $router->get('/api/{modelo}', [ApiController::class, 'get']);
    $router->get('/auth/user', [LoginController::class, 'getUserDataFromToken']);
    $router->get('/api/{modelo}/mine', [ApiController::class, 'getMyClaims']);
    $router->get('/api/{modelo}/coordinator', [ApiController::class, 'getClaimsCoordinator']);
    $router->get('/api/{modelo}/tracingclaim/{id}', [ApiController::class, 'getTracingClaim']);
    $router->get('/api/{modelo}/{team}', [ApiController::class, 'getTeamMembers']);
    $router->get('/api/{modelo}/tracingclaim/{id}', [ApiController::class, 'getTracingClaim']);
    $router->get('/api/{id}', [MailController::class, 'sendUserMail']);
    
    $router->post('/api/{modelo}', [ApiController::class, 'create']);
    $router->delete('/api/{modelo}/{id}', [ApiController::class, 'delete']);
    $router->put('/api/{modelo}/{id}', [ApiController::class, 'update']);
    $router->post('/api/coordinator/sendMail', [MailController::class, 'sendCoordMail']);
});


//ENDPOINT LOGOUT!!!!!!!!!
// $router->get('/api/{modelo}/{filter?}/{id?}', [ApiController::class, 'handleGet']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();