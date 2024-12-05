<?php
namespace Classes;
 
class LdapConnection {
    public static $instance;
    private $ldapServer;
    private $ldapBindDN;
    private $ldapBindPassword;
    private $userLDAP;
    private $ldapConnection;
 
    private function __construct($args = []) {
        $this -> ldapServer = $args['ldapServer'] ?? $_ENV['ldap_host'];
        $this -> ldapBindDN = $args['ldapBindDN'] ?? $_ENV['ldap_dn'];
        $this -> ldapBindPassword = $args['ldapBindPassword'] ?? $_ENV['ldap_password'];
        $this -> userLDAP = $args['userLDAP'] ?? $_ENV['ldap_user'];
    }
 
    public static function getInstance($args = []) {
        if (!self::$instance) {
            self::$instance = new self($args);
        }
        return self::$instance;
    }
 
    public function connect() {
        $this->ldapConnection = ldap_connect($this->ldapServer);
        if (!$this->ldapConnection) {
            throw new \Exception("Error: No se pudo conectar al servidor LDAP.");
        }
       
        ldap_set_option($this->ldapConnection, LDAP_OPT_REFERRALS, 0);
        ldap_set_option($this->ldapConnection, LDAP_OPT_PROTOCOL_VERSION, 3);
 
        $ldapBind = @ldap_bind($this->ldapConnection, $this->userLDAP, $this->ldapBindPassword);
        if (!$ldapBind) {
            throw new \Exception("Error: No se pudo autenticar con el servidor LDAP.");
        }
 
        return $this->ldapConnection;
    }
 
    public function getAttributesByUsername($username, $attributes){
        $this->connect();
        // Búsqueda de usuario
        $filter = '(&(objectCategory=person)(samaccountname=' . $username . '))';
        $searchResult = ldap_search($this->ldapConnection, $this->ldapBindDN, $filter, $attributes);
        if (!$searchResult) {
            throw new \Exception("Error: No se pudo realizar la búsqueda LDAP.");
        }
   
        $ldapEntries = ldap_get_entries($this->ldapConnection, $searchResult);
        if (!$ldapEntries) {
            throw new \Exception("Error: No se pudieron obtener los atributos LDAP.");
        }
 
        $this->disconnect();
        return $ldapEntries;
    }
 
    public function getAttributesByEmail($email, $attributes){
        $this->connect();
 
        // Búsqueda de usuario
        $filter = '(&(objectCategory=person)(mail=' . $email . '))';
       
        $searchResult = ldap_search($this->ldapConnection, $this->ldapBindDN, $filter, $attributes);
        if (!$searchResult) {
            throw new \Exception("Error: No se pudo realizar la búsqueda LDAP.");
        }
   
        $ldapEntries = ldap_get_entries($this->ldapConnection, $searchResult);
        if (!$ldapEntries) {
            throw new \Exception("Error: No se pudieron obtener los atributos LDAP.");
        }
 
        $this->disconnect();
       
        return $ldapEntries;
    }
 
 
 
    public function disconnect() {
        ldap_close($this->ldapConnection);
    }
}
 