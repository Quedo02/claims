<?php

namespace MVC;

class ViewLoader
{
    private string $viewsPath;

    public function __construct(string $viewsPath)
    {
        $this->viewsPath = rtrim($viewsPath, '/');
    }

    /**
     * Render a view with optional data.
     *
     * @param string $view The namespaced view identifier (e.g., 'home.index').
     * @param array $data Data to be extracted and made available to the view.
     * @param string|null $layout Optional layout to use.
     */
    public function render(string $view, array $data = [], ?string $layout = 'layouts/main')
    {
        $viewFile = $this->convertNamespaceToPath($view);

        if (!file_exists($viewFile)) {
            throw new \Exception("View file not found: {$viewFile}");
        }

        // Extract data array to variables
        extract($data);

        // Start output buffering
        ob_start();
        include $viewFile;
        $content = ob_get_clean();

        // Render within a layout if provided
        if ($layout) {
            $layoutFile = $this->convertNamespaceToPath($layout);
            if (!file_exists($layoutFile)) {
                throw new \Exception("Layout file not found: {$layoutFile}");
            }
            include $layoutFile;
        } else {
            echo $content;
        }
    }

    /**
     * Convert a namespaced view string to a file path.
     *
     * @param string $namespace The namespaced view string (e.g., 'home.index').
     * @return string The corresponding file path.
     */
    private function convertNamespaceToPath(string $namespace): string
    {
        return $this->viewsPath . '/' . str_replace('/', '/', $namespace) . '.php';
    }
}
