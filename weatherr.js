document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.querySelector('.search');
  const apiKey = 'c55f438e699a31156c728056b77cea2a';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // Function to fetch weather data
  function fetchWeatherData(cityName) {
      const fullApiUrl = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

      return fetch(fullApiUrl)
          .then(response => response.json())
          .catch(error => {
              console.error('Error fetching weather data:', error);
          });
  }

  // Function to update the weather UI
  function updateWeather(weatherData) {
      const temperatureElement = document.querySelector('.temperature');
      const descriptionElement = document.querySelector('.description');
      const humidityElement = document.querySelector('.info-humidity span');
      const windElement = document.querySelector('.info-wind span');
      const pressureElement = document.querySelector('.info-pressure span');
      const weatherImageElement = document.querySelector('.weather img');

      temperatureElement.innerHTML = `${Math.round(weatherData.main.temp)}<span>°C</span>`;
      descriptionElement.innerHTML = weatherData.weather[0].description;
      humidityElement.innerHTML = `${weatherData.main.humidity}%`;
      windElement.innerHTML = `${weatherData.wind.speed.toFixed(2)} Km/h`;
      pressureElement.innerHTML = `${(weatherData.main.pressure / 1013.25).toFixed(2)} atm`;

      // Set the weather image based on weather conditions
      const weatherCondition = weatherData.weather[0].main.toLowerCase();

      switch (weatherCondition) {
          case 'snow':
              weatherImageElement.src = 'snow.png';
              break;

          case 'clear':
              weatherImageElement.src = 'clear.png';
              break;

          case 'rain':
              weatherImageElement.src = 'rain.png';
              break;

          case 'clouds':
              weatherImageElement.src = 'cloud.png';
              break;

          case 'mist':
          case 'haze':
              weatherImageElement.src = 'mist.png';
              break;

          default:
              weatherImageElement.src = 'default.png';
              break;
      }
  }

  // Function to handle the search button click
  function handleSearch() {
      const cityInput = document.querySelector('.search-bar');
      const cityName = cityInput.value.trim();

      if (cityName === '') {
          return('Aurangabad');
      }

      // Fetch and update weather data
      fetchWeatherData(cityName)
          .then(data => {
              updateWeather(data);
          });
  }

  // Add event listener to the search button
  searchButton.addEventListener('click', handleSearch);

  // Set a default location (Aurangabad in this case)
  const defaultLocation = 'Aurangabad';
  
  // Fetch and update weather data for the default location when the page loads
  fetchWeatherData(defaultLocation)
      .then(data => {
          updateWeather(data);
      });
});
