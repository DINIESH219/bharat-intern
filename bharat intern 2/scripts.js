document.addEventListener("DOMContentLoaded", () => {
    const getWeatherButton = document.getElementById("get-weather");
    const locationInput = document.getElementById("location");
    const weatherDataDiv = document.getElementById("weather-data");

    getWeatherButton.addEventListener("click", () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    // Fetch weather data based on user-inputted location
    async function fetchWeatherData(location) {
        try {
            const apiKey = '5a24b0b47c461d1fed31181beb77e016';  // Replace with your OpenWeatherMap API key
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                weatherDataDiv.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherDataDiv.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
        }
    }

    // Display weather data on the web page
    function displayWeatherData(data) {
        const weatherHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherDataDiv.innerHTML = weatherHTML;
    }
});
