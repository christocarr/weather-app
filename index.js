(function() {

  const celsiusMinPara = document.getElementById('celsiusMinPara')
  const fahrenheitMinPara = document.getElementById('fahrenheitMinPara')

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

      console.log(data)

      const celsiusMin = Math.round(data.main.temp_min)
      const fahrenheitMin = Math.round(((celsiusMin * 9) / 5) + 32)

      celsiusMinPara.innerHTML = `Min ${celsiusMin}&deg;C`;
      fahrenheitMinPara.innerHTML = `Min ${fahrenheitMin}&deg;F`;
    })
  }
  
})()