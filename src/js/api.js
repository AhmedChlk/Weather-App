
async function getWeatherData(location) {
    const apiKey = 'e9497b296f0a4448b75164057240407';
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
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
export{getWeatherData}