<?php

namespace Middlewares;

use Controllers\LoginController;

class AuthMiddleware
{
    public static function handle($router = null, $next)
    {
        // ini_set('session.cookie_secure', 'On');  // NO OLVIDAR Habilitar en prod para aceptar solo https
        ini_set('session.cookie_httponly', 'On'); // Bloquear el acceso a la cookie por JavaScript
        $token = $_COOKIE['auth_token'] ?? null;

        if($token){
            $userData = LoginController::validateToken($token);
            if($userData){
                setcookie("auth_token", $token, [
                    'expires' => time() + 86400, // Expiración de 1 día
                    'path' => '/',
                    'domain' => 'localhost', // Cambia a 'tusitio.com' en producción
                    'secure' => false, // Solo HTTPS en producción
                    'httponly' => true, // No accesible por JavaScript
                    'samesite' => 'Lax', // O 'Strict' si quieres máxima seguridad
                ]);
                $isAuthenticated = isset($userData['login']); // Check user session or token
                session_start();
                $_SESSION['username'] = $userData['username']; //aqui
                $_SESSION['name'] = $userData['name'];
                $_SESSION['first_name'] = $userData['first_name'];
                $_SESSION['mail'] = $userData['mail'];
                $_SESSION['login'] = $userData['login'];
                $_SESSION['team'] = $userData['team'];
                $_SESSION['rol'] = $userData['rol']; // aqui x2

                if ($isAuthenticated) {
                    $next(); // User is authenticated, proceed
                } else {
                    http_response_code(401);
                    exit('Unauthorized');
                }
            }else{
                // Token inválido
                http_response_code(401);
                exit('Unauthorized');
            }
        }else{
            // No se envió token
            http_response_code(401);
            exit('Unauthorized');
        }
    }
}
