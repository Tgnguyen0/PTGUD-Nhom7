import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaPlay, FaVideo, FaStar, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import GenresList from '../Constant/GenresList'
import GlobalApi from '../Services/GlobalApi';
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import GenreMovieList from '../Componets/GenreMovieList'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DetailPage = () => {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    useEffect(() => {
        GlobalApi.getMovieById(id).then((resp) => {
            console.log("Movie Detail:", resp.data);
            setMovieDetail(resp.data);

            if (resp.data.genres && resp.data.genres.length > 0) {
                const genreId = resp.data.genres[0].id;
                GlobalApi.getMovieByGenreId(genreId).then((response) => {
                    setRelatedMovies(response.data.results);
                });
            }
        });
    }, [id]);

    if (!movieDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header></Header>
            <div className="w-full pt-[10ch] pd-16">
                <div className="w-full grid md:grid-cols-5 grid-cols-2 md:gap-16 gap-8 items-center">
                    {/* Movie poster */}
                    <div className="md:col-span-2 col-span-5 space-y-2">
                        <img
                            src={IMAGE_BASE_URL + movieDetail.poster_path}
                            alt={movieDetail.title}
                            // className="md:w-[90%] w-full aspect-[8/13] object-cover object-center rounded-xxl p-2"
                            className='md:w-[80%] w-full max-h-[600px] object-contain rounded-xxl p-2 mx-auto'
                        />
                    </div>
                    {/* Movies info */}
                    <div className="md:col-span-3 col-span-5 space-y-7">
                        {/* Movie title , rating, release date ,.... */}
                        <div className="space-y-1.5">
                            {/* Movie Title */}
                            <div className="w-full flex items-center justify-between gap-1.5 flex-wrap">
                                <h1 className="md:text-4xl text-3xl text-neutal-50 font-bold">
                                    {movieDetail.title}
                                </h1>
                                {/* Rating */}
                                <div className="flex items-center gap-x-2">
                                    <p className="text-base md:text-lg text-neutral-50 font-semibold">
                                        {movieDetail.vote_average}
                                    </p>
                                    <div className="flex items-center">
                                        <FaStar className='w-4 h-4 text-yellow-500' />
                                    </div>
                                </div>
                            </div>
                            {/* Movie release date , duration and age rating */}
                            <div className="flex items-center gap-x-2 text-sm text-neutral-500 font-nomal">
                                <p>{movieDetail.release_date}</p>
                                <div className="w-1 h-1 bg-neutral-600 rounded-full" />
                                <p>{movieDetail.adult ? (
                                    <div className="flex items-center gap-1 text-red-500">
                                        <FaExclamationTriangle className="w-4 h-4" />
                                        <span>18+</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-green-500">
                                        <FaCheckCircle className="w-4 h-4" />
                                        <span>Under 18</span>
                                    </div>
                                )}</p>
                                <div className="w-1 h-1 bg-neutral-600 rounded-full" />
                                <p>
                                    <div className="uppercase">
                                        {movieDetail.original_language}
                                    </div>
                                </p>

                            </div>
                        </div>
                        {/* Movie description */}
                        <p className="md:text-base text-sm font-normal text-neutral-400">
                            {movieDetail.overview}
                        </p>
                        {/* Starring casts */}
                        <div className="w-full flex items-start gap-x-2"> {/* Giảm gap-x-4 thành gap-x-2 */}
                            <div className="flex items-start">
                                Starrring:
                            </div>
                            <div className="flex items-center gap-x-1.5 flex-wrap text-sm text-neutral-400 font-normal">
                                <Link to="/" className="hover:text-red-500 ease-in-out duration-300">
                                    Chris Evans
                                </Link>
                            </div>
                        </div>

                        {/* Genner */}
                        <div className="w-full flex items-start gap-x-2">
                            <div className="flex items-start">Genres:</div>
                            <div className="flex items-center gap-x-1.5 flex-wrap text-sm text-neutral-400 font-normal">
                                {movieDetail.genres && movieDetail.genres.length > 0 ? (
                                    movieDetail.genres.map((genre, index) => (
                                        <Link to="/" key={index} className="hover:text-red-500 ease-in-out duration-300">
                                            {genre.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-sm text-neutral-500">No genres available</p>
                                )}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center gap-6 !mt-10">
                            <Link to="/movie/video-player/unique_id_doyyess" className="md:w-fit w-1/2 px-6 md:py-2.5 py-3 rounded-full capitalize bg-red-700 flex items-center justify-center gap-2">
                                <FaPlay />
                                Play Now
                            </Link>
                            <button className="md:w-fit w-1/2 px-6 md:py-2.5 py-3 rounded-full flex items-center justify-center gap-2">
                                <FaVideo />
                                Play Trailer
                            </button>
                        </div>
                    </div>
                </div>
                {/* Related Movies */}
                <div className="w-full mt-10">
                    <h2 className="text-lg font-bold text-neutral-50 mb-4 shrink-0">Related Movies:</h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {relatedMovies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className="flex flex-col items-center">
                                    <Link to={`/movie/${movie.id}`} className="block w-full">
                                        <img
                                            src={IMAGE_BASE_URL + movie.poster_path}
                                            alt={movie.title}
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                        <p className="text-sm text-neutral-400 mt-2 text-center">{movie.title}</p>
                                    </Link>
                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailPage;
