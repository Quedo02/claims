<?php
namespace Classes;

class Connection {
	private $servername;
	private $username;
	private $password;
	private $dbname;
	private $schema;

	public function __construct($is_planning_resources = false) {
		if($is_planning_resources){
			// Usar base de datos mapp
			$this->username = $_ENV['mapp_user']; // Usuario de mapp
			$this->password = $_ENV['mapp_password']; // Contraseña de mapp
			$this->dbname = $_ENV['mapp_db']; // Nombre de mapp
			$this->servername = $_ENV['mapp_host']; //Host de mapp
			$this->schema=$is_planning_resources ? "planning-resources" : ""; //Schemas de la bd
		}else{
			//Usar base de datos de claims
			$this->username = $_ENV['claims_user']; 
			$this->password = $_ENV['claims_password']; 
			$this->dbname = $_ENV['claims_db']; 
			$this->servername = $_ENV['claims_host'];
		}		
	}

	public function startClaims(){
		try {
			$connection = new \PDO("mysql:host=$this->servername;dbname=$this->dbname", "$this->username", "$this->password");
			$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			return $connection;	
		} catch (\PDOException $e) {
			// Mostrar un mensaje de error en caso de falla
			print "¡Error! en $this->dbname: " . $e->getMessage() . "<br/>";
			die();
		}
	}

	public function startMapp(){
		try {
			$connection = new \PDO("sqlsrv:Server=$this->servername;Database=$this->dbname;TrustServerCertificate=true", "$this->username", "$this->password");
			$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);		
			return $connection;
		} catch (\PDOException $e) {
			// Mostrar un mensaje de error en caso de falla
			print "¡Error! en $this->dbname: " . $e->getMessage() . "<br/>";
			die();
		}
	}
}