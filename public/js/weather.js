document.getElementById('search-btn').addEventListener('click', function() {
    const cityName = document.getElementById('city-name').value.trim();
    if (cityName) {
        getWeatherData(`city=${encodeURIComponent(cityName)}`);
    } else {
        alert('Please enter a city name.');
    }
});

document.getElementById('location-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherData(`lat=${lat}&lon=${lon}`);
        }, function(error) {
            console.error('Geolocation error:', error);
            alert('Geolocation failed. Please enter the city manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeatherData(query) {
    const apiKey = '2f216d7e12fc4a7093905d7847230a7f';
    const url = `https://api.weatherbit.io/v2.0/current?${query}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const weather = data.data[0];
                const weatherHTML = `
                    <div class="weather-card">
                        <h3>${weather.city_name}, ${weather.country_code}</h3>
                        <p class="temperature">${weather.temp}°C</p>
                        <p class="description">${weather.weather.description}</p>
                        <img src="https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png" alt="Weather Icon">
                        <div class="details">
                            <p>Humidity: ${weather.rh}%</p>
                            <p>Wind Speed: ${weather.wind_spd} m/s</p>
                            <p>Pressure: ${weather.pres} mb</p>
                        </div>
                    </div>
                `;
                document.getElementById('weather-results').innerHTML = weatherHTML;
            } else {
                document.getElementById('weather-results').innerHTML = '<p>No weather data available. Please check the city name or try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-results').innerHTML = '<p>Could not retrieve weather data. Please try again later.</p>';
        });
}
