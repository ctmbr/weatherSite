var searchbar = document.querySelector("#search")
var searchInput = document.querySelector("#input")
searchbar.addEventListener("submit", getCoordinates)
function getCoordinates(e) {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=1&appid=8aa666e2e8f5aca02dc43f5c73f68184`)
        .then(function (response) {
            return response.json()
        }).then(function (data) { console.log(data) })
}