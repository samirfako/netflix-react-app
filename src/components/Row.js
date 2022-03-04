import React, { useState, useEffect } from 'react';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  // we need a snippet of code which runs based on a sepcific condition/variable
  useEffect =
    (() => {
      // if we leave the bracket blanck [], that means run once when the row loads and don't run it again, if we pass e.g. [movies] it will run every single time when movies change that is called dependecies
    },
    []);

  return (
    <div>
      <h2>{title}</h2>

      {/* Container -> posters */}
    </div>
  );
};

export default Row;
