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
  res.sendFile(path.join(__dirname, 'public', 'main.css'))
});

app.get('/:coordinates', async (req, res) => {
  const coordinates = req.params.coordinates; //comes from users IP location
  const coordinatesArr = coordinates.split(',')
  const data = await fetch(
    `http://api.openweathermap.org/data/2.5/onecall?lat=${coordinatesArr[0]}&lon=${coordinatesArr[1]}&appid=${APIKey}&units=metric`
  );
  const json = await data.json();
  console.log(json)
  res.json(json);
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
