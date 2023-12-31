const container = document.querySelector('.container')
const search = document.querySelector('.search')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')

search.addEventListener('click', () => {
	const APIKey = 'c55f438e699a31156c728056b77cea2a'
	const city = document.querySelector('.search-bar').value

	if (city == '') 
  return

	else 
  fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then((response) => response.json())
    console.log(json)
		.then((json) => {
			const image = document.querySelector('.weather-box img')
			const temperature = document.querySelector('.weather-box .temperature')
			const description = document.querySelector('.weather-box .description')
			const humidity = document.querySelector('.weather-details .humidity span')
			const wind = document.querySelector('.weather-details .wind span')
			const pressure = document.querySelector('.pressure span')

			switch (json.weather[0].main) {
				case 'Clear':
					image.src = 'clear.png'
					break

				case 'Rain':
					image.src = 'rain.png'
					break

				case 'Snow':
					image.src = 'snow.png'
					break

				case 'Clouds':
					image.src = 'cloud.png'
					break

				case 'Mist':
					image.src = 'mist.png'
					break

				case 'Haze':
					image.src = 'mist.png'
					break

				default:
					image.src = 'cloud.png'
					break
			}

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
			description.innerHTML = `${json.weather[0].description}`
			humidity.innerHTML = `${json.main.humidity}%`
			wind.innerHTML = `${json.wind.speed}Km/h`
			pressure.innerHTML = `${json.main.pressure}atm`
		})
})