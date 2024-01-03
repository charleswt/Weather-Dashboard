const apiKey = "3b20066a45c23f22eadffa2c8929e33f";

$("#searchBtn").on('click', function () {
  const input = document.getElementById("input");
  const city = input.value;
  const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(weatherApi).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            const weather = data
            console.log(data);
            console.log(data.city.name, data.list[0].dt_txt)
        })
    }
    }
  )


    

    

});

// data.city.name 
// data.list[0].dt_txt 
// data.list[0].weather.icon 
// data.list[0].main.humidity 
// data.list[0].wind.speed 
// data.list[0].main.temp 
// 0 4 12 20 28 36

//  idea is that I run a for loop looking for the fist item in the data array that is 1 day later skipping the next times in the same day to the next day skipping and so and so forwarth