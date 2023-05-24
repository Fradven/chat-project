<?php
session_start();

switch ($_POST["action"]) {
    case "login":
        include 'connection.php';
        break;

    case "session":
        if (!isset($_SESSION["id_user"]) && !isset($_COOKIE["id_user"]))
            echo json_encode(array("session" => "none"), true);
        else {
            if (isset($_SESSION["id_user"]))
                echo json_encode(array("session" => $_SESSION["id_user"]), true);
            else if (isset($_COOKIE["id_user"]))
                echo json_encode(array("session" => $_COOKIE["id_user"]), true);
        }
        break;

    case "list-user":
        require_once './includes/dbo.inc.php';
        require_once './includes/function.inc.php';
        fetchUser($link);
        break;

    case "logout":
        session_destroy();
        echo json_encode(array("kill" => "session killed"), true);
        break;
}