var searchHistory = ['Phoenix'];
var userInput = $('#user-input');
var submit = $('#submit');
var form = $('#form');
var historyAppend = $('.search-history');
var CWCcd = $('#city-date');
var CWCt = $('#temp');
var CWCw = $('#wind');
var CWCh = $('#humidity');
var currentDay = moment().format('dddd, MMMM Do YYYY')
var city;
var lat;
var lon;
var APIKey = '51bd6ed6a7fd20bcc3f9e281517384f2';

function searchBttn() {
    getCoords();
}
function getCoords() {
    city = userInput.val();
    var queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid='+ APIKey;
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        lat = data[0].lat;
        lon = data[0].lon;
        getCurrent();
    });
}
function getCurrent() {
    var queryURLCurrent = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid='+ APIKey + '&units=imperial';
    fetch(queryURLCurrent)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        CWCcd.text(city + ' ' + '(' + currentDay + ')');
        CWCt.text('Temp: '+data.main.temp + '°F');
        CWCw.text('Wind: '+ data.wind.speed + ' mph');
        CWCh.text('Humidity: ' + data.main.humidity + '%');
    });
    getForecast();
}
function getForecast() {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid='+ APIKey + '&units=imperial';
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}
function setWeather() {

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

form.submit(function(event){
    searchBttn()
})