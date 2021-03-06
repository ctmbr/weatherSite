var searchbar = document.querySelector("#search")
var searchInput = document.querySelector("#input")
searchbar.addEventListener("submit", getCoordinates)
var lat;
var lon;
var cityName;
var searchHistory = []
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
            saveSearch(cityName)
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
    for (i = 1; i <= 5; i++) {

        var card = document.createElement("div")
        card.classList.add('card')
        card.innerHTML = `<h3>${new Date(daily[i].dt * 1000).toDateString()}</h3>
        <div>Temp: ${daily[i].temp.day} °F</div>
        <div>Humidity: ${daily[i].humidity}</div>
        <div>Wind Speed: ${daily[i].wind_speed}mph</div>
        <div>UV: ${daily[i].uvi}</div>`
        containerEl.appendChild(card)


    }
}

function saveSearch(searchItem) {
    if (!searchHistory.includes(searchItem)) {
        searchHistory.push(searchItem)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

}
function displaySearchHistory() {

}