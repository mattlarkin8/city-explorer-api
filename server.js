'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const movies=require('./modules/movies');

const app = express();
app.use(cors());

const PORT=process.env.PORT||3002;

app.get('/weather', weatherHandler);

app.get('/movies',movieHandler);

app.get('*',(request,response)=>{
  response.status(404).send('The route you entered does not exist.');
});

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Trouble getting weather!');
    });
}

function movieHandler(request, response) {
  const city = request.query.city;
  movies(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Trouble getting movies!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
