// Get Week Day
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const d = new Date();
// let day = weekday[d.getUTCDay()];
const indicesToKeep = [0, 8, 16, 24];

// select HTML elements in the document
const apiCards = document.querySelector('#weatherinfo');
// const tomorrowweatherIcon = document.querySelector('#tomorrow-icon');

const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-20.32&lon=-40.34&cnt=25&lang=en&appid=cd93db16281b033b3d0fe7c41bffd03e&units=metric';

// Wrapper for the API fetch with the counter check
async function apiFetch() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            displayResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('API Fetch Error:', error.message);
    }
}

// Display the Results from the API fetch
function displayResults(data) {
    indicesToKeep.forEach(index => {
        let weatherCard = document.createElement('section');
        let weather = document.createElement('figcaption');
        let weatherIcon = document.createElement('img');

        let forecastWeather = data.list[index];
        let temperature = forecastWeather.main.temp;
        let iconCode = forecastWeather.weather[0].icon;
        let description = forecastWeather.weather[0].description;

        let forecastDate = new Date(forecastWeather.dt * 1000);
        let dayName = weekday[forecastDate.getUTCDay()];

        weather.innerHTML = `${dayName}: ${temperature}°C`;
        let iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.setAttribute('src', iconSrc);
        weatherIcon.setAttribute('alt', description);

        // Append the weather information and icon to the weather card
        weatherCard.appendChild(weather);
        weatherCard.appendChild(weatherIcon);

        // Append the weather card to the apiCards container
        apiCards.appendChild(weatherCard);
    });
}


// Call the API fetch function
apiFetch();