(function () {
  const form = document.querySelector('form');
  const cityInput = document.querySelector('#locationInput');
  const inputErrWrapper = document.querySelector('#inputErrWrapper');
  const currentTempPara = document.getElementById('currentTemp');
  // const minTemperaturePara = document.getElementById('minTemperaturePara');
  // const maxTemperaturePara = document.getElementById('maxTemperaturePara');
  const iconWrapper = document.querySelector('.icon-wrapper');

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
    const response = await fetch(`http://localhost:3000/${coordinates}`);
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
        console.log(returnedData)
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
      currentTempPara.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}&deg;F`
    } else {
      currentTempPara.innerHTML = `${Math.round(currentTemp)}&deg;C`
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
