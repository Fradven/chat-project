<?php

$username = $_POST["username"];
$pwd = $_POST["pwd"];

require_once './includes/dbo.inc.php';
require_once './includes/function.inc.php';

login($username, $pwd, $link);