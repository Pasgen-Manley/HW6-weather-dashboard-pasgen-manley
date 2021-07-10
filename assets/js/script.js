//OpenWeather API key
var APIKey = "2bee4f18e1f3cf6ed8255bb5b44479e7"; 

// Varibles
cityList = [];

citySearchBtn = $("#search-btn");
citySearchInput = $("#city-search");
cityHIstoryli = $("#search-history-list");
clearHistoryBtn = $("#clear-history");

var weatherContent = $("#weather-content");

// Varibles of the current city input
var currentCIty = $("#current-city");
var currentDate = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumid = $("#current-humidity");
var currentUV = $("#current-UV");

// Use moment to get the current date
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");


var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;