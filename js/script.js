const apiKey = "3b20066a45c23f22eadffa2c8929e33f";
let city = "Encinitas";

const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

fetch(weatherApi)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

