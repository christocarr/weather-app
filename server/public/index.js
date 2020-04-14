(function () {
  // const minTemperaturePara = document.getElementById('minTemperaturePara');
  // const maxTemperaturePara = document.getElementById('maxTemperaturePara');
  // const iconWrapper = document.querySelector('.icon-wrapper')
  // const body = document.querySelector('body');
  // const locationDiv = document.querySelector('#locationDiv')

  // //get devices current location
  // if (!navigator.geolocation) {
  //   return `Geolocation is not supported by your browser.`;
  // } else {
  //   navigator.geolocation.getCurrentPosition(sendLocation);
  // }

  // function sendLocation(position) {
  //   const lat = position.coords.latitude;
  //   const long = position.coords.longitude;

  //   async function getData(lat, long) {
  //     const response = await fetch(`http://localhost:3000/${lat},${long}`);
  //     return await response.json();
  //   }

  //   getData(lat, long).then((data) => {
  //     showBodyColor(data);
  //     showLocation(data);
  //     showTemperature(data);
  //     showIcon(data.weather[0].icon)
  //   });
  // }

  // const showBodyColor = (data) => {
  //   const currentTemp = data.main.temp;

  //   if (currentTemp > 28) {
  //     body.classList.add('hot');
  //   }

  //   if (currentTemp > 19 && currentTemp <= 27) {
  //     body.classList.add('warm');
  //   }

  //   if (currentTemp >= 12 && currentTemp <= 19) {
  //     body.classList.add('medium');
  //   }

  //   if (currentTemp < 12) {
  //     body.classList.add('cold');
  //   }
  // };

  // const showLocation = (data) => {
  //   const locationPara = document.createElement('p');
  //   locationPara.innerHTML = `${data.name}`;
  //   locationDiv.appendChild(locationPara);
  // }

  // const showTemperature = (data) => {
  //   const minTemperature = data.main.temp_min;
  //   const maxTemperature = data.main.temp_max;

  //   //if location is in US then show fahrenheit
  //   if (data.sys.country === 'US') {
  //     minTemperaturePara.innerHTML = `${Math.round(
  //       (minTemperature * 9) / 5 + 32
  //     )}&deg;F`;
  //     maxTemperaturePara.innerHTML = `${Math.round(
  //       (maxTemperature * 9) / 5 + 32
  //     )}&deg;F`;
  //   } else {
  //     minTemperaturePara.innerHTML = `${Math.round(minTemperature)}&deg;C`;
  //     maxTemperaturePara.innerHTML = `${Math.round(maxTemperature)}&deg;C`;
  //   }
  // };

  // const showIcon = iconCode => {
  //   const img = document.createElement('img')
  //   img.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}@2x.png`)
  //   iconWrapper.append(img)
  // }

    const form = document.querySelector('form')
    const cityInput = document.querySelector('#locationInput')
    const minTemperaturePara = document.getElementById('minTemperaturePara');
    const maxTemperaturePara = document.getElementById('maxTemperaturePara');
    const iconWrapper = document.querySelector('.icon-wrapper')
    const body = document.querySelector('body');
    const locationDiv = document.querySelector('#locationDiv')

    //get users location by using IP address
    const IPLocation = async () => {
      const response =  await fetch('http://ip-api.com/json')
      const data = await response.json()
      return data.countryCode
    }

    // get weather from server
    const weatherData = async () => {
      const countryCode = await IPLocation()
      const city = cityInput.value.toLowerCase()
      const response = await fetch(`http://localhost:3000/${city}/${countryCode}`)
      return response.json()
    } 

    form.addEventListener('submit', ev => {
      ev.preventDefault()
      const getWeather = async (callback) => {
        const returnedData = await callback()
        showWeather(returnedData)
      }
      getWeather(weatherData)

    })
    
    const showWeather = (data) => {
      
      const minTemperature = data.main.temp_min;
      const maxTemperature = data.main.temp_max;

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
    }
})();
