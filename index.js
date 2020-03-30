(function() {
  async function getData() {
    let data = await fetch('http://localhost:3000/')
    .then(res => {
      return res.json()
    })
    return data
  }
  console.log(getData())
})()