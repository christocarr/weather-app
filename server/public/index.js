(function () {
  const form = document.querySelector('form');
  const cityInput = document.querySelector('#locationInput');
  const inputErrWrapper = document.querySelector('#inputErrWrapper');
  const minTemperaturePara = document.getElementById('minTemperaturePara');
  const maxTemperaturePara = document.getElementById('maxTemperaturePara');
  const iconWrapper = document.querySelector('.icon-wrapper');

  //get users location by using IP address
  const IPLocation = async () => {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    return data.countryCode;
  };

  // get weather from server
  const weatherData = async () => {
    // validate user input
    if (cityInput.value === '') {
      return false;
    }
    if (parseInt(cityInput.value) === typeof(Number)) {
      return false;
    }
    const countryCode = await IPLocation();
    const city = cityInput.value.toLowerCase();
    const response = await fetch(
      `http://localhost:3000/${city}/${countryCode}`
    );
    return response.json();
  };

  form.addEventListener('submit', (ev) => {
    inputErrWrapper.textContent = '';
    ev.preventDefault();
    const getWeather = async (callback) => {
      const returnedData = await callback();
      if (returnedData.cod === '404') {
        inputErrWrapper.textContent = `Please enter a valid city.`
      } else {
        showTemperature(returnedData);
        showIcon(returnedData.weather[0].icon);
      }
    };
    getWeather(weatherData);
  });

  const showTemperature = (data) => {
    const minTemperature = data.main.temp_min;
    const maxTemperature = data.main.temp_max;

    //add fade in class to element
    minTemperaturePara.classList.add('fade-in');
    maxTemperaturePara.classList.add('fade-in');

    //if location is in US then show fahrenheit
    if (data.sys.country === 'US') {
      minTemperaturePara.innerHTML = `${Math.round(
        (minTemperature * 9) / 5 + 32
      )}&deg;F`;
      maxTemperaturePara.innerHTML = `${Math.round(
        (maxTemperature * 9) / 5 + 32
      )}&deg;F`;
    } else {
      minTemperaturePara.innerHTML = `${Math.round(minTemperature)}&deg;C`;
      maxTemperaturePara.innerHTML = `${Math.round(maxTemperature)}&deg;C`;
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
