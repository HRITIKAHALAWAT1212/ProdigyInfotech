const apiKey = '36cffe0267e64a84a39142129242007'; 
const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const resetBtn = document.getElementById('resetBtn');

async function fetchWeather(location) {
    try {
        // Fetch weather data from WeatherAPI
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Check for API errors
        if (data.error) {
            throw new Error(data.error.message);
        }

        displayWeather(data);
    } catch (error) {
        console.error('Fetch error:', error); 
        weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const conditions = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const icon = data.current.condition.icon;
    const sunrise = data.forecast.forecastday[0].astro.sunrise;
    const sunset = data.forecast.forecastday[0].astro.sunset;

    weatherInfo.innerHTML = 
        <div class="weather-card">
            <img src="${icon}" alt="${conditions}"/>
            <h2>${location}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Conditions:</strong> ${conditions}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} kph</p>
            <p><strong>Sunrise:</strong> ${sunrise}</p>
            <p><strong>Sunset:</strong> ${sunset}</p>
        </div>
    ;
}

function handleFetchWeather() {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherInfo.innerHTML = '<p class="error">Please enter a location</p>';
    }
}

function clearAll() {
    weatherInfo.innerHTML = '';
    locationInput.value = '';
}

fetchWeatherBtn.addEventListener('click', handleFetchWeather);
resetBtn.addEventListener('click', clearAll);
