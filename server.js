'use strict';

const express=require('express');
require('dotenv').config();
let data=require('./data/weather.json');

const app=express();
const PORT=process.env.PORT||3002;

app.get('/weather',(request,response)=>{
  let cityName=request.query.city;
  // let lat=request.query.lat;
  // let lon=request.query.lon;
  // let city=data.find(obj=>obj.lat===lat&&obj.lon===lon);
  let city=data.find(obj=>obj.city_name===cityName);
  response.send(`${city}`);
});

app.get('*',(request,response)=>{
  response.send('The route you entered does not exist.');
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
