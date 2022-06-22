'use strict';

const express=require('express');
require('dotenv').config();
let data=require('./data/weather.json');

const app=express();
const PORT=process.env.PORT||3002;

app.get('/',(request,response)=>{
});

app.get('*',(request,response)=>{
  response.send('The route you entered does not exist.');
});

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
