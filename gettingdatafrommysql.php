<?php
function pastWeatherData(){
// MySQL database credentials
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'weatherdata';

// Establish MySQL database connection
$con = new mysqli($host, $username, $password, $database);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Query
$sql = "SELECT * FROM `pastWeatherData`";

// Validate query
if (!$result = $con->query($sql)) {
    die("Error in query: " . $con->error);
}

// Fetch data
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
// Close the MySQL database connection
$con->close();

return $data;
}

// Output JSON data
header("Content-Type: application/json");
echo json_encode(pastWeatherData(), JSON_PRETTY_PRINT);
?>
