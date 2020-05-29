document.addEventListener('DOMContentLoaded', () => {
  const locationHeading = document.querySelector('.location-heading');
  const currentTempPara = document.getElementById('currentTemp');
  const iconWrapper = document.querySelector('.icon-wrapper');
  const hourlyForecastWrapper = document.querySelector(
    '.hourly-forecast-wrapper'
  );
  const dailyForecastWrapper = document.querySelector(
    '.daily-forecast-wrapper'
  );

  //get users location by using IP address
  const IPLocation = async () => {
    const returnedData = {};
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    returnedData.lat = data.lat
    returnedData.lon = data.lon
    returnedData.location = data.timezone.split('/')[1]
    return returnedData
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
      console.log(returnedData)
      showLocation(returnedData.timezone);
      showCurrentTemperature(returnedData);
      showHourlyWeather(returnedData)
      showIcon(returnedData.current.weather[0].icon);
      showDailyForecast(returnedData.daily);
    }
  };

  getWeather(weatherData);

  const showLocation = (data) => {
    const location = data.split('/');
    locationHeading.textContent = location[1];
  };

  const showCurrentTemperature = (data) => {
    const currentTemp = data.current.temp;
    currentTempPara.classList.add('fade-in');

    //if location is in US then show fahrenheit
    if (data.timezone.includes('America')) {
      currentTempPara.innerHTML = `${Math.round(
        (currentTemp * 9) / 5 + 32
      )}&deg;F`;
    } else {
      // else show celsius
      currentTempPara.innerHTML = `${Math.round(currentTemp)}&deg;C`;
    }
  }

  const showHourlyWeather = (data) => {
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
      temp.innerHTML = `${Math.round(data.hourly[i].temp)}&deg;C`;
      img.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png`
      );
      hourlyTempDiv.appendChild(time);
      hourlyTempDiv.appendChild(temp);
      hourlyTempDiv.appendChild(img);

      hourlyForecastWrapper.appendChild(hourlyTempDiv);
    }
  };

  //show daily forecast
  const showDailyForecast = (data) => {

    // get unix times in data.dt
    const unixTimeArr = data.map((day) => day.dt);
    
    // create an array of days of week from unixTimeArr
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const daysArr = unixTimeArr.map((unixTime) => {
      const date = new Date(unixTime * 1000);
      const day = date.getDay();
      return daysOfWeek[day];
    });

    for (let i = 1; i < daysArr.length; i++) {
      const dayDiv = document.createElement('div')
      const dayPara = document.createElement('p')
      dayPara.textContent = daysArr[i]
      dayDiv.appendChild(dayPara)
      dailyForecastWrapper.appendChild(dayDiv)
    }
  };

  const showIcon = (iconCode) => {
    const img = document.createElement('img');

    // add fade in class to icon
    img.classList.add('fade-in');

    img.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
    iconWrapper.innerHTML = '';
    iconWrapper.appendChild(img);
  };
});
