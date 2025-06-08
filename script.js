const API_KEY = '2b5bcb10c8b84d6c98e20929250806';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error('도시를 찾을 수 없습니다.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
        return null;
    }
}

function updateWeatherUI(data) {
    cityName.textContent = data.location.name;
    weatherIcon.src = data.current.condition.icon;
    temperature.textContent = `${data.current.temp_c}°C`;
    weatherDescription.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
}

async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('도시 이름을 입력해주세요.');
        return;
    }

    const weatherData = await getWeatherData(city);
    if (weatherData) {
        updateWeatherUI(weatherData);
    }
}

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
