'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');

const getWeather=require('./modules/weather');
const getMovies=require('./modules/movies');

const app=express();
app.use(cors());

const PORT=process.env.PORT||3002;

app.get('/weather',getWeather);

app.get('/movies',getMovies);

app.get('*',(request,response)=>{
  response.status(404).send('The route you entered does not exist.');
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
