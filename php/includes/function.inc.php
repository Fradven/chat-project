<?php

function login($user, $pass, $link)
{
    $req = $link->prepare("SELECT * FROM users WHERE user = ? AND password = ?");
    $req->bind_param("ss", $user, $pass);
        
    $req->execute();

    $result = $req->get_result();

    if($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        $_SESSION["ID_user"] = $user["id"];
        echo json_encode(array("success" => "Utilisateur OK", "user" => $user));   
    }
    else {
        echo json_encode(array("error" => "Utilisateur non valide!"));   
    }
}

function fetchUser($link)
{
    $req = $link->prepare("SELECT * FROM users WHERE id != ?");
    $req->bind_param("s", $_SESSION["ID_user"]);
    $req->execute();

    $result = $req->get_result();
    if($result->num_rows > 0)
    {
        $users= [];
        $i = 0;
        while($user = $result->fetch_assoc()){
            $users[$i] = $user;
            $i++;
        }
        //var_dump($users);
        echo json_encode(array("users" => $users), true);
    }
}