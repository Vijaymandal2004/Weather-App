document.getElementById('get-weather-btn').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('city-input').value.trim();  // Get city name from input
    const errorMessage = document.getElementById('error-message'); // Error message element
    const weatherInfo = document.getElementById('weather-info'); // Weather information element

    // Clear any previous error or weather information
    errorMessage.innerText = '';
    weatherInfo.innerHTML = '';

    if (!city) {
        errorMessage.innerText = 'Please enter a city name.';
        return;
    }

    const apiKey = 'd8b76a0d5f98581b2a143baa827445e6'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url); // Fetch data from OpenWeatherMap API
        const data = await response.json();

        if (data.cod === '404') {
            errorMessage.innerText = 'City not found! Please try again.';
            return;
        }

        // Display weather information
        displayWeather(data);
    } catch (error) {
        errorMessage.innerText = 'Error fetching data. Please try again later.';
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const { name, main, weather } = data; // Destructure data for easy access

    // Generate the HTML to display weather information
    const weatherDetails = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;

    document.getElementById('weather-info').innerHTML = weatherDetails;
}
