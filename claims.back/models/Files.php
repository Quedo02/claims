<?php
namespace Model;

class Files {
    public $filename;
    public $path;

    public function __construct($filename = "", $path = "") {
        $this->filename = $filename;
        $this->path = $path;
    }
}
