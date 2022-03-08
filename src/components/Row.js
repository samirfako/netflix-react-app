import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  // we need a snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if we leave the bracket blank [], that means run once when the row loads and don't run it again, if we pass e.g. [movies] it will run every single time when movies change that is called dependencies
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // 'https://api.themoviedb.org/3' = fetchUrl
      // console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* Container -> posters */}
      <div className="row__posters">
        {/*several row_poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            // single image
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
