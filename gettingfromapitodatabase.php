<?php
// Include content of file
include("config.php");
// OpenWeatherMap API Key
$apiKey = 'c55f438e699a31156c728056b77cea2a';

$city = isset($_GET['city']) ?
$_GET['city'] : "Aurangabad";

// Fetch weather data from OpenWeatherMap API
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&units=metric";
$json = file_get_contents($apiUrl);
$weatherData = json_decode($json, true);

// Check if data for same day already exists
$date = date('Y-m-d');
$check_sql = "SELECT * FROM pastWeatherData WHERE date = '$date'";
$result = $conn->query($check_sql);

if ($result->num_rows == 0) {
    // Insert weather data into the MySQL database
    if (isset($weatherData['name'], $weatherData['weather'][0]['icon'], $weatherData['main']['temp'], $weatherData['main']['humidity'], $weatherData['wind']['speed'], $weatherData['main']['pressure'])) {
        $cityName = $weatherData['name'];
        $icon = $weatherData['weather'][0]['icon'];
        $temperature = $weatherData['main']['temp'];
        $humidity = $weatherData['main']['humidity'];
        $windSpeed = $weatherData['wind']['speed'];
        $pressure = number_format($weatherData['main']['pressure']/1013.25,2);

        // Insert data from API into the database
        $insert_sql = "INSERT INTO pastWeatherData (date, cityName, icon, temperature, humidity, windSpeed, pressure) 
                        VALUES ('$date', '$cityName', '$icon', '$temperature', '$humidity', '$windSpeed', '$pressure')";

        // Validate and do the insert query
        if ($conn->query($insert_sql)) {
            echo "API data has been inserted successfully.\n";
        } else {
            echo "Error inserting API data: " . $conn->error . "\n";
        }
    } else {
        echo "Invalid or incomplete data from the API.\n";
    }
} else {
    echo "Data at $date already exists. No need to add data.\n";
}

// Close the mysql database connection
$conn->close();
?>
