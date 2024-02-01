// Bishant Rajbanshi
document.addEventListener('DOMContentLoaded', function () {
  // Select the search button element from HTML
  const searchButton = document.querySelector('.searched');
  const container = document.querySelector('.container');
  const weatherBox = document.querySelector('.weather-box'); 
  const weatherDetails = document.querySelector('.weather-details');
  const error404 = document.querySelector('.not-found');
//let city name early for default value
  let cityName = '';
  const apiKey = 'Your OpenWeatherAPI';

  // Function to fetch weather data from OpenWeatherMap API
  function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    // Fetch weather data and handle JSON response
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => {
//error case if city name is error it shows error
        if (json.cod =='404'){
          container.style.height = '400px';
          weatherBox.classList.remove('active');
          weatherDetails.classList.remove('active');
          error404.classList.add('active');
          return;
        }

          container.style.height = '555px';
          weatherBox.classList.add('active');
          weatherDetails.classList.add('active');
          error404.classList.remove('active');

          updateWeather(json);
      });
  }
  // function to convert country code
  function convertCountryCode(country) {
    try {
      let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(country);
    } catch (error) {
      console.error('Error converting country code:', error);
      return 'Unknown Region';
    }
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
     updateCity(cityName, weatherData.sys.country);
  }

  // Function to handle the search button click
  function handleSearch() {
    const cityInput = document.querySelector('.search-bar');
    cityName = cityInput.value.trim();

    // If the input is empty, set a default location to Aurangabad.
    if (cityName === '')
     {
      cityName = 'Aurangabad';
    }

    // Fetch and update weather data based on the entered city name
    fetchWeatherData(cityName)

  }

  // Add event listener to the search button to trigger handleSearch function
  searchButton.addEventListener('click', handleSearch);

  // Set a default location (Aurangabad) and fetch/update weather data on page load
  const defaultLocation = 'Aurangabad';

  fetchWeatherData(defaultLocation)

  // function to update date, month, and year
  function updateDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateString = now.toLocaleString('en-US', options);
    dateElement.textContent = dateString;
  }

  // Update date and time initially and every second while it's open
  updateDate();

  // set interval of 1 sec
  setInterval(updateDate, 1000);

  // function to update city name default or searched name
  function updateCity(cityName,country) {
    const cityElement = document.getElementById('city-name');
    cityy='';
    
    if (cityName === '') {
      cityy = `${defaultLocation}, ${convertCountryCode(country)}`;
    }
    else {
      cityy = `${cityName}, ${convertCountryCode(country)}`;
    }
      cityElement.innerHTML = cityy;
  }
  

  // update city instantly
  updateCity();
});
async function insert_past_data() {
  try {
    const response = await fetch('gettingdatafrommysql.php')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log(data)

    // Sort data based on the date in descending order
    data.sort((a, b) => new Date(b.date) - new Date(a.date));


    const divs = document.querySelectorAll('.past_data div')
    //insert data in the each divs
    if (data.length > 0) {
      divs.forEach((div, i) => {
        div.innerHTML = `
        <p style = 'text-align:center'><b>Date</b>: ${data[i].date}</p>
        <p><img src="http://openweathermap.org/img/wn/02d@2x.png", height="30px", width="30px">Temperature: ${data[i].temperature}°C </p>
        <p><img src="https://github.com/BishantRajbanshi/weatherApp/blob/main/images/water-regular-24.png?raw=true", height="30px", width="30">Humidity: ${data[i].humidity}%</p>
        <p><img src="https://github.com/BishantRajbanshi/weatherApp/blob/main/images/wind-regular-24.png?raw=true", height="30px", width="30">Wind_speed: ${data[i].windSpeed} Km/hr</p>
        <p><img src="https://github.com/BishantRajbanshi/weatherApp/blob/main/images/pressure.png?raw=true",  height="30px", width="30">Pressure: ${data[i].pressure} atm</p>
        `
      })
    } else {
      divs.forEach(
        (div) =>
          (div.innerHTML =
            '<h1 style = "padding-top: 30px; text-align: center">No data available</h1>')
      )
    }
  } catch (error) {
    console.error('Error fetching or parsing data:', error)
  }
}

insert_past_data()
