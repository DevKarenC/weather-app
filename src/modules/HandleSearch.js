import { displayWeather } from './Weather';

// Handling user's location search
function handleSearch() {
  const form = document.querySelector('.input-group');
  const searchButton = document.querySelector('#search-button');
  form.addEventListener('submit', handleFormSubmit);
  searchButton.addEventListener('submit', handleSearchButton);

  function handleFormSubmit(e) {
    e.preventDefault();
    displayWeather(e.target[0].value);
    this.reset();
  }

  function handleSearchButton(e) {
    displayWeather(e.target.value);
  }
}

export { handleSearch };
