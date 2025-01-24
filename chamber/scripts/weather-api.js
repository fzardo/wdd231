// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&cnt=3&appid=cd93db16281b033b3d0fe7c41bffd03e&units=imperial';

// Wrapper for the API fetch with the counter check
async function apiFetch() {
    try {
        const response = await fetch(url);
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

// Call the API fetch function
apiFetch();

// Display the Results from the API fetch
function displayResults(data) {
    // Extract the relevant data
    const currentWeather = data.list[0];
    const tempInFahrenheit = currentWeather.main.temp;
    const iconCode = currentWeather.weather[0].icon;
    const description = currentWeather.weather[0].description;

    currentTemp.innerHTML = `${tempInFahrenheit}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', description);
    captionDesc.textContent = `${description}`;
}