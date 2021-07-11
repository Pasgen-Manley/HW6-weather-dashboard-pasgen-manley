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
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumid = $("#current-humidity");
var currentUV = $("#current-UV");
var currentIcon = $("#current-icon");

// Use moment to get the current date
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");




$(document).on("submit", function(event){
    event.preventDefault();
    
    var searchInputValue = citySearchInput.val().trim();

    if (!searchInputValue) {
        alert("Please enter a valid city name.");
        return;
    } else {
        searchWeatherAPI(searchInputValue)
        searchHistory(searchInputValue);
        citySearchInput.val("");
    };

    
});

//citySearchBtn.on("click", function(){
    //event.preventDefault();

    //var searchInputValue = citySearchInput.val().trim();

    //if (!searchInputValue) {
        //alert("Please enter a valid city name.");
        //return;
    //} else {
        //searchWeatherAPI(searchInputValue)
        //searchHistory(searchInputValue);
        //citySearchInput.val("");
    //};

//});



function searchWeatherAPI (citySearchInput) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&units=metric" + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);

            currentCIty.text(data.name);
            var cityDate = (" (" + currentDate + ")");
            currentCIty.append(cityDate);
            currentCIty.append("<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='" + data.weather[0].main + "' />" );
            currentTemp.text(data.main.temp);
            currentTemp.append("&deg;C");
            currentWind.text(data.wind.speed + " m/s");
            currentHumid.text(data.main.humidity + "%");
            
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var UVurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
            
            fetch(UVurl)
                .then(function (response){
                    return response.json();
                })
                .then(function (UVdata){
                    console.log(UVdata);
                    currentUV.text(UVdata.current.uvi);
                })     
            });
    
            var forecastURL  = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchInput + "&units=metric" + "&appid=" + APIKey;

            fetch(forecastURL)
                .then(function (response){
                    return response.json();
                })
                .then(function (forecastData){
                    console.log(forecastData);

                    for (i = 1; i < 6; i++) {
                        
                        var forecastCard = $("<div>");
                        var forecastBody = $("<div>");

                        var forecastIcon = $("<img>");
                        var forecastTemp = $("<p>");
                        var forecastWind = $("<p>");
                        var forecastHumidity = $("<p>");
                        
                        
                        forecastCard.addClass("card col-1 col-sm-2 ml-3").attr("id", "fc-card" + i);
                        



                        var forecastDate = $("<h5>");
                        forecastDate.addClass("card-title").attr("id", "fc-date" + i);
                        var forecastDatetime = moment().add(i, 'days').format('M/D/YYYY');
                        forecastDate.append(forecastDatetime);
                        forecastDate.text(forecastDatetime);
                        console.log(forecastDatetime);

                        forecastIcon.attr("id", "fc-icon" + i).attr("src", "https://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png");

                        forecastTemp.addClass("card-text").attr("id", "fc-temp" + i);
                        forecastTemp.text("Temp: " + forecastData.list[i].main.temp);
                        forecastTemp.append("&deg;C");

                        forecastWind.addClass("card-text").attr("id", "fc-wind" + i);
                        forecastWind.text("Wind: " + forecastData.list[i].wind.speed + " m/s");
                        

                        forecastHumidity.addClass("card-text").attr("id", "fc-wind" + i);
                        forecastHumidity.text("Humidity: " + forecastData.list[i].main.humidity + "%");
                        console.log(forecastHumidity);


                        
                        $("#five-day-forecast").append(forecastCard);
                        forecastCard.append(forecastBody);

                        forecastBody.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity);





                        
                        
                        


                    }
                })

};

