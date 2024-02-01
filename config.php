<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weatherdata";

$conn = new mysqli($servername, $username, $password);

// Check the database connection
if ($conn->connect_error) {
    header('HTTP/1.1 500 Internal Server Error');
    die('Database connection error: ' . $conn->connect_error);
} else {
    echo "Connection successfully established. ";

    // Create database if not exists
    $sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
    if ($conn->query($sql_create_db) === TRUE) {
        echo "Database created or already exists. ";
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        die('Error creating database: ' . $conn->error);
    }

    // Select the created or existing database
    $conn->select_db($dbname);

    // Create table if not exists
    $sql_create_table = "CREATE TABLE IF NOT EXISTS pastweatherdata (
        id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        date DATE NULL DEFAULT NULL,
        cityName VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
        icon VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
        temperature FLOAT NULL DEFAULT NULL,
        humidity FLOAT NULL DEFAULT NULL,
        windspeed FLOAT NULL DEFAULT NULL,
        pressure FLOAT NULL DEFAULT NULL,
        PRIMARY KEY (`id`) USING BTREE
    )
    COLLATE='utf8mb4_0900_ai_ci'
    ENGINE=InnoDB
    ROW_FORMAT=DYNAMIC";

    if ($conn->query($sql_create_table) === TRUE) {
        echo "Table created or already exists. ";
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        die('Error creating table: ' . $conn->error);
    }
}
?>
