import './index.css';
import 'core-js';
import 'regenerator-runtime/runtime';
import { displayWeather } from './modules/Weather';
import { handleSearch } from './modules/HandleSearch';

handleSearch();
displayWeather('San Francisco');
