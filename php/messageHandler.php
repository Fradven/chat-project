<?php

$username = $_POST["username"];
$massage = $_POST["message"];
$action = $_POST["action"];

require_once './includes/dbo.inc.php';
require_once './includes/function.inc.php';

messageHandler($username, $massage, $action, $link);