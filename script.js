var searchbar = document.querySelector("#search")
var searchInput = document.querySelector("#input")
searchbar.addEventListener("submit", getCoordinates, saveSearch)
var lat;
var lon;
var cityName;
var city = document.querySelector("#city")
var currentTemp = document.querySelector("#currentTemp")
var currentHumidity = document.querySelector("#currentHumidity")
var currentWind = document.querySelector("#currentWind")
var currentUV = document.querySelector("#currentUV")
var containerEl = document.querySelector("#card-container")
// var daily = data.daily
// for(i =0; i < daily.length; i++) {
//     // if data 1-5 display and append to card
// }

function getCoordinates(e) {

    e.preventDefault()
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=1&appid=8aa666e2e8f5aca02dc43f5c73f68184`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data[0].lat, data[0].lon, data[0].name);
            lat = data[0].lat; lon = data[0].lon;
            cityName = data[0].name
            city.innerText = cityName
            fetchApi()
        })
}

function fetchApi() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=8aa666e2e8f5aca02dc43f5c73f68184`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            getWeather(data)
            getDaily(data)
        })
}
function getWeather(data) {
    console.log(data)
    currentTemp.innerText = "Temp: " + data.current.temp + " °F";
    currentHumidity.innerText = "Humidity: " + data.current.humidity;
    currentWind.innerText = "Wind Speed: " + data.current.wind_speed + 'mph';
    currentUV.innerText = "UV: " + data.current.uvi
}
function getDaily(data) {
    containerEl.innerHTML = ""
    var daily = data.daily
    console.log(daily)
    for (i = 0; i < daily.length; i++) {
        var card = document.createElement("div")
        card.innerHTML = `<div class='card'>Temp: ${daily[i].temp.day} °F</div>
        <div class='card'>Humidity: ${daily[i].humidity}</div>
        <div class='card'>Wind Speed: ${daily[i].wind_speed}mph</div>
        <div class='card'>UV: ${daily[i].uvi}</div>`
        containerEl.appendChild(card)


    }
}

function saveSearch() {
    var searchItem = searchInput.value.trim();
    localStorage.setItem("searchItem", searchItem);
}
