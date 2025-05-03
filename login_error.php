<?php

session_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In Error</title>
    <link rel="stylesheet" href="css/style3.css">
</head>

<body>
    <div class="dashboard error-container">
        <h2 class="welcome-note">Log In Error</h2>
        
        <p>
            <?= isset($_SESSION['error']) ? htmlspecialchars($_SESSION['error']) : "An unknown error occurred."; ?>
        </p>

        <button id="logout"><a href="./session_destroy.php">Return to Log In</a></button>
    </div>
</body>

</html>
