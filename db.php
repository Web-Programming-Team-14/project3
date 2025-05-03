<?php

function getHostUsername() {
    return substr(explode("/", $_SERVER["SCRIPT_NAME"])[1], 1);
}

function getDB() {
    $name = getHostUsername();
    $host = "localhost";
    $user = "nnguyen177";
    $pass = "nnguyen177";
    $dbname = "nnguyen177";

    return new mysqli($host, $user, $pass, $dbname);
}

function initTables() {
    $db = getDB();

    $db->query(
        "CREATE TABLE IF NOT EXISTS User(
            username VARCHAR(100) NOT NULL PRIMARY KEY,
            email TEXT NOT NULL,
            fname TEXT NOT NULL,
            lname TEXT,
            pass VARCHAR(72) NOT NULL,
            perm INT
            )"
    );

    $db->close();
}

function hashPass($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

function verifyPass($password, $email) {
    $db = getDB();
    $sql = "SELECT pass FROM User WHERE email=?";
    $statement = $db->prepare($sql);
    $statement->bind_param("s", $email);
    $statement->execute();
    $intermediate = $statement->get_result();
    $result = $intermediate->fetch_assoc();
    $internalPass = $result["pass"];
    $db->close();

    return password_verify($password, $internalPass);
}

function createUser() {
    $db = getDB();
	$registerName =$_POST["username"];
	$registerEmail = $_POST["email"];
	$registerFirstName = $_POST["firstname"];
	$registerLastName = $_POST["lastname"];
	$registerPass = hashPass($_POST["password"]);
	$permNum = 1;
    $statement = $db->prepare("INSERT INTO User (username, email,fname,lname, pass,perm) VALUES(?, ?, ?, ?, ?, ?)");
    $statement->bind_param("sssssi", $registerName, $registerEmail, $registerFirstName, $registerLastName, $registerPass, $permNum);
    $statement->execute();
	$db->close();
}

?>