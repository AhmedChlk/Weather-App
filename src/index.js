import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { showError, showCurrentMeteo ,showMoreDetails,createCard} from './js/dom';

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


async function getWeatherData(location) {
    const apiKey = 'e9497b296f0a4448b75164057240407';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
    const response = await fetch(apiUrl);
    console.log("Response status: ", response.status); // Log le statut de la réponse

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error("City not found");
        }
        throw new Error("Couldn't fetch the data from the API");
    }
    const data = await response.json();
    console.log("Weather data: ", data); // Log les données retournées
    return data;
}


function showWeatherData(data) {
    showCurrentMeteo(data);
    showMoreDetails(data);
    document.querySelector('.card-container').innerHTML='';
    data.forecast.forecastday.forEach(element => {
        createCard(element);
    });
}

