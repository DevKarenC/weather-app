import './index.css';
import 'core-js';
import 'regenerator-runtime/runtime';
import { API_KEY } from './ApiKey';

// Making an API call to get the weather data
async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`,
    {
      mode: 'cors',
    },
  );
  const json = await response.json();
  return json;
}

// Display weather data on the DOM
const icon = document.querySelector('.weather-icon');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const feelTemp = document.querySelector('.feels-like-temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function displayWeather(location) {
  const data = await getWeather(location);
  console.log(data);
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = `${data.weather[0].description} icon`;
  description.textContent = `${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.slice(
    1,
  )}`;
  temp.textContent = `Temperature: ${data.main.temp}`;
  feelTemp.textContent = `Feels like: ${data.main.feels_like}`;
  humidity.textContent = `Humidity: ${data.main.humidity}`;
  wind.textContent = `Wind Speed: ${data.wind.speed}`;
}

// Handling user's location search
const form = document.querySelector('.input-group');
const searchButton = document.querySelector('#search-button');
form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('submit', handleSearch);

function handleSubmit(e) {
  const input = e.target[0].value;
  e.preventDefault();
  displayWeather(input);
  this.reset();
}

function handleSearch(e) {
  const input = e.target.value;
  displayWeather(input);
}

// Convert fahrenheit to celsius
function fToC(f) {
  return (f - 32) * (5 / 9);
}

// Convert celsius to fahrenheit
function cToF(c) {
  return (c * 9) / 5 + 32;
}
