(function() {

  //get devices current location 
  const getCoordinates = () => {
    const success = position => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      console.log(lat, long)
    }

    const error = () => {
      return `Unable to retrieve you location.`
    }

    if (!navigator.geolocation) {
      return `Geolocation is not supported by your browser.`
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  const tempPara = document.querySelector('p')

  async function getData() {
    const response = await fetch('http://localhost:3000/')
    return await response.json()
  }

  getCoordinates()

  getData().then(data => {
    tempPara.textContent = data.main.temp
  })

})()