<?php

namespace MVC;

class Router
{
    private array $routes = [
        'GET' => [],
        'POST' => [],
        'PUT' => [],
        'DELETE' => [],
        'PATCH' => [],
        'OPTIONS' => [],
    ];

    private array $globalMiddleware = [];
    private array $groupMiddlewareStack = [];
    private ViewLoader $viewLoader;

    public function __construct(ViewLoader $viewLoader = null)
    {
        $this->viewLoader = $viewLoader;
    }

    public function use(array $middleware)
    {
        $this->globalMiddleware = array_merge($this->globalMiddleware, $middleware);
        return $this;
    }

    public function group(callable $callback, array $middleware = [])
    {
        // Save the current middleware stack
        $currentGroupMiddleware = $this->globalMiddleware;
        
        // Add the new group middleware
        $this->globalMiddleware = array_merge($this->globalMiddleware, $middleware);

        // Call the callback with the current Router instance
        $callback($this);

        // Restore the previous middleware stack after the group is defined
        $this->globalMiddleware = $currentGroupMiddleware;
    }

    public function get($url, $fn, $middleware = [])
    {
        $this->addRoute('GET', $url, $fn, $middleware);
    }

    public function post($url, $fn, $middleware = [])
    {
        $this->addRoute('POST', $url, $fn, $middleware);
    }

    public function put($url, $fn, $middleware = [])
    {
        $this->addRoute('PUT', $url, $fn, $middleware);
    }

    public function delete($url, $fn, $middleware = [])
    {
        $this->addRoute('DELETE', $url, $fn, $middleware);
    }

    public function patch($url, $fn, $middleware = [])
    {
        $this->addRoute('PATCH', $url, $fn, $middleware);
    }

    public function options($url, $fn, $middleware = [])
    {
        $this->addRoute('OPTIONS', $url, $fn, $middleware);
    }

    private function addRoute($method, $url, $fn, $middleware)
    {
        // Combine the current global middleware with the route-specific middleware
        $combinedMiddleware = array_merge($this->globalMiddleware, $middleware);

        $this->routes[$method][$url] = [
            'handler' => $fn,
            'middleware' => $combinedMiddleware
        ];
    }

    public function comprobarRutas()
    {
        $currentUrl = $_SERVER['REQUEST_URI'] ?? '/';
        $method = $_SERVER['REQUEST_METHOD'];

        // Verifica si hay rutas definidas para el método actual
        if (!isset($this->routes[$method])) {
            http_response_code(405);
            echo "Método no permitido";
            return;
        }


        // Find matching route
        $route = $this->findRoute($method, $currentUrl);

        if ($route) {
            $this->executeMiddleware($route['middleware'], $route['handler'], $route['params']);
        } else {
            http_response_code(404);
            echo "Página No Encontrada o Ruta no válida";
        }
    }

    private function findRoute($method, $currentUrl)
    {
        foreach ($this->routes[$method] as $route => $routeData) {
            // Convert route to regex pattern
            $routePattern = preg_replace('/\{([a-zA-Z0-9_-]+)\}/', '([A-Za-z0-9_-]+)', $route);
            // Add start and end anchors to the pattern
            $routePattern = '/^' . str_replace('/', '\/', $routePattern) . '\/?$/';

            // echo "<pre>";
            // var_dump($route);
            // var_dump($routePattern);
            // var_dump($currentUrl);
            // echo "</pre>";
            // echo "-------------";
            if (preg_match($routePattern, $currentUrl, $matches)) {
                array_shift($matches); // Remove the full match
                return [
                    'handler' => $routeData['handler'],
                    'middleware' => $routeData['middleware'],
                    'params' => $matches,
                ];
            }
        }

        return null; // No matching route found
    }

    private function executeMiddleware(array $middleware, $handler, array $params)
    {
        $index = 0;
        $next = function() use (&$index, $middleware, $handler, &$next, $params) {
            if ($index < count($middleware)) {
                // Determine if the middleware function expects $router
                $middlewareFunction = $middleware[$index++];
                if (is_callable($middlewareFunction)) {
                    $middlewareFunction($next, $this);
                } else {
                    $middlewareFunction($next);
                }
            } else {
                // All middleware executed, now call the main route handler
                call_user_func_array($handler, [$this, ...$params]);
            }
        };
    
        $next(); // Start the middleware chain
    }
    

    public function render($view, $data = [], $layout =  'layouts/main')
    {
        $this->viewLoader->render($view, $data, $layout);
    }
}
