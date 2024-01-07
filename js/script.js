const apiKey = "3b20066a45c23f22eadffa2c8929e33f";
let currentDate = dayjs().format('YYYY-MM-DD');
let city; // Declare city outside the click event to make it accessible

save();

const funcH = document.querySelector('#histBtn');
funcH.addEventListener('click', function() {
    weather();
    save();
});

const funcW = document.querySelector('#searchBtn');
funcW.addEventListener('click', function() {
    weather();
    save();
});

const wipeMem1 = document.querySelector('#wipeMem1');
wipeMem1.addEventListener('click', function() {
    localStorage.removeItem('data');
    document.location.reload();
});

function save() {
    const newData = `<button id="histBtn" class="storage-list-item">${city}</button>`;

    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
    }
    const oldData = JSON.parse(localStorage.getItem('data'));
    oldData.push(newData);
    
    if (newData == `<button id="histBtn" class="storage-list-item"></button>`) {
        oldData.pop();
    } else if (newData == `<button id="histBtn" class="storage-list-item">undefined</button>`) {
        oldData.pop();
    }

    localStorage.setItem('data', JSON.stringify(oldData));
    console.log(oldData);
    console.log(newData);
    
    if (oldData.length >= 11) {
        oldData.shift(); // Remove the first element
    }

    const ap = document.querySelector('#appendStorage');
    ap.innerHTML = oldData.join('');
}

function weather() {
    const input = $("#input").val();
    city = input;
    console.log(city);
    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(weatherApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                function kelvinToFahrenheit(kelvin) {
                    return ((kelvin - 273.15) * 9/5) + 32;
                }

                const kelvinTemperature = data.list[0].main.temp;
                const fahrenheitTemperature = kelvinToFahrenheit(kelvinTemperature);

                const getIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

                let disp1DayEl = document.querySelector('#oneDay');
                disp1DayEl.innerHTML = 
                    `<div class="day1">
                        <ul id="oneDay">
                            <li>${data.city.name} <span>${currentDate}</span></li>
                            <li><img src="${getIcon}"></li>
                            <li>Temp: ${fahrenheitTemperature.toFixed(2)} °F</li>
                            <li>Wind Speed: ${data.list[0].wind.speed} MPH</li>
                            <li>Humidity: ${data.list[0].main.humidity} %</li>
                        </ul>
                    </div>`;

                for (let i = 4; i < data.list.length; i += 8) {
                    const dataLoop = data.list[i];
                    const dayJsFormat = dayjs.unix(dataLoop.dt).format(`MM/DD/YYYY`);

                    const loopIcon = `https://openweathermap.org/img/wn/${dataLoop.weather[0].icon}@2x.png`;

                    const kelvinTemperature = dataLoop.main.temp;
                    const fahrenheitTemperature = kelvinToFahrenheit(kelvinTemperature);

                    const forecastHtml = 
                        `<ul class="fiveDay">
                            <li>${dayJsFormat}</li>
                            <li><img src="${loopIcon}"></li>
                            <li>Temp: ${fahrenheitTemperature.toFixed(2)} °F</li>
                            <li>Wind Speed: ${dataLoop.wind.speed} MPH</li>
                            <li>Humidity: ${dataLoop.main.humidity} %</li>
                        </ul>`;

                    if (localStorage.getItem('data5') == null) {
                        localStorage.setItem('data5', '[]');
                    } 

                    const oldData5 = JSON.parse(localStorage.getItem('data5'));
                    oldData5.push(forecastHtml);
                
                    // Check if the length is greater than or equal to 6
                    if (oldData5.length >= 6) {
                        oldData5.shift(); // Remove the first element
                    }

                    localStorage.setItem('data5', JSON.stringify(oldData5));
                    console.log(oldData5);
                    const appendDays = document.querySelector('#fiveDayAppend');
                    appendDays.innerHTML = oldData5.join('');
                
                }
            });
        }
    });
}