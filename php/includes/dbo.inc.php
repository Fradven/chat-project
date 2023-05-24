<?php
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "chat";

$link = new mysqli($db_host, $db_user, $db_pass, $db_name);
$charset = "utf8";
$link->set_charset($charset);