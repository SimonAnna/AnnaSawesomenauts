<?php

require_once(__DIR__ . "/../model/config.php");


$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL,"
        . "salt char(128) NOT NULL,"
        . "exp int(10),"
        . "exp1 int(10),"
        . "exp2 int(10),"
        . "exp3 int(10),"
        . "exp4 int(10),"
        . "PRIMARY KEY (id))");


