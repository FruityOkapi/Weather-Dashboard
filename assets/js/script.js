// All global variables
var searchHistory = ['Phoenix'];
var userInput = $('#user-input');
var submit = $('#submit');
var form = $('#form');
var historyAppend = $('.search-history');
var CWCcd = $('#city-date');
var CWCt = $('#temp');
var CWCw = $('#wind');
var CWCh = $('#humidity');
// This sets current day with moment.js
var currentDay = moment().format('dddd, MMMM Do YYYY')
var city;
var lat;
var lon;
var APIKey = '51bd6ed6a7fd20bcc3f9e281517384f2';
var day1 = $('#day1');
var day2 = $('#day2');
var day3 = $('#day3');
var day4 = $('#day4');
var day5 = $('#day5');
// This starts the weather dash
function searchBttn() {
    // Makes it so if the search history array already has a city to not add it
    if (!searchHistory.includes(userInput.val())) {
        searchHistory.push(userInput.val())
    }
    clearWeather();
    setHistory();
    dispHistory();
    getCoords();
}
// Gets the coordinates of the city in the userInput
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
// Gets the current weather for the city and appends it.
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
        getForecast();
    });
}
// Gets the forecast for the next 5 days and appends it to the cards.
function getForecast() {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid='+ APIKey + '&units=imperial';
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        day1.attr('class', 'forecast-box bg-color');
        day2.attr('class', 'forecast-box bg-color');
        day3.attr('class', 'forecast-box bg-color');
        day4.attr('class', 'forecast-box bg-color');
        day5.attr('class', 'forecast-box bg-color');
        for (var i = 0; i < 5; i++) {
            console.log('triggered')
            var date = $('<h3>');
            var temp = $('<h5>');
            var wind = $('<h5>');
            var humid = $('<h5>');
            date.attr('class', 'del');
            temp.attr('class', 'del');
            wind.attr('class', 'del');
            humid.attr('class', 'del');
            if (i == 0) {
                date.text(moment().add(1, 'day').format('LL'));
                temp.text(''+data.list[4].main.temp + '°F');
                wind.text('Wind: '+ data.list[4].wind.speed + ' mph');
                humid.text('Humidity: ' + data.list[4].main.humidity + '%');
                day1.append(date);
                day1.append(temp);
                day1.append(wind);
                day1.append(humid);
            } else if (i == 1) {
                date.text(moment().add(2, 'day').format('LL'));
                temp.text('Temp: '+ data.list[12].main.temp + '°F');
                wind.text('Wind: '+ data.list[12].wind.speed + ' mph');
                humid.text('Humidity: ' + data.list[12].main.humidity + '%');
                day2.append(date);
                day2.append(temp);
                day2.append(wind);
                day2.append(humid);
            } else if (i == 2) {
                date.text(moment().add(3, 'day').format('LL'));
                temp.text('Temp: '+ data.list[20].main.temp + '°F');
                wind.text('Wind: '+ data.list[20].wind.speed + ' mph');
                humid.text('Humidity: ' + data.list[20].main.humidity + '%');
                day3.append(date);
                day3.append(temp);
                day3.append(wind);
                day3.append(humid);
            } else if (i == 3) {
                date.text(moment().add(4, 'day').format('LL'));
                temp.text('Temp: '+ data.list[28].main.temp + '°F');
                wind.text('Wind: '+ data.list[28].wind.speed + ' mph');
                humid.text('Humidity: ' + data.list[28].main.humidity + '%');
                day4.append(date);
                day4.append(temp);
                day4.append(wind);
                day4.append(humid);
            } else if (i == 4){
                date.text(moment().add(5, 'day').format('LL'));
                temp.text('Temp: '+ data.list[36].main.temp + '°F');
                wind.text('Wind: '+ data.list[36].wind.speed + ' mph');
                humid.text('Humidity: ' + data.list[36].main.humidity + '%');
                day5.append(date);
                day5.append(temp);
                day5.append(wind);
                day5.append(humid);
            }
        }
    })
}
// Clears the cards of text
function clearWeather() {
    var del = $('.del');
    del.remove();
}
// Sets the search history
function setHistory() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}
// Gets the history
function getHistory() {
    var history = localStorage.getItem('searchHistory');
    searchHistory = JSON.parse(history);
}
// Renders clickable buttons to display previously searched cities.
function dispHistory() {
    console.log('dispHistory triggered');
    refreshHistory();
    getHistory();
    for (var i = 0; i < searchHistory.length; i++) {
        var bttn = $('<button>');
        var bruh = searchHistory[i];
        console.log(bruh)
        bttn.addClass('search-options');
        bttn.text(bruh);
        bttn.attr('id', bruh);
        bttn.click(function(event) {
            clearWeather();
            getID(event.target.getAttribute('id'))
            console.log(city)
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
        
        })
        historyAppend.append(bttn);
    }
}
function getID(x) {
    city = x
}
// Refreshes the buttons for real time updates
function refreshHistory() {
    var del = $('.search-options');
    del.remove();
}
// First time launch to prevent my item being null
var firstTimeLaunch = localStorage.getItem('searchHistory');
if (firstTimeLaunch === null) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}
// Initial start
dispHistory();
// Sets the submit function to search
form.submit(function(event){
    searchBttn()
})