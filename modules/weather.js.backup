'use strict';

const axios=require('axios');


async function getWeather(req,res){
  try{
    let lat=req.query.lat;
    let lon=req.query.lon;
    let url=`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    let result=await axios.get(url);
    let groomedData=result.data.data.map(dayObj=>new Forecast(dayObj));
    res.status(200).send(groomedData);
  }
  catch(error){
    res.status(500).send(`Error getting weather: ${error.status}. ${error.message}`);
  }
}

class Forecast{
  constructor(weatherObject){
    this.datetime=weatherObject.datetime;
    this.description=weatherObject.weather.description;
  }
}

module.exports=getWeather;
