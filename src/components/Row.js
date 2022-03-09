import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

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

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  // importing video trailer by clicking an image
  const handleClick = (movie) => {
    if (trailerUrl) {
      // with set trailer we make a video non visible
      setTrailerUrl('');
    } else {
      // movieTrailer search through youtube videos to find right trailer
      movieTrailer(movie?.name || movie?.title || '')
        .then((url) => {
          // https://www.youtube.com/watch?v=wVjzK874ELY <==== v= is what we looking for
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* Container -> posters */}
      <div className="row__posters">
        {/*several row_poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            // single image
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
