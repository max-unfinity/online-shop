<?php
$servername = "localhost";
$username = "username"; // Update with your username
$password = "password"; // Update with your password
$dbname = "online_shop";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
