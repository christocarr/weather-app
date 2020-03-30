(function() {

  const tempPara = document.querySelector('p')

  async function getData() {
    const response = await fetch('http://localhost:3000/')
    return await response.json()
  }

  getData().then(data => {
    tempPara.textContent = data.main.temp
  })

})()