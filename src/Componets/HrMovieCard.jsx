import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function HrMovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <section className='hover:scale-110 transition-all duration-150 ease-in'>
        <img
          src={IMAGE_BASE_URL + movie.backdrop_path}
          alt={movie.title}
          className='w-[110px] md:w-[260px] rounded-lg
          hover:border-[3px] border-gray-400 cursor-pointer'
        />
        <h2 className='w-[110px] md:w-[260px] text-white mt-2'>{movie.title}</h2>
      </section>
    </Link>
  );
}

export default HrMovieCard;
