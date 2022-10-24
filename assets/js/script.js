var searchHistory = ['Phoenix'];
var bttn = $('.search-confirm');
var userInput = $('#user-input');
var historyAppend = $('.search-history');
var city = userInput;
var lat;
var lon;
var APIKey = '51bd6ed6a7fd20bcc3f9e281517384f2';
var queryURLLatLog = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;
var queryURLForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
function dispStart () {
    for (var i = 0; i < searchHistory.length; i++) {
        var options = $('<button>');
        options.text(searchHistory[i]);
        options.addClass('search-options');
        options.click(function() {
            city = options.text();
            fetch(queryURLLatLog)
            .then(function(response) {
                return response.json();
            })
            .then(function(lat) {
                console.log(lat);
            })
            .then(function(lon){
                console.log(lon)
            })
        })
        historyAppend.append(options);
    }
    
}
function searchBttn() {

}
function getLatLon() {
    fetch(queryURLLatLog)
    .then(function(response) {
        return response.json();
    })
    .then(function(name) {
        console.log(name);
    })
}
function grabWeather() {

}
function setHistory() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}
function getHistory() {
    var history = localStorage.getItem('searchHistory');
    searchHistory = JSON.parse(history);
}
var firstTimeLaunch = localStorage.getItem("searchHistory");
if (firstTimeLaunch === null) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}
dispStart()