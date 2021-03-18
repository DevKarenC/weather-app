import { weatherData } from './Weather';

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

const temp = document.querySelector('.temp');
const feelTemp = document.querySelector('.feels-like-temp');
const wind = document.querySelector('.wind');

function convertUnit() {
  if (unit === 'imperial') {
    unit = 'metric';
    temp.textContent = `${fToC(Number(weatherData.temp))}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    feelTemp.textContent = `${fToC(Number(weatherData.feelTemp))}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    wind.textContent = `${milesToMeters(Number(weatherData.wind))} ${
      unit === 'metric' ? 'm/s' : 'mph'
    }`;
  } else {
    unit = 'imperial';
    temp.textContent = `${weatherData.temp}${unit === 'metric' ? '°C' : '°F'}`;
    feelTemp.textContent = `${weatherData.feelTemp}${
      unit === 'metric' ? '°C' : '°F'
    }`;
    wind.textContent = `${weatherData.wind} ${
      unit === 'metric' ? 'm/s' : 'mph'
    }`;
  }
}

export { unit };
