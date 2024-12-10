<?php

namespace Middlewares;

class CorsMiddleware
{
    public static function handle($next, $router = null)
    {
        header("Access-Control-Allow-Origin: http://localhost:5173");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            // Optionally, set response code to 200
            http_response_code(200);
            // End script execution
            exit();
        }


        $next();
    }
}