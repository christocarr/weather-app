const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

const APIKey = 'aaf81a2a5005fe5f583606e78b54cfd0';

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//send files when app started
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, 'public', 'main.css'));
});

app.get('/:data', async (req, res) => {
  const reqData = req.params.data; //comes from users IP location
  dataArr = reqData.split(',');
  const [lat, lon, location] = dataArr;
  let units = location === 'America' ? 'imperial' : 'metric';
  const data = await fetch(
    `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely}&appid=${APIKey}&units=${units}`
  );
  const json = await data.json();
  res.json(json);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
