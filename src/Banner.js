import React, { useState,useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState([]); //movies array is set to empty in the starting

  useEffect(() => {
    async function fetchData() { // this function is the same as Row.js one , here we are creating a axios get request to get a random movie from our predefined API paths.
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );//the line inside data.results is used to generate a random number from 20 of the netflix originals and display that one on our banner

      return request; 
    }

    fetchData(); //the function is called to start it .
  }, []);

  // the truncate function is used to keep the description till 150 words only and remove any words further and put ... in place of it
  function truncate(str,n){
    return str?.length> n ? str.substr(0,n-1) + "..." : str; 
  }
  return (
    <header className="banner"
     style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
        )`,
        backgroundPosition: "center center",
     }}
    > 
        <div className="banner__contents">


        </div>
     
      {/* Title */}

      <h1 className="banner__title"> 
        {movie?.title || movie?.name || movie?.original_name}
      </h1>

      {/* div 2buttons */}

      <div className="banner__buttons">

        <button className="banner__button">Play</button>
        
        <button className="banner__button">My List</button>

      </div>

      {/* description */}

      <h1 className="banner__description">{truncate(movie?.overview,150)}</h1>

      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
