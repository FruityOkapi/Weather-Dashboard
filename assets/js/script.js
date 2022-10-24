var searchHistory = ['Phoenix'];
var bttn = $('.search-confirm');
var userInput = $('#user-input');
var historyAppend = $('.search-history')
var city = userInput.val();
var OpenWeatherApiKey = '2be36905677e50f79135cc9a8f2a062b';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +'&appid=' + OpenWeatherApiKey;
function dispStart () {
    for (var i = 0; i < searchHistory.length; i++) {
        var options = $('<button>');
        options.text(searchHistory[i]);
        options.addClass('search-options');
        options.click(function(){
            // Set this to search the text of this button
        })
        historyAppend.append(options);
    }
}
function searchBttn() {

}
function grabWeather() {
    fetch(queryURL);
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