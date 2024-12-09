<?php
namespace Classes;

class Connection {
	private $servername;
	private $username;
	private $password;
	private $dbname;
	private $schema;

	public function __construct() {
		// Usar base de datos
		$this->username = $_ENV['db_user']; 
		$this->password = $_ENV['db_password']; 
		$this->dbname = $_ENV['database']; 
		$this->servername = $_ENV['db_host'];
	}
	
	public function startClaims() {
		try {
			// Corrección en el DSN
			$connection = new \PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
			$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			return $connection;	
		} catch (\PDOException $e) {
			// Mostrar un mensaje de error en caso de falla
			throw new \Exception("Error al conectar a la base de datos: " . $e->getMessage());
		}
	}
	
}