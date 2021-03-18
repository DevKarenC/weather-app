import { API_KEY } from '../ApiKey';

// Making an API call to get the corresponding image for the input city
async function getImage(location) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${API_KEY.UNSPLASH_API_KEY}&query=${location}&orientation=landscape`,
    {
      mode: 'cors',
    },
  );
  const data = await response.json();
  return data.urls.regular;
}

// Display fetched image as background image
const body = document.querySelector('body');

async function displayImage(location) {
  body.style.backgroundImage = `url(${await getImage(location)})`;
}

export { displayImage };
