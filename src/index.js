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
const weatherDataSection = document.querySelector('.weather-data');
async function displayWeather(location) {
  const data = await getWeather(location);
  const temp = data.main.temp;
  console.log(data);
  // weatherDataSection.append(temp);
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
  // this.reset();
}

function handleSearch(e) {
  const input = e.target.value;
  displayWeather(input);
}
