const express = require('express')
const app = express()
const port = 3000

const axios = require('axios')


axios({
  method: 'get',
  url: 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
  headers: {'Access-Control-Allow-Origin': '*'}
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))