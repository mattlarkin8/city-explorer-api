'use strict';

const axios=require('axios');

async function getMovies(req,res){
  try{
    let cityName=req.query.city;
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    let result=await axios.get(url);
    let groomedData=result.data.results.map(film=>new Movie(film));
    res.status(200).send(groomedData);
  }
  catch(error){
    res.status(500).send(`Error getting movies: ${error.status}. ${error.message}`);
  }
}

class Movie{
  constructor(film){
    this.title=film.title;
    this.releaseDate=film.release_date;
  }
}

module.exports=getMovies;
