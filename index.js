(function() {

  const tempPara = document.querySelector('p')

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
      tempPara.textContent = data.main.temp
    })
  }
  
})()