import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeriesCard = ({ series }) => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    
    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/genre/tv/list?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf&language=vi-VN'
            );
            const data = await response.json();
            if (series.genre_ids) {
                const seriesGenres = data.genres
                    .filter(genre => series.genre_ids.includes(genre.id))
                    .map(genre => genre.name);
                setGenres(seriesGenres);
            }
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const imageUrl = series.poster_path
        ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const backdropUrl = series.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${series.backdrop_path}`
        : imageUrl;

    const handleClick = (e, type) => {
        e.preventDefault();
        navigate(`/movie/${series.id}`, { 
            state: { 
                movieData: series,
                type: 'tv'
            } 
        });
    };

    return (
        <div className="group relative">
            <div className="flex flex-col">
                <div className="relative rounded-lg overflow-hidden">
                    {/* Series Poster */}
                    <img
                        src={imageUrl}
                        alt={series.name}
                        className="w-full aspect-[2/3] object-cover cursor-pointer"
                        onClick={(e) => handleClick(e, 'detail')}
                    />

                    {/* Episode/Season Badge */}
                    <div className="absolute top-2 left-2 flex gap-1">
                        <span className="bg-black/70 text-white px-2 py-0.5 text-xs rounded">
                            PĐ. {series.number_of_seasons || 1}
                        </span>
                        {series.next_episode_to_air && (
                            <span className="bg-green-600/90 text-white px-2 py-0.5 text-xs rounded">
                                TM. {series.next_episode_to_air.episode_number}
                            </span>
                        )}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2">
                        <span className="bg-yellow-500/90 text-black px-2 py-0.5 text-xs font-medium rounded">
                            {series.vote_average ? series.vote_average.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                </div>
                
                {/* Series Title */}
                <h3 
                    className="text-white text-base font-medium mt-2 line-clamp-2 text-center cursor-pointer hover:text-yellow-500 transition-colors"
                    onClick={(e) => handleClick(e, 'detail')}
                >
                    {series.name}
                </h3>
            </div>

            {/* Hover Card */}
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute z-50 w-[300px] bg-[#1A1C22] rounded-lg overflow-hidden shadow-xl -translate-y-[100%] left-1/2 -translate-x-1/2 border border-gray-700">
                {/* Backdrop Image */}
                <div className="relative h-[169px] w-full">
                    <img 
                        src={backdropUrl} 
                        alt={series.name} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C22] to-transparent"></div>
                </div>

                <div className="flex flex-col gap-2 p-4 -mt-8 relative">
                    <h3 className="text-white text-lg font-semibold">{series.name}</h3>
                    {series.original_name && series.original_name !== series.name && (
                        <p className="text-yellow-500 text-sm">{series.original_name}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="bg-yellow-500 text-black px-2 py-0.5 rounded">
                            IMDb {series.vote_average ? series.vote_average.toFixed(1) : 'N/A'}
                        </span>
                        {series.first_air_date && (
                            <span>{new Date(series.first_air_date).getFullYear()}</span>
                        )}
                        <span>{series.number_of_seasons || 1} Phần</span>
                        <span>{series.number_of_episodes || '?'} Tập</span>
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

export default SeriesCard; 