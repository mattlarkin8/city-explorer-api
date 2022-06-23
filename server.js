'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const axios=require('axios');

const app=express();
app.use(cors());

const PORT=process.env.PORT||3002;

app.get('/weather',async(request,response)=>{
  try {
    // let searchQuery = request.query.searchQuery;
    let lat=request.query.lat;
    let lon=request.query.lon;
    // let searchResult=data.find(obj=>obj.lat===lat&&obj.lon===lon);
    let url=`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    // let searchResult = data.find(obj => obj.city_name.toLowerCase() === searchQuery.toLowerCase());
    // let result = searchResult.data.map(dayObj => new Forecast(dayObj));
    let result=await axios.get(url);
    response.status(200).send(result.data);
  }
  catch (error) {
    response.status(500).send(`Encountered an error: ${error.status}. ${error.message}`);
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

// app.use((error,request,response,next)=>{
//   response.status(500).send(error.message);
// });

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
