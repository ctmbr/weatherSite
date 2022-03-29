var searchbar = document.querySelector("#search")
var searchInput = document.querySelector("#input")
searchbar.addEventListener("submit", getCoordinates)
var lat;
var lon;
var cityName;
var city = document.querySelector("#city")
var currentTemp = document.querySelector("#currentTemp")
var currentHumidity = document.querySelector("#currentHumidity")
var currentWind = document.querySelector("#currentWind")
var currentUV = document.querySelector("#currentUV")
function getCoordinates(e) {

    e.preventDefault()
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=1&appid=8aa666e2e8f5aca02dc43f5c73f68184`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data[0].lat, data[0].lon, data[0].name)
            lat = data[0].lat; lon = data[0].lon;
            cityName = data[0].name
            city.innerText = cityName
            getWeather()
        })
}
function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=8aa666e2e8f5aca02dc43f5c73f68184`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            console.log(data.current.temp)
            currentTemp.innerText = data.current.temp
            console.log(data.current.humidity)
            currentHumidity.innerText = data.current.humidity
            console.log(data.current.wind_speed)
            currentWind.innerText = data.current.wind_speed
            console.log(data.current.uvi)
            currentUV.innerText = data.current.uvi
        })
}