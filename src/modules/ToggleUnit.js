import { weatherData } from './Weather';

const UNITS = {
  metric: {
    temp: '°C',
    wind: 'm/s',
  },
  imperial: {
    temp: '°F',
    wind: 'mph',
  },
};

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
    temp.textContent = `${fToC(Number(weatherData.temp))}${UNITS[unit].temp}`;
    feelTemp.textContent = `${fToC(Number(weatherData.feelTemp))}${
      UNITS[unit].temp
    }`;
    wind.textContent = `${milesToMeters(Number(weatherData.wind))} ${
      UNITS[unit].wind
    }`;
  } else {
    unit = 'imperial';
    temp.textContent = `${weatherData.temp}${UNITS[unit].temp}`;
    feelTemp.textContent = `${weatherData.feelTemp}${UNITS[unit].temp}`;
    wind.textContent = `${weatherData.wind} ${UNITS[unit].wind}`;
  }
}

export { unit, UNITS };
