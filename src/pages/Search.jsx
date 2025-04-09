import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import ShadowButton from '../Componets/ShadowButton';
import GenreMovieList from '../Componets/GenreMovieList';
import GenresList from '../Constant/GenresList';
import SeriesCard from '../Componets/SeriesCard';
import MovieCard from '../Componets/MovieCard';
import Footer from '../Componets/Footer';
import GlobalApi from "../Services/GlobalApi";
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
 
function Search() {
    const [ movies, setMovies] = useState([]);
    const [ series, setSeries] = useState([]);
    const [ startIndex, setStartIndex ] = useState(0);
    const [ search, setSearch ] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const maxVisible = 5;

    useEffect(() => {
        fetchMovies();
        fetchSeries();
        
        GlobalApi.getAllMovies().then((resp) => {
            setMovies([...movies, resp.data]);
        })
    }, [currentPage]);
    
    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf&page=${currentPage}&language=vi-VN&sort_by=release_date.desc&per_page=20&include_adult=false&include_video=false&vote_count.gte=100&release_date.lte=${new Date().toISOString().split('T')[0]}`
            );
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch movies');
            }

            const results = data.results || [];
            const paddedResults = [...results];
            while (paddedResults.length < 20) {
                paddedResults.push({ ...results[0], id: `dummy-${paddedResults.length}` });
            }
            setMovies(paddedResults);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSeries = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/tv?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf&page=${currentPage}&language=vi-VN&sort_by=first_air_date.desc&per_page=20&vote_count.gte=100&first_air_date.lte=${new Date().toISOString().split('T')[0]}`
            );
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch TV series');
            }

            const results = data.results || [];
            const paddedResults = [...results];
            while (paddedResults.length < 20) {
                paddedResults.push({ ...results[0], id: `dummy-${paddedResults.length}` });
            }
            setSeries(paddedResults);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    }

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, GenresList.genere.length - maxVisible));
    }

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);

        const combinedItems = [...movies, ...series];
        const filteredItems = combinedItems.filter((item) => {
            const itemTitle = item.title || item.name || '';
            const searchLower = searchTerm.toLowerCase();
            return itemTitle.toLowerCase().includes(searchLower)
        });

        setTotalPages(Math.ceil(filteredItems.length / 20));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1A1C22]">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1A1C22]">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-red-500 text-xl">{error}</div>
                </div>
                <Footer />
            </div>
        );
    }

    const combinedItems = [...movies, ...series];
    const filteredItems = combinedItems.filter((item) => {
        const itemTitle = item.title || item.name || '';
        const searchTerm = typeof search === 'string' ? search.toLowerCase() : '';
    
        return (
            (typeof itemTitle === 'string' && itemTitle.toLowerCase().includes(searchTerm)) 

        );
    });

    return (
        <div>
            <Header />

            <div className="text-center font-semibold text-white">
                <h1>What do you want to watch ?</h1>
            </div>

            <div className="d-flex justify-content-center align-items-center text-center">
                <input 
                    type="search" 
                    className="text-white p-3 m-5 border-0 bg-dark font-semibold shadow-sm bg-dark"
                    placeholder="Search Films, Genres..."
                    style={{ 
                        width: "60%", 
                        borderRadius: "30px", 
                        paddingLeft: "20px",
                        fontSize: "18px",
                        outline: "none",
                        transition: "0.3s ease-in-out",
                        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)"
                    }}
                    value={search}
                    onChange={handleSearchChange}
                    onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.4)"}
                    onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.2)"}
                />
            </div>

            <div class="d-flex justify-content-center items-center dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                    Dropdown button
                </button>
                    
                <div className="dropdown-menu" style={{flexWrap: "nowrap", width: "100%"}}>
                    <ShadowButton onClick={handlePrev} disabled={startIndex === 0}>&lt;</ShadowButton>
                    <div style={{overflow: "hidden", margin: "5px", maxWidth: "60%", padding: "5px"}}>
                        {GenresList.genere.slice(startIndex, startIndex + maxVisible).map((item) => (
                            <button 
                                key={item.id} 
                                type="button"
                                className="font-semibold text-white mx-1"
                                style={{
                                    borderRadius: "30px", 
                                    paddingLeft: "20px",
                                    fontSize: "18px",
                                    outline: "none",
                                    width: "140px",
                                    transition: "0.3s ease-in-out",
                                    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)"
                                }}
                                onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.4)"}
                                onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.2)"}
                            >{item.name}</button>
                        ))}
                    </div>
                    <ShadowButton onClick={handleNext} disabled={startIndex >= GenresList.genere.length - maxVisible}>&gt;</ShadowButton>
                </div>
            </div>

            {search.trim() === '' ? (
                <GenreMovieList />
            ) : (
                <div className="container mx-auto px-4 py-8">                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredItems.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center mt-8 gap-4">
                        <button 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            className="text-white bg-[#2A2C32] p-2 rounded-full disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-2 text-white">
                            <span>Trang</span>
                            <input 
                                type="number" 
                                value={currentPage}
                                onChange={(e) => {
                                    const page = parseInt(e.target.value);
                                    if (page > 0 && page <= totalPages) {
                                        handlePageChange(page);
                                    }
                                }}
                                className="w-16 bg-[#2A2C32] text-center rounded-lg px-2 py-1"
                            />
                            <span>/ {totalPages}</span>
                        </div>
                        <button 
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            className="text-white bg-[#2A2C32] p-2 rounded-full disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;