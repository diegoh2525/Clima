
const apiKey = '22bc442d735ab8d9b10a83ac6c40bd3e'; // 🚨 Reemplaza esto con tu API key de OpenWeatherMap
const weatherInfo = document.getElementById('weatherInfo');

window.onload = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        weatherInfo.innerHTML = '❗ Tu navegador no soporta geolocalización.';
    }
};

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
}

function error(err) {
    console.error(err);
    weatherInfo.innerHTML = '❗ No se pudo obtener tu ubicación. Ingresa una ciudad manualmente.';
}

async function getWeatherByCoords(lat, lon) {
    weatherInfo.innerHTML = 'Obteniendo clima de tu ubicación...';
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `❗ Error: ${data.message}`;
        }
    } catch (e) {
        weatherInfo.innerHTML = '❗ Ha ocurrido un error al obtener el clima.';
        console.error(e);
    }
}

async function getWeatherByCity() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Por favor, ingresa una ciudad.');
        return;
    }

    weatherInfo.innerHTML = 'Buscando clima...';
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `❗ Error: ${data.message}`;
        }
    } catch (e) {
        weatherInfo.innerHTML = '❗ Ha ocurrido un error al obtener el clima.';
        console.error(e);
    }
}

function displayWeather(data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <p>🌡️ Temperatura: ${data.main.temp} °C</p>
        <p>🌥️ Estado: ${data.weather[0].description}</p>
        <p>💨 Viento: ${data.wind.speed} m/s</p>
    `;
}