//Bishant Rajbanshi
// Waits for the DOM content to be fully loaded before executing JavaScript codes



//function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(city) {
    // Fetch weather data and handle JSON response
  return fetch(apiUrl)
    .then(response => {
        //checks if successful 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //Parse the json response and update the weather display
      return response.json();
    })
    .then(json => {
      updateWeather(json);
      //set the weather data in local storage
      localStorage.setItem(city.toLowerCase(), JSON.stringify(json));
      return json;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      // Handle error (e.g., display a message to the user)
    });
}

// function to convert country code to name
  function convertCountryCode(country) {
    try {
      let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(country);
    } catch (error) {
      console.error('Error converting country code:', error);
      return 'Unknown Region';
    }
  }

// Function to update weather display
  function updateWeather(weatherData) {
      //setting element to display weather information
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.info-humidity span');
    const windElement = document.querySelector('.info-wind span');
    const pressureElement = document.querySelector('.info-pressure span');
    const weatherImageElement = document.querySelector('.weather img');
// Updating the UI (weather information)
    temperatureElement.innerHTML = `${Math.round(weatherData.main.temp)}<span>°C</span>`;
    descriptionElement.innerHTML = weatherData.weather[0].description;
    humidityElement.innerHTML = `${weatherData.main.humidity}%`;
    windElement.innerHTML = `${weatherData.wind.speed.toFixed(2)} Km/h`;
    pressureElement.innerHTML = `${(weatherData.main.pressure / 1013.25).toFixed(2)} atm`;
//Determine weaather condtion and set image accordingly
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    switch (weatherCondition) {
      case 'snow' :
        weatherImageElement.src= 'https://raw.githubusercontent.com/BishantRajbanshi/weatherApp/main/images/snow.png';
        break;
      case 'clear':
        weatherImageElement.src = 'https://raw.githubusercontent.com/BishantRajbanshi/weatherApp/main/images/clear.png';
        break;
      case 'rain':
        weatherImageElement.src = 'https://raw.githubusercontent.com/BishantRajbanshi/weatherApp/main/images/rain.png';
        break;
      case 'clouds':
        weatherImageElement.src = 'https://github.com/BishantRajbanshi/weatherApp/blob/main/images/cloud.png?raw=true';
        break;
      case 'mist':
      case 'haze':
        weatherImageElement.src = 'https://github.com/BishantRajbanshi/weatherApp/blob/main/images/mist.png?raw=true';
        break;
      default:
        weatherImageElement.src = 'https://github.com/BishantRajbanshi/weatherApp/blob/main/images/404.png';
        break;
    }
    //Update cityname in the weather display
    updateCity(cityName, weatherData.sys.country);
  }
// Function to handle search button click
  function handleSearch() {
    const cityInput = document.querySelector('.search-bar');
    cityName = cityInput.value.trim();

    if (cityName !== '') {
        //Fetch weather data if entered city
      fetchWeatherData(cityName);
    }
  }
// Event listener to search button
  searchButton.addEventListener('click', handleSearch);

//function to update current date display
  function updateDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateString = now.toLocaleString('en-US', options);
    dateElement.textContent = dateString;
  }
// Update date initially and at regular interval
  updateDate();
  setInterval(updateDate, 1000);

// Function to update city name in weather display above image
  function updateCity(cityName, country) {
    const cityElement = document.getElementById('city-name');
    let city = '';
    if (cityName === '') {
      city = `${defaultLocation}, ${convertCountryCode(country)}`;
    } else {
      city = `${cityName}, ${convertCountryCode(country)}`;
    }
    cityElement.innerHTML = city;
  }

//Setting weather data for the deafault city initially
  const defaultLocation = 'aurangabad';
  const storedWeatherData = localStorage.getItem(defaultLocation);
  if (storedWeatherData) {
    const weatherData = JSON.parse(storedWeatherData);
    updateWeather(weatherData);
  } else {
    fetchWeatherData(defaultLocation);
  }

  updateCity(defaultLocation, 'IN');

//function to add past data in the html divs
  async function insert_past_data() {
    try {
        //fetching form the database server
      const response = await fetch('gettingdatafrommysql.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //Parse the data
      const data = await response.json();
        // sorting the data
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
        //selecting div elements
      const divs = document.querySelectorAll('.past_data div');

