const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

const APIKey = 'aaf81a2a5005fe5f583606e78b54cfd0';

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/:latlong', async (req, res) => {
  const latlong = req.params.latlong.split(',');
  const lat = latlong[0];
  const long = latlong[1];
  const fetch_res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIKey}`
  );
  const json = await fetch_res.json();
  res.json(json);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
