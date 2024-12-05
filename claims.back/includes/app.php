<?php 

require 'funciones.php';
// require 'database.php';
require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

// Conectarnos a la base de datos
use Model\ActiveRecord;
use Classes\Connection;

$mapp = new Connection(true);
$claims = new Connection();

ActiveRecord::setDB($claims->startClaims());
ActiveRecord::setSQLSrv($mapp->startMapp());