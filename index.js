// Get references to HTML elements
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const recommendationResult = document.getElementById('recommendationResult');
const forecastResult = document.getElementById('forecastResult');
const forecastButton = document.getElementById('forecastButton'); // New button
const fiveDaysForecast = document.querySelector('.five-days-forecast')





// Event handler for button click
async function getWeatherAndRecommendation() {
    const location = locationInput.value;

    try {
        // Fetch weather data from a real Weather API (e.g., OpenWeatherMap)
        const weatherData = await fetchWeather(location);
        weatherResult.innerHTML = `Current temperature: ${weatherData.main.temp}°C`;

        // Fetch clothing recommendations based on weather conditions
        const recommendations = getRecommendations(weatherData.weather[0].main);
        recommendationResult.innerHTML = `Weather-appropriate Clothing: ${recommendations.join(', ')}`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Event handler for button click (5-day forecast)
async function getForecast() {
    const location = locationInput.value;

    try {
        // Fetch 5-day forecast data from OpenWeatherMap API
        const forecastData = await fetchForecast(location);

        // Process and display the forecast data
        const forecastItems = forecastData.list; // Array of forecast items
        const forecastResults = forecastItems.map(item => {
            const dateTime = item.dt_txt; // Date and time of the forecast
            const temperature = item.main.temp; // Temperature in Celsius
            const weatherCondition = item.weather[0].description; // Weather condition
            return `${dateTime}: ${temperature}°C, ${weatherCondition}`;
        });

        // Display the forecast results
        forecastResult.innerHTML = `<h3>Your 5-days forecast:</h3><br>${forecastResults.join('<br>')}`;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}


// Fetch weather data from OpenWeatherMap API
async function fetchWeather(location) {
    const apiKey = '75bdbc9f29e6f3dbefc93ac1bcb76661';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Unable to fetch weather data');
       
    };
    return response.json();
}

// Fetch 5-day forecast data from OpenWeatherMap API
async function fetchForecast(location) {
    const apiKey = '75bdbc9f29e6f3dbefc93ac1bcb76661';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
    const response = await fetch(forecastUrl);
    if (!response.ok) {
        throw new Error('Unable to fetch forecast data');
    }
    return response.json();
}

// Custom logic for clothing recommendations
function getRecommendations(weatherCondition) {
    // Replace with your own logic based on weather conditions
    if (weatherCondition === 'Clear') {

        return ['Sunglasses', 'Lightweight Fabrics'];

    } else if (weatherCondition === 'Rain') {

        return ['Umbrella', 'Raincoat'];

    }  else if (weatherCondition === 'cold') {

        return ['Medium-weight coat', 'scarfs & gloves'];

    } else {
        return ['Thick jacket, boots and glooves'];
    }
}

// Attach event listener to the button
// document.getElementById('getWeatherButton').addEventListener('click', getWeatherAndRecommendation);
forecastButton.addEventListener('click', getForecast); // New button listener

// add event lsiterner for the forecast button
// forecastButton.addEventListener('click', ()=>{
//     console.log("working")
//     if(fiveDaysForecast.style.diplay === "none"){
        
//         fiveDaysForecast.style.display = "block";
//         console.log("test")

//     }else{
//         fiveDaysForecast.style.display = "none";
//     }
// })