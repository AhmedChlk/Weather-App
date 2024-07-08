import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { getWeatherData } from './js/api';
import { showError, showCurrentMeteo } from './js/dom';

// Récupérer la ville recherchée par l'utilisateur
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formInput = new FormData(form);
    const location = formInput.get('location');
    console.log(location);
    if (location) {
        try {
            const weatherData = await getWeatherData(location);
            showWeatherData(weatherData);
        } catch (error) {
            console.error("Error: ", error.message); // Log l'erreur
            if (error.message === "City not found") {
                showError("Veuillez entrer le nom d'une ville valide.");
            } else {
                showError("Erreur lors de la récupération des données météo.");
            }
        }
    } else {
        showError("Veuillez entrer une ville.");
    }
    form.reset();
});


function showWeatherData(data) {
    showCurrentMeteo(data);
}
