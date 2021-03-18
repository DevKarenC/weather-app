import { weatherData } from './Weather';

const Papa = require('papaparse');
const cityCountry = document.querySelector('.city-country');

// Parse CSV file for country codes and provide full country name
function parseCSV() {
  Papa.parse(
    'https://pkgstore.datahub.io/core/country-list/data_csv/data/d7c9d7cfb42cb69f4422dec222dbbaa8/data_csv.csv',
    {
      download: true,
      delimiter: ',',
      newline: '',
      skipEmptyLines: true,
      header: true,
      complete: function (results) {
        const countryCodes = results.data.reduce(function (obj, value) {
          obj[value.Code] = value.Name;
          return obj;
        }, {});
        cityCountry.textContent = `${weatherData.city}, ${
          countryCodes[weatherData.country]
        }`;
      },
    },
  );
}

export { parseCSV };
