window.addEventListener('DOMContentLoaded', function() {
  var submitBtn = document.getElementById('submit-btn');
  var cityInput = document.getElementById('city-input');
  var weatherInfo = document.getElementById('weather-info');
  var weatherImage = document.getElementById('weather-image');

  submitBtn.addEventListener('click', function() {
    var cityName = cityInput.value;

    // Make an API request to fetch weather data
    fetchWeather(cityName);
    animateImage();
  });

  function fetchWeather(city) {
    var apiKey = 'e9e64a76e3af4133a76115906230606'; // Replace with your own API key
    var apiUrl = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city;

    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.error) {
          displayError(data.error.message);
        } else {
          displayWeather(data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function displayWeather(data) {
    var weather = data.current;

    var html = '<h2>' + data.location.name + ', ' + data.location.country + '</h2>';
    html += '<p>Temperature: ' + weather.temp_c + '°C</p>';
    html += '<p>Condition: ' + weather.condition.text + '</p>';

    weatherInfo.innerHTML = html;

    var imageSrc = getWeatherImageSrc(weather.condition.code);
    weatherImage.src = imageSrc;
  }

  function displayError(message) {
    weatherInfo.innerHTML = '<p>Error: ' + message + '</p>';
  }

  function animateImage() {
    weatherImage.style.animation = 'moveImage 20s linear infinite';
  }

  function getWeatherImageSrc(conditionCode) {
    if (conditionCode === 1000) {
      return 'sunnyg.gif';
    } else if (conditionCode >= 1003 && conditionCode <= 1030) {
      return 'cloudg.gif';
    } else if (conditionCode >= 1063 && conditionCode <= 1192) {
      return 'grainny.gif';
    } else {
      return 'default.png';
    }
  }
});