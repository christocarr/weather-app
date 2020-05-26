(function () {
  const form = document.querySelector('form');
  const cityInput = document.querySelector('#locationInput');
  const inputErrWrapper = document.querySelector('#inputErrWrapper');
  const currentTempPara = document.getElementById('currentTemp');
  const iconWrapper = document.querySelector('.icon-wrapper');
  const hourlyForecastWrapper = document.querySelector(
    '.hourly-forecast-wrapper'
  );

  //get users location by using IP address
  const IPLocation = async () => {
    const coordArr = [];
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    coordArr.push(data.lat, data.lon);
    return coordArr;
  };

  // get weather from server
  const weatherData = async () => {
    // validate user input
    if (cityInput.value === '') {
      return false;
    }
    if (parseInt(cityInput.value) === typeof Number) {
      return false;
    }
    const coordinates = await IPLocation();
    const lat = coordinates[0]
    const lon = coordinates[1]
    const windowLocation = window.location;
    const response = await fetch(`${windowLocation.origin}/${lat},${lon}`);
    return response.json();
  };

  form.addEventListener('submit', (ev) => {
    inputErrWrapper.textContent = '';
    ev.preventDefault();
    const getWeather = async (callback) => {
      const returnedData = await callback();
      if (returnedData.cod === '404') {
        inputErrWrapper.textContent = `Please enter a valid city.`;
      } else {
        showTemperature(returnedData);
        showIcon(returnedData.current.weather[0].icon);
      }
    };
    getWeather(weatherData);
  });

  const showTemperature = (data) => {
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
})();
