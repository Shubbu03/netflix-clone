import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); //movies array is set to empty in the starting

  const [trailerUrl,setTrailerUrl] = useState("");

  useEffect(() => {
    // if [],run once when the row loads and dont run it again

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //results fetched from the axios.get with fetchUrl are set into the setMovies array
      setMovies(request.data.results);
      return request;
    }
    //if [variable], it will run everytime variable is changed!!

    fetchData();
    //fetchUrl is passed below in[] because it is a parameter outside of useEffect and will help us change our setMovies array everytime.
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars:{
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }


  }

   const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl("");
    }
    else{
      movieTrailer(movie?.name || "")
      .then(url => {
        const urlParam = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParam.get('v'));
        
         
      }).catch(error => console.log(error)) 
    }



   }


  return (
    <div className="row">
      <h2> {title} </h2>

      <div className="row__posters">
        {/* container ->  several row posters */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
     {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/> }
    </div>
  );
}

export default Row;
