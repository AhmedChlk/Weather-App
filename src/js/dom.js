import '../css/modal.css';
import '../css/current.css';
import '../css/weather-detail.css';
import '../css/forecast-weather.css';

function showError(message) {
    const body = document.querySelector('body');
    const modal = document.createElement('dialog');
    modal.classList.add('modal');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    // Création du composant Close
    const closeBtn = document.createElement('button');
    closeBtn.classList.add("button");

    const Xpos = document.createElement('span');
    Xpos.classList.add('X');

    const Ypos = document.createElement('span');
    Ypos.classList.add('Y');

    const close = document.createElement('div');
    close.classList.add('close');
    close.innerHTML = 'Close';

    closeBtn.appendChild(Xpos);
    closeBtn.appendChild(Ypos);
    closeBtn.appendChild(close);

    modalHeader.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
        modal.close();
    });

    const p = document.createElement('p');
    p.textContent = message;

    modal.appendChild(modalHeader);
    modal.appendChild(p);

    body.appendChild(modal);
    modal.showModal();
}
function showCurrentMeteo(data) {
    // Récupération de toutes les champs à remplir
    const locationElement = document.querySelector('#location'); // Utiliser un nom de variable plus explicite
    const dateElement = document.querySelector('#date');
    const timeElement = document.querySelector("#time");
    const currentTempElement = document.querySelector("#current-temperature");
    const minMaxTempElement = document.querySelector("#min-max-temperature");
    const sensationElement = document.querySelector("#current-sensation");
    const imageContainer = document.querySelector(".current-meteo-image-container");

    // Vérifications null avant de définir les propriétés
    if (locationElement && dateElement && timeElement && currentTempElement && minMaxTempElement && sensationElement && imageContainer) {
        const img = document.createElement("img");

        // Extraction des données de l'objet
        const locationName = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        const localtime = data.location.localtime;
        const currentTemperature = `${data.current.temp_c}°C`;
        const feelsLikeTemperature = `${data.current.feelslike_c}°C`;
        const weatherCondition = data.current.condition.text;
        const weatherIcon = `https:${data.current.condition.icon}`;
        
        // Extraire les températures minimales et maximales de la section forecast
        const minTemp = `${data.forecast.forecastday[0].day.mintemp_c}°C`;
        const maxTemp = `${data.forecast.forecastday[0].day.maxtemp_c}°C`;
        
        // Séparation de la date et de l'heure
        const [localDate, localTime] = localtime.split(' ');

        // Mise à jour des éléments du DOM
        locationElement.textContent = locationName;
        dateElement.textContent = localDate;
        timeElement.textContent = localTime;
        currentTempElement.textContent = `Température actuelle: ${currentTemperature}`;
        minMaxTempElement.textContent = `Min/Max: ${minTemp} / ${maxTemp}`;
        sensationElement.textContent = `Ressenti: ${feelsLikeTemperature} (${weatherCondition})`;
        img.src = weatherIcon;
        img.alt = weatherCondition;

        // Ajout de l'image dans le conteneur
        imageContainer.innerHTML = ''; // Clear any existing images
        imageContainer.appendChild(img);
        document.querySelector('.current-meteo-container').style.visibility = 'visible';

    } else {
        console.error("One or more elements are null");
    }
}
function showMoreDetails(data) {
    const current = data.current;

    // Afficher la sensation thermique
    document.querySelector('.thermal-value').textContent = `${current.feelslike_c} °C`;

    // Afficher l'humidité de l'air
    document.querySelector('.humidity-value').textContent = `${current.humidity} %`;

    // Afficher la probabilité de pluie
    document.querySelector('.rain-value').textContent = `${current.precip_mm} mm`;

    // Afficher l'indice UV
    document.querySelector('.uv-value').textContent = current.uv;
    document.querySelector(".current-meteo-details-container").style.visibility = 'visible';
}
function createCard(dayData) {

    // Extraire les données nécessaires
    const date = dayData.date;
    const conditionText = dayData.day.condition.text;
    const conditionIcon = `https:${dayData.day.condition.icon}`;
    const maxTemp = dayData.day.maxtemp_c;
    const minTemp = dayData.day.mintemp_c;
    const avgHumidity = dayData.day.avghumidity;
    const chanceOfRain = dayData.day.daily_chance_of_rain;
    const uvIndex = dayData.day.uv;

    // Créer les éléments HTML pour la carte
    const card = document.createElement('div');
    card.className = 'forecast-card';

    const dateElement = document.createElement('h3');
    dateElement.textContent = date;
    card.appendChild(dateElement);

    const iconElement = document.createElement('img');
    iconElement.src = conditionIcon;
    iconElement.alt = conditionText;
    card.appendChild(iconElement);

    const conditionElement = document.createElement('p');
    conditionElement.textContent = conditionText;
    card.appendChild(conditionElement);

    const tempElement = document.createElement('p');
    tempElement.textContent = `Max: ${maxTemp} °C / Min: ${minTemp} °C`;
    card.appendChild(tempElement);

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${avgHumidity} %`;
    card.appendChild(humidityElement);

    const rainElement = document.createElement('p');
    rainElement.textContent = `Chance of Rain: ${chanceOfRain} %`;
    card.appendChild(rainElement);

    const uvElement = document.createElement('p');
    uvElement.textContent = `UV Index: ${uvIndex}`;
    card.appendChild(uvElement);

    // Ajouter la carte à la section des prévisions
    document.querySelector('.card-container').appendChild(card);
    document.querySelector(".forecast-weather-container").style.visibility = 'visible';
}



export { showError, showCurrentMeteo ,showMoreDetails,createCard    };
