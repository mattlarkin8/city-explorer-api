'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const data=require('./data/weather.json');

const app=express();
app.use(cors());

const PORT=process.env.PORT||3002;

app.get('/weather',(request,response)=>{
  try {
    let searchQuery = request.query.searchQuery;
    // let lat=request.query.lat;
    // let lon=request.query.lon;
    // let city=data.find(obj=>obj.lat===lat&&obj.lon===lon);
    let searchResult = data.find(obj => obj.city_name.toLowerCase() === searchQuery.toLowerCase());
    let result = searchResult.data.map(dayObj => new Forecast(dayObj));
    response.status(200).send(result);
  }
  catch (error) {
    next(error);
  }
});

app.get('*',(request,response)=>{
  response.status(404).send('The route you entered does not exist.');
});

class Forecast{
  constructor(weatherObject){
    this.datetime=weatherObject.datetime;
    this.description=weatherObject.weather.description;
  }
}

app.use((error,request,response,next)=>{
  response.status(500).send(error.message);
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
