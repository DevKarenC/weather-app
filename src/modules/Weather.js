import { API_KEY } from '../ApiKey';
import { displayImage } from './BackgroundImage';
import { unit } from './ToggleUnit';
import { parseCSV } from './ParseCountryCodes';

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

// Handle error
const errorMessage = document.querySelector('.error-msg');
const ERROR_MSG_CITY =
  'No matching location found. Try again with a different city name.';
const ERROR_MSG_INPUT = 'Please type in a city name.';

// Making an API call to get the weather data
async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY.OPEN_WEATHER_API_KEY}`,
    {
      mode: 'cors',
    },
  );
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    // Use destructuring for the nested data object
    const {
      name,
      sys: { country },
      weather,
      main: { temp, feels_like, humidity },
      wind: { speed },
    } = data;

    weatherData.city = `${name}`;
    weatherData.country = `${country}`;
    weatherData.iconSrc = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherData.iconAlt = `${weather[0].description} icon`;
    weatherData.description = `${weather[0].description[0].toUpperCase()}${weather[0].description.slice(
      1,
    )}`;
    weatherData.temp = Math.round(temp);
    weatherData.feelTemp = Math.round(feels_like);
    weatherData.humidity = humidity;
    weatherData.wind = Math.round(speed);
    errorMessage.textContent = '';
    displayImage(location);
    parseCSV();
  } else if (data.cod === '404') {
    throw new Error('No matching city');
  } else if (data.cod === '400') {
    throw new Error('No input');
  }
}

// Display weather data on the DOM
const icon = document.querySelector('.weather-icon');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const feelTemp = document.querySelector('.feels-like-temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function displayWeather(location) {
  await getWeather(location).catch((error) => {
    if (error.message === 'No matching city') {
      errorMessage.textContent = ERROR_MSG_CITY;
    } else if (error.message === 'No input') {
      errorMessage.textContent = ERROR_MSG_INPUT;
    }
  });
  icon.src = weatherData.iconSrc;
  icon.alt = weatherData.iconAlt;
  description.textContent = weatherData.description;
  temp.textContent = `${weatherData.temp}${unit === 'metric' ? '°C' : '°F'}`;
  feelTemp.textContent = `${weatherData.feelTemp}${
    unit === 'metric' ? '°C' : '°F'
  }`;
  humidity.textContent = `${weatherData.humidity}%`;
  wind.textContent = `${weatherData.wind} ${unit === 'metric' ? 'm/s' : 'mph'}`;
}

export { weatherData, displayWeather };
