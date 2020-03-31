(function() {

  const celsiusPara = document.getElementById('celsiusPara')
  const fahrenheitPara = document.getElementById('fahrenheitPara')

  //get devices current location
  if (!navigator.geolocation) {
    return `Geolocation is not supported by your browser.`
  } else {
    navigator.geolocation.getCurrentPosition(sendLocation)
  }

  function sendLocation(position) {
    const lat = position.coords.latitude
    const long = position.coords.longitude

    async function getData(lat, long) {
      const response = await fetch(`http://localhost:3000/${lat},${long}`)
      return await response.json()
    }

    getData(lat, long).then(data => {
      const celsius = data.main.temp
      const fahrenheit = ((celsius * 9) / 5) + 32

      celsiusPara.innerHTML = `${celsius} &deg;C`;
      fahrenheitPara.innerHTML = `${fahrenheit} &deg;F`;
    })
  }
  
})()