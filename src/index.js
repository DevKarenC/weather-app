import './index.css';
import 'core-js';
import 'regenerator-runtime/runtime';
import { API_KEY } from './ApiKey';

const weatherData = {
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
  weatherData.iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherData.iconAlt = `${data.weather[0].description} icon`;
  weatherData.description = `${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.slice(
    1,
  )}`;
  weatherData.temp = data.main.temp;
  weatherData.feelTemp = data.main.feels_like;
  weatherData.humidity = data.main.humidity;
  weatherData.wind = data.wind.speed;
}

// Display weather data on the DOM
const icon = document.querySelector('.weather-icon');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const feelTemp = document.querySelector('.feels-like-temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function displayWeather(location) {
  await getWeather(location);
  icon.src = weatherData.iconSrc;
  icon.alt = weatherData.iconAlt;
  description.textContent = weatherData.description;
  temp.textContent = `Temperature: ${weatherData.temp}`;
  feelTemp.textContent = `Feels like: ${weatherData.feelTemp}`;
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  wind.textContent = `Wind Speed: ${weatherData.wind}`;
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
  return (f - 32) * (5 / 9);
}

// Convert celsius to fahrenheit
function cToF(c) {
  return (c * 9) / 5 + 32;
}

let tempUnit = 'fahrenheit';
const tempButton = document.querySelector('.temp-button');
tempButton.addEventListener('click', convertTemperature);

function convertTemperature(temp) {
  if (tempUnit === 'fahrenheit') {
  } else {
    tempUnit = 'celsius';
  }
}
