import './index.css';
import 'core-js';
import 'regenerator-runtime/runtime';
import { API_KEY } from './ApiKey';

const weatherData = {
  city: '',
  country: '',
  iconSrc: '',
  iconAlt: '',
  description: '',
  temp: '',
  feelTemp: '',
  humidity: '',
  wind: '',
};

// Making an API call to get the weather data
async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`,
    {
      mode: 'cors',
    },
  );
  const data = await response.json();
  console.log(data);
  weatherData.city = `${data.name}`;
  weatherData.country = `${data.sys.country}`;
  weatherData.iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherData.iconAlt = `${data.weather[0].description} icon`;
  weatherData.description = `${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.slice(
    1,
  )}`;
  weatherData.temp = Math.round(data.main.temp);
  weatherData.feelTemp = Math.round(data.main.feels_like);
  weatherData.humidity = data.main.humidity;
  weatherData.wind = Math.round(data.wind.speed);
}

// Display weather data on the DOM
const cityCountry = document.querySelector('.city-country');
const icon = document.querySelector('.weather-icon');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const feelTemp = document.querySelector('.feels-like-temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function displayWeather(location) {
  await getWeather(location);
  cityCountry.textContent = `${weatherData.city}, ${weatherData.country}`;
  icon.src = weatherData.iconSrc;
  icon.alt = weatherData.iconAlt;
  description.textContent = weatherData.description;
  temp.textContent = `Temperature: ${weatherData.temp}${
    unit === 'metric' ? '°C' : '°F'
  }`;
  feelTemp.textContent = `Feels like: ${weatherData.feelTemp}${
    unit === 'metric' ? '°C' : '°F'
  }`;
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  wind.textContent = `Wind Speed: ${weatherData.wind} ${
    unit === 'metric' ? 'm/s' : 'mph'
  }`;
}

// Handling user's location search
const form = document.querySelector('.input-group');
const searchButton = document.querySelector('#search-button');
form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('submit', handleSearch);

function handleSubmit(e) {
  e.preventDefault();
  displayWeather(e.target[0].value);
  this.reset();
}

function handleSearch(e) {
  displayWeather(e.target.value);
}

// Convert fahrenheit to celsius
function fToC(f) {
  return Math.round((f - 32) * (5 / 9));
}

// Convert miles per hour to meter/second
function milesToMeters(miles) {
  return Math.round(miles / 2.23694);
}

let unit = 'imperial';
const unitButton = document.querySelector('.unit-button');
unitButton.addEventListener('click', convertUnit);

function convertUnit() {
  if (unit === 'imperial') {
    unit = 'metric';
    temp.textContent = `Temperature: ${fToC(Number(weatherData.temp))}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    feelTemp.textContent = `Feels like: ${fToC(Number(weatherData.feelTemp))}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    wind.textContent = `Wind Speed: ${milesToMeters(
      Number(weatherData.wind),
    )} ${unit === 'metric' ? 'm/s' : 'mph'}`;
  } else {
    unit = 'imperial';
    temp.textContent = `Temperature: ${weatherData.temp}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    feelTemp.textContent = `Feels like: ${weatherData.feelTemp}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    wind.textContent = `Wind Speed: ${weatherData.wind} ${
      unit === 'metric' ? 'm/s' : 'mph'
    }`;
  }
}

// Display weather for San Francisco as default
displayWeather('San Francisco');
