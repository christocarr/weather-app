const express = require('express')
const app = express()
const port = 3000

const axios = require('axios')
const fetch = require('node-fetch')

app.get('/', async(req, res) => {
  const fetch_res = await fetch('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
  const json = await fetch_res.json()
  res.json(json)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))