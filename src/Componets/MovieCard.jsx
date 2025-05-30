import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    
    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/genre/movie/list?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf&language=vi-VN'
            );
            const data = await response.json();
            if (movie.genre_ids) {
                const movieGenres = data.genres
                    .filter(genre => movie.genre_ids.includes(genre.id))
                    .map(genre => genre.name);
                setGenres(movieGenres);
            }
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : imageUrl;

    const handleClick = (e, type) => {
        e.preventDefault();
        navigate(`/movie/${movie.id}`, { 
            state: { 
                movieData: movie,
                type: 'movie'
            } 
        });
    };

    return (
        <div className="group relative">
            <div className="flex flex-col">
                <div className="relative rounded-lg overflow-hidden">
                    {/* Movie Poster */}
                    <img
                        src={imageUrl}
                        alt={movie.title}
                        className="w-full aspect-[2/3] object-cover cursor-pointer"
                        onClick={(e) => handleClick(e, 'detail')}
                    />

                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2">
                        <span className="bg-yellow-500/90 text-black px-2 py-0.5 text-xs font-medium rounded">
                            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                </div>
                
                {/* Movie Title */}
                <h3 
                    className="text-white text-base font-medium mt-2 line-clamp-2 text-center cursor-pointer hover:text-yellow-500 transition-colors"
                    onClick={(e) => handleClick(e, 'detail')}
                >
                    {movie.title || movie.name}
                </h3>
            </div>

            {/* Hover Card */}
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute z-50 w-[300px] bg-[#1A1C22] rounded-lg overflow-hidden shadow-xl -translate-y-[100%] left-1/2 -translate-x-1/2 border border-gray-700">
                {/* Backdrop Image */}
                <div className="relative h-[169px] w-full">
                    <img 
                        src={backdropUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C22] to-transparent"></div>
                </div>

                <div className="flex flex-col gap-2 p-4 -mt-8 relative">
                    <h3 className="text-white text-lg font-semibold">{movie.title || movie.name}</h3>
                    {movie.original_title && movie.original_title !== movie.title && (
                        <p className="text-yellow-500 text-sm">{movie.original_title}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="bg-yellow-500 text-black px-2 py-0.5 rounded">
                            IMDb {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                        </span>
                        {movie.release_date && (
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                        )}
                        {movie.runtime && (
                            <span>{movie.runtime} phút</span>
                        )}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button 
                            className="flex-1 bg-yellow-500 text-black py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                            onClick={(e) => handleClick(e, 'watch')}
                        >
                            Xem ngay
                        </button>
                        <button 
                            className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                            onClick={(e) => handleClick(e, 'detail')}
                        >
                            Chi tiết
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {genres.map((genre) => (
                            <span key={genre} className="text-xs text-gray-400">
                                • {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
