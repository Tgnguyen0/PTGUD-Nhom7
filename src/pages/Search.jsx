import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import ShadowButton from '../Componets/ShadowButton';
import GenreMovieList from '../Componets/GenreMovieList';
import GenresList from '../Constant/GenresList';
import MovieCard from '../Componets/MovieCard';
import Footer from '../Componets/Footer';
import GlobalApi from "../Services/GlobalApi";
//import '../App.css'
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
 
function Search() {
    const [ displayList, setDisplayList ] = useState([]);
    const [ allList, setAllList ] = useState([]);
    const [ filter, setFilter ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ show, setShow ] = useState(false);
    const [activeButtonId, setActiveButtonId] = useState(null);

    useEffect(() => {
        fetchMoviesAndSeries();
        getMovieByGenreId();
    }, [currentPage]);
    
    const fetchMoviesAndSeries = async () => {
        try {
            setLoading(true);
            const today = new Date().toISOString().split('T')[0];
    
            const [movieResponse, tvResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf&page=${currentPage}&language=vi-VN&sort_by=release_date.desc&per_page=20&include_adult=false&include_video=false&vote_count.gte=100&release_date.lte=${new Date().toISOString().split('T')[0]}`),
                fetch(`https://api.themoviedb.org/3/discover/tv?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf&page=${currentPage}&language=vi-VN&sort_by=first_air_date.desc&per_page=20&vote_count.gte=100&first_air_date.lte=${new Date().toISOString().split('T')[0]}`)
            ]);
    
            const movieData = await movieResponse.json();
            const tvData = await tvResponse.json();
    
            if (!movieResponse.ok) throw new Error(movieData.message || 'Failed to fetch movies');
            if (!tvResponse.ok) throw new Error(tvData.message || 'Failed to fetch TV series');
    
            const movieResults = movieData.results || [];
            const tvResults = tvData.results || [];
    
            const paddedMovies = [...movieResults];
            while (paddedMovies.length < 20 && movieResults.length > 0) {
                paddedMovies.push({ ...movieResults[0], id: `dummy-movie-${paddedMovies.length}` });
            }
    
            const paddedTV = [...tvResults];
            while (paddedTV.length < 20 && tvResults.length > 0) {
                paddedTV.push({ ...tvResults[0], id: `dummy-tv-${paddedTV.length}` });
            }
    
            setAllList([...paddedMovies, ...paddedTV]);
            setDisplayList([...paddedMovies, ...paddedTV]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };    

    const getMovieByGenreId = (genreId) => {
        setLoading(true);
        GlobalApi.getMovieByGenreId(genreId)
        .then((resp) => {
            setDisplayList(resp.data.results);
        })
        .catch((error) => {
            console.error("Lỗi khi lấy phim theo thể loại:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleChooseFilter = (genre, id) => {
        if (filter !== "") {
            setFilter("");
            setDisplayList([]);
            setActiveButtonId(null); // reset active
        } else {
            setFilter(genre);
            getMovieByGenreId(genre.id);
            setActiveButtonId(id); // set active id
        }
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
    
        const filteredItems = allList.filter((item) => {
            const itemTitle = item.title || item.name || '';
            return itemTitle.toLowerCase().includes(searchTerm.toLowerCase());
        });
    
        setDisplayList(filteredItems);
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

            <div
                className="d-flex justify-content-between align-items-center text-white border rounded-pill border-secondary"
                style={{
                    margin: "auto",
                    width: "70%",
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                }}
                onClick={() => handleToggle(!show)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
                <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Bộ lọc</h2>
                <span style={{ textAlign: "end", fontSize: "0.9rem" }}>
                    Nhấn vào đây để xem bộ lọc
                </span>
            </div>

            <div 
                className={`d-flex justify-content-center align-items-center content ${show ? 'open' : ''}`} 
                style={{ flexWrap: "nowrap", width: "100%" }}
            >
                <table
                    className="table table-borderless table-transparent"
                    style={{
                        width: "70%",
                        maxWidth: "70%",
                    }}
                >
                    <tbody>
                        <tr className="border-bottom">
                            <td className="text-white">Thể loại: </td>
                            <td>
                                {GenresList.genere.map((item) => (
                                    <button
                                        key={item.id}
                                        id={item.id}
                                        type="button"
                                        className="font-semibold mx-1"
                                        style={{
                                            textAlign: "center",
                                            borderRadius: "30px",
                                            paddingLeft: "20px",
                                            fontSize: "12px",
                                            outline: "none",
                                            marginBottom: "4px",
                                            width: "117px",
                                            transition: "0.3s ease-in-out",
                                            color: activeButtonId === item.id ? "black" : "ghostwhite",
                                            backgroundColor: activeButtonId === item.id ? "ghostwhite" : "",
                                            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
                                        }}
                                        onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.4)"}
                                        onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.2)"}
                                        onClick={(e) => handleChooseFilter(item, item.id)}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </td>
                        </tr>
                        <tr className="border-bottom">
                            <td className="text-white">Ngôn ngữ: </td>
                            <td></td>
                        </tr>
                    </tbody>   
                </table>         
            </div>

            {(search.trim() === '' && filter === '') ? (
                <GenreMovieList />
            ) : (
                <div className="container mx-auto px-4 py-8">      
                    {filter !== '' ? <h1 className="text-2xl font-bold text-white mb-6" style={{width: "100%"}}>{filter.name}</h1> : <div></div>}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {displayList.map((movie) => (
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

            <Footer />
        </div>
    );
}

export default Search;