document.addEventListener('DOMContentLoaded', () => {
  const locationHeading = document.querySelector('.location-heading');
  const currentWeatherWrapper = document.querySelector('.current-weather-wrapper');
  const currentTempPara = document.getElementById('currentTemp');
  const currentWeatherIcon = document.querySelector('.current-weather-icon');
  const currentWeatherDetails = document.querySelector('.current-weather-details');
  const hourlyForecastWrapper = document.querySelector('.hourly-forecast-wrapper');
  const dailyForecastWrapper = document.querySelector('.daily-forecast-wrapper');

  //get users location by using IP address
  const IPLocation = async () => {
    const returnedData = {};
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    returnedData.lat = data.lat;
    returnedData.lon = data.lon;
    returnedData.location = data.timezone.split('/')[1];
    return returnedData;
  };

  // get weather from server
  const weatherData = async () => {
    const data = await IPLocation();
    const windowLocation = window.location;
    const response = await fetch(`${windowLocation.origin}/${data.lat},${data.lon},${data.location}`);
    return response.json();
  };

  const getWeather = async (callback) => {
    const returnedData = await callback();
    if (returnedData.cod === '404') {
      console.log('Could not get data');
    } else {
      showLocation(returnedData.timezone);
      showCurrentTemperature(returnedData);
      showHourlyForecast(returnedData);
      showDailyForecast(returnedData);
    }
  };

  getWeather(weatherData);

  //create celsius or fahrenheit
  const getTempScale = (data) => (tempScale = data.includes('America') ? `&deg;F` : `&deg;C`);

  //show users location city
  const showLocation = (data) => {
    const location = data.split('/');
    locationHeading.textContent = location[1];
  };

  const showCurrentTemperature = (data) => {
    const img = document.createElement('img');
    const uviPara = document.createElement('p');
    const windPara = document.createElement('p');
    const uviSpan = document.createElement('span')

    const scale = getTempScale(data.timezone); //get celsius or fahrenheit
    const currentTemp = data.current.temp;
    const uvi = data.current.uvi;
    const wind = data.current.wind_speed;
    const iconCode = data.current.weather[0].icon;

    currentWeatherWrapper.classList.add('fade-in');

    currentTempPara.innerHTML = `${Math.round(currentTemp)}${scale}`;

    img.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}@2x.png`);

    currentWeatherIcon.appendChild(img);

    //add color to uviPara depending on index
    if (uvi > 0 && uvi < 3) {
      uviSpan.classList.add('low-uvi-color')
      uviSpan.textContent = `Low`;
    } else if (uvi >= 3 && uvi <= 5) {
      uviSpan.classList.add('mid-uvi-color')
      uviSpan.textContent = `Medium`;
    } else if (uvi >= 6 && uvi <= 7) {
      uviSpan.classList.add('high-uvi-color')
      uviSpan.textContent = `High`;
    } else {
      uviSpan.classList.add('vhigh-uvi-color')
      uviSpan.textContent = `Extremely high`;
    }

    uviPara.textContent = `UV Index: `;
    uviPara.appendChild(uviSpan)
    
    windPara.textContent = `Wind speed: ${wind}m/s`;
    currentWeatherDetails.appendChild(uviPara);
    currentWeatherDetails.appendChild(windPara);
  };

  const showHourlyForecast = (data) => {
    const scale = getTempScale(data.timezone); //get celsius or fahrenheit
    //get time of forecasted data from data.hourly.dt
    const hourlyArr = data.hourly;
    const unixTimeArr = [];
    for (let i = 1; i < 18; i++) {
      //need less than what the api returns
      unixTimeArr.push(hourlyArr[i].dt);
    }
    // create array of 24 hour format of hourly times
    const hoursArr = unixTimeArr.map((unixTime) => {
      const date = new Date(unixTime * 1000);
      const hour = date.getHours().toString();
      return `${hour}:00`;
    });

    //for each hourly temp create a div and display time, temperature and icon
    for (let i = 1; i < hoursArr.length; i++) {
      const hourlyTempDiv = document.createElement('div');
      const time = document.createElement('p');
      const temp = document.createElement('p');
      const img = document.createElement('img');
      //add fadeIn animation to hourly forecast
      hourlyTempDiv.classList.add('fade-in');
      time.textContent = hoursArr[i];
      temp.innerHTML = `${Math.round(data.hourly[i].temp)}${scale}`;
      img.setAttribute('src', `http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png`);
      hourlyTempDiv.appendChild(time);
      hourlyTempDiv.appendChild(temp);
      hourlyTempDiv.appendChild(img);

      hourlyForecastWrapper.appendChild(hourlyTempDiv);
    }
  };

  //show daily forecast
  const showDailyForecast = (data) => {
    const scale = getTempScale(data.timezone);
    // get unix times in data.dt
    const unixTimeArr = data.daily.map((day) => day.dt);

    // create an array of days of week from unixTimeArr
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysArr = unixTimeArr.map((unixTime) => {
      const date = new Date(unixTime * 1000);
      const day = date.getDay();
      return daysOfWeek[day];
    });

    for (let i = 1; i < daysArr.length; i++) {
      const minTemp = Math.round(data.daily[i].temp.min);
      const maxTemp = Math.round(data.daily[i].temp.max);

      const dayDiv = document.createElement('div');
      const dayPara = document.createElement('p');
      const minMaxPara = document.createElement('p');
      const img = document.createElement('img');

      dayPara.textContent = daysArr[i];
      minMaxPara.innerHTML = `${minTemp}/${maxTemp}${scale}`;
      img.setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);

      dayDiv.appendChild(dayPara);
      dayDiv.appendChild(minMaxPara);
      dayDiv.appendChild(img);
      dayDiv.classList.add('fade-in');
      dailyForecastWrapper.appendChild(dayDiv);
    }
  };
});
