(function() {
  const celsiusMinPara = document.getElementById('celsiusMinPara');
  const fahrenheitMinPara = document.getElementById('fahrenheitMinPara');
  const celsiusMaxPara = document.getElementById('celsiusMaxPara');
  const fahrenheitMaxPara = document.getElementById('fahrenheitMaxPara');
  const body = document.querySelector('body')

  //get devices current location
  if (!navigator.geolocation) {
    return `Geolocation is not supported by your browser.`;
  } else {
    navigator.geolocation.getCurrentPosition(sendLocation);
  }

  function sendLocation(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    async function getData(lat, long) {
      const response = await fetch(`http://localhost:3000/${lat},${long}`);
      return await response.json();
    }

    getData(lat, long).then(data => {
      
      showBodyColor(data)
      showTemperature(data)

    });
  }

  const showBodyColor = (data) => {
    if (data.main.temp > 25) {
      body.classList.add('warm')
    } else if (data.main.temp < 15) {
      body.classList.add('cold')
    } else {
      body.classList.add('medium')
    }
  }

  const showTemperature = (data) => {
    const celsiusMin = Math.round(data.main.temp_min);
    const fahrenheitMin = Math.round((celsiusMin * 9) / 5 + 32);

    const celsiusMax = Math.round(data.main.temp_max);
    const fahrenheitMax = Math.round((celsiusMax * 9) / 5 + 32)

    celsiusMinPara.innerHTML = `Min ${celsiusMin}&deg;C`;
    fahrenheitMinPara.innerHTML = `Min ${fahrenheitMin}&deg;F`;

    celsiusMaxPara.innerHTML = `Max ${celsiusMax}&deg;C`;
    fahrenheitMaxPara.innerHTML = `Max ${fahrenheitMax}&deg;F`;
  }

})();
