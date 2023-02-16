//Starter code was provided by instructor
let city="";
let url="";
let apiKey = "5a1d9d620b2432b2bfb80d3816169b84";
let queryURL="";
let currentURL="";
let citiesDiv = document.getElementById("searched_history");
let cities =[];

init();
listClicker();
searchClicker();

function init(){
  let saved_cities = JSON.parse(localStorage.getitem("cities"));
  if(saved_cities !=null) {
    cities = saved_cities
  }
  renderButtons();
}

function storeCities(){
  localStorage.setItem("cities", JSON.stringify(cities));
}




const weatherApi = "http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={5a1d9d620b2432b2bfb80d3816169b84}"




var searchHistoryList = function(cityName) {
  $(`.past-search:contains(" + cityName + ")`).remove();
}
var searchHistoryEntry = $("<p>");
searchHistoryEntry.addClass ("past-search");
searchHistoryEntry.text (cityName);

var searchEntryContainer = $("<div>");
searchEntryContainer.addClass("past-search-container");

searchEntryContainer.append(searchHistoryEntry);

var searchHistoryContainerEl = $("#search-history-container");
searchHistoryContainerEl.append(searchEntryContainer);
if (savedSearches.length > 0) {
  var previousSavedSearches = localStorage.getItem("savedSearches");
  savedSearches = JSON.parse(previousSavedSearches);
}
savedSearches.push(cityName);
localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

$("#search-input").val("");

var loadSearchHistory = function() {
  var savedSearchHistory = localStorage.getItem("savedSearches");
  if (!savedSearchHistory){
    return false;
  }
  savedSearchHistory = JSON.parse(savedSearchHistory);
  for (var i = 0; i < savedSearchHistory.length; i++){
    searchHistoryList(savedSearchHistory[i]);
  }
};

// Here's a sample of how you might start the app
function getWeatherData(){
  fetch(weatherApi)
  .then( response => {
    return response.json()
  })
  .then( data => {
    // send the data to the parsing function below
    parseWeatherData(data)
  })
}


function parseWeatherData(data){
  data.forEach( obj => {
    // use moment or dayjs to parse the obj dt variable and get the "real date"
    const dateObj = new moment(obj.list.dt)

    // from this dateObj, use moment or js to get the date it represents. ***This is for you to do ***.
    const currday = ""; 

    // if the current dt value differs from the global variable, AND we don't have data in our array for this day, 
    // we must be on a new day
    if( currDay !== currDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt === obj.dt ) ){
      currDTValue = currDay // update the global variable so we don't use this day again

      // if JS is still in this function, then we must be encountering this dt object for the first time. So the obj variable used in the forEach() must be referring to the firt hour block for this day. get the first record (the obj variable above) and use that for the weather for this day
      fiveDaysOfWeather.push(obj)
    }
  })

  // Once the code gets here, we should have one weather object per day.
  console.log(fiveDaysOfWeather)
}


getWeatherData();



/*

  Here's an example of a data record you get back for the 5-Day Forecast

  {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
    {
      "dt": 1661871600,
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "visibility": 10000,
      "pop": 0.32,
      "rain": {
        "3h": 0.26
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-08-30 15:00:00"
    },
    {
      "dt": 1661882400,
      "main": {
        "temp": 295.45,
        "feels_like": 295.59,
        "temp_min": 292.84,
        "temp_max": 295.45,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 71,
        "temp_kf": 2.61
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 96
      },
      "wind": {
        "speed": 1.97,
        "deg": 157,
        "gust": 3.39
      },
      "visibility": 10000,
      "pop": 0.33,
      "rain": {
        "3h": 0.57
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 18:00:00"
    },
    {
      "dt": 1661893200,
      "main": {
        "temp": 292.46,
        "feels_like": 292.54,
        "temp_min": 290.31,
        "temp_max": 292.46,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 80,
        "temp_kf": 2.15
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 2.66,
        "deg": 210,
        "gust": 3.58
      },
      "visibility": 10000,
      "pop": 0.7,
      "rain": {
        "3h": 0.49
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 21:00:00"
    },
    ....
    {
      "dt": 1662292800,
      "main": {
        "temp": 294.93,
        "feels_like": 294.83,
        "temp_min": 294.93,
        "temp_max": 294.93,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 935,
        "humidity": 64,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 1.14,
        "deg": 17,
        "gust": 1.57
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-09-04 12:00:00"
    }
  ],
  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lat": 44.34,
      "lon": 10.99
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200,
    "sunrise": 1661834187,
    "sunset": 1661882248
  }
}

*/