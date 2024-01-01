//Student Name: Bishant Rajbanshi
document.addEventListener( 'DOMContentLoaded' , function () {
  // Select the search button element from HTML
  const searchButton = document.querySelector('.searched');
  let cityName = '';
  const apiKey = 'Your weather api';
  // Function to fetch weather data from OpenWeatherMap API
  function fetchWeatherData(cityName) {

    const comApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    // Fetch weather data and handle JSON response
    return fetch(comApiUrl)
      .then(response => response.json())
      .catch(error => {
        // Log an error message if there is an issue while fetching data
        console.error('Error fetching weather data:', error);
      });
  }

  // Function to update the weather user interface based on the data fetched
  function updateWeather(weatherData) {
    // Select elements for temperature, description, humidity, wind, pressure, and weather image
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
    // Set the weather image based on weather conditions using switch case
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
     cityName = cityInput.value.trim();

    // If the input is empty, set a default location to Aurangabad.
    if (cityName === '') {
      return fetchWeatherData()
        .then(data => {
          updateWeather(data);
          updateCity();
        });
    }

    // Fetch and update weather data based on the entered city name
    fetchWeatherData(cityName)
      .then(data => {
        updateWeather(data);
        updateCity();
      });
  }

  // Add event listener to the search button to trigger handleSearch function
  searchButton.addEventListener('click', handleSearch);

  // Set a default location (Aurangabad) and fetch/update weather data on page load
  const defaultLocation = 'Aurangabad';

  fetchWeatherData(defaultLocation)
    .then(data => {
      updateWeather(data);
      updateCity();
    });
  //function to update date,month and year
    function updateDate()
     {
      const dateElement = document.getElementById("current-date");
      const now = new Date();
      const options = {month: 'long', day: 'numeric', year: 'numeric'};
      const dateString = now.toLocaleString('en-US', options);
      dateElement.textContent = dateString;
  }

  // Update date and time initially
  updateDate();
  //function to update city name default or searched name
  function updateCity() {
    const cityyElement = document.getElementById("cityy");
    if (cityName === '')
      cityyElement.innerHTML = defaultLocation;
    else
      cityyElement.innerHTML = cityName;
  }

  updateCity()

});
