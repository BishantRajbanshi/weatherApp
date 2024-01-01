// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  // Select the search button element
  const searchButton = document.querySelector('.searched');

  // OpenWeatherMap API key and endpoint URL
  const apiKey = 'c55f438e699a31156c728056b77cea2a';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // Function to fetch weather data from OpenWeatherMap API
  function fetchWeatherData(cityName) {
    // Construct the full API URL with query parameters
    const fullApiUrl = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    // Fetch weather data and handle JSON response
    return fetch(fullApiUrl)
      .then(response => response.json())
      .catch(error => {
        // Log an error message if there is an issue fetching data
        console.error('Error fetching weather data:', error);
      });
  }

  // Function to update the weather UI based on the fetched data
  function updateWeather(weatherData) {
    // Select UI elements for temperature, description, humidity, wind, pressure, and weather image
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.info-humidity span');
    const windElement = document.querySelector('.info-wind span');
    const pressureElement = document.querySelector('.info-pressure span');
    const weatherImageElement = document.querySelector('.weather img');

    // Update UI elements with weather data
    temperatureElement.innerHTML = `${Math.round(weatherData.main.temp)}<span>°C</span>`;
    descriptionElement.innerHTML = weatherData.weather[0].description;
    humidityElement.innerHTML = `${weatherData.main.humidity}%`;
    windElement.innerHTML = `${weatherData.wind.speed.toFixed(2)} Km/h`;
    pressureElement.innerHTML = `${(weatherData.main.pressure / 1013.25).toFixed(2)} atm`;

    // Set the weather image based on weather conditions
    const weatherCondition = weatherData.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case 'snow':
        weatherImageElement.src = 'images/snow.png';
        break;

      case 'clear':
        weatherImageElement.src = 'images/clear.png';
        break;

      case 'rain':
        weatherImageElement.src = 'images/rain.png';
        break;

      case 'clouds':
        weatherImageElement.src = 'images/cloud.png';
        break;

      case 'mist':
      case 'haze':
        weatherImageElement.src = 'images/mist.png';
        break;

      default:
        weatherImageElement.src = 'images/404.png';
        break;
    }
  }

  // Function to handle the search button click
  function handleSearch() {
    // Select the city input element
    const cityInput = document.querySelector('.search-bar');
    // Get the trimmed value of the city input
    const cityName = cityInput.value.trim();

    // If the input is empty, set a default location (Aurangabad)
    if (cityName === '') {
      return fetchWeatherData('Aurangabad')
        .then(data => {
          updateWeather(data);
        });
    }

    // Fetch and update weather data based on the entered city name
    fetchWeatherData(cityName)
      .then(data => {
        updateWeather(data);
      });
  }

  // Add event listener to the search button to trigger handleSearch function
  searchButton.addEventListener('click', handleSearch);

  // Set a default location (Aurangabad) and fetch/update weather data on page load
  const defaultLocation = 'Aurangabad';
  fetchWeatherData(defaultLocation)
    .then(data => {
      updateWeather(data);
    });
});
