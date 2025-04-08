import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import ShadowButton from '../Componets/ShadowButton';
import GenreMovieList from '../Componets/GenreMovieList';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from '../Componets/MovieCard';
import SeriesCard from '../Componets/SeriesCard';
import { FaSearch, FaSpinner } from 'react-icons/fa';
 
function Search() {
    const [startIndex, setStartIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    
    const maxVisible = 5;
    const genre = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", 
        "Crime", "Documentary", "Drama", "Family", "Fantasy", 
        "History", "Horror", "Music", "Musical", "Mystery", 
        "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
    ];

    // Genre ID mapping
    const genreIdMap = {
        "Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35, 
        "Crime": 80, "Documentary": 99, "Drama": 18, "Family": 10751, 
        "Fantasy": 14, "History": 36, "Horror": 27, "Music": 10402, 
        "Mystery": 9648, "Romance": 10749, "Sci-Fi": 878, 
        "Sport": 53, "Thriller": 53, "War": 10752, "Western": 37
    };

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    }

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, genre.length - maxVisible));
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        setNoResults(false);
        
        try {
            const response = await GlobalApi.searchMovies(searchTerm, currentPage);
            const results = response.data.results || [];
            
            // Filter out items without images if needed
            const filteredResults = results.filter(item => 
                (item.poster_path || item.backdrop_path) && 
                (item.media_type === 'movie' || item.media_type === 'tv')
            );
            
            setSearchResults(filteredResults);
            setTotalPages(response.data.total_pages);
            setNoResults(filteredResults.length === 0);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenreClick = async (genreName) => {
        setSelectedGenre(genreName);
        setSearchTerm(''); // Clear search term when selecting genre
        setLoading(true);
        
        try {
            const genreId = genreIdMap[genreName];
            if (genreId) {
                const response = await GlobalApi.getMovieByGenreId(genreId);
                setSearchResults(response.data.results || []);
                setNoResults(response.data.results.length === 0);
            }
        } catch (error) {
            console.error('Genre search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        
        if (searchTerm) {
            // If we have a search term, we need to re-search with the new page
            GlobalApi.searchMovies(searchTerm, page)
                .then(response => {
                    setSearchResults(response.data.results || []);
                    setTotalPages(response.data.total_pages);
                })
                .catch(error => console.error('Page change error:', error));
        }
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-[#1A1C22]">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-4">Tìm kiếm phim và series</h1>
                </div>

                <form onSubmit={handleSearch} className="flex justify-center mb-8">
                    <div className="relative w-full max-w-2xl">
                        <input 
                            type="search" 
                            className="w-full text-white p-3 pl-12 border-0 bg-[#2A2C32] rounded-full font-medium"
                            placeholder="Tìm kiếm phim, series..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                fontSize: "18px",
                                outline: "none",
                                transition: "0.3s ease-in-out",
                                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)"
                            }}
                            onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.2)"}
                            onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.1)"}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FaSearch size={16} />
                        </div>
                        <button 
                            type="submit" 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700 transition-colors"
                        >
                            Tìm
                        </button>
                    </div>
                </form>

                <div className="flex justify-center items-center mb-8">
                    <ShadowButton onClick={handlePrev} disabled={startIndex === 0}>&lt;</ShadowButton>
                    <div className="overflow-hidden mx-5 max-w-4xl">
                        <div className="flex space-x-2">
                            {genre.slice(startIndex, startIndex + maxVisible).map((item) => (
                                <button 
                                    key={item} 
                                    type="button"
                                    className={`font-medium text-white px-4 py-2 rounded-full transition-all ${
                                        selectedGenre === item ? 'bg-red-600' : 'bg-[#2A2C32] hover:bg-[#3A3C42]'
                                    }`}
                                    onClick={() => handleGenreClick(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ShadowButton onClick={handleNext} disabled={startIndex >= genre.length - maxVisible}>&gt;</ShadowButton>
                </div>

                {/* Search Results */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <FaSpinner className="animate-spin text-white text-4xl" />
                    </div>
                ) : searchResults.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">
                            {selectedGenre ? `Phim thể loại: ${selectedGenre}` : 'Kết quả tìm kiếm'}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {searchResults.map((item) => (
                                item.media_type === 'tv' || item.first_air_date ? (
                                    <SeriesCard key={item.id} series={item} />
                                ) : (
                                    <MovieCard key={item.id} movie={item} />
                                )
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
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
                        )}
                    </div>
                ) : noResults ? (
                    <div className="text-center py-10">
                        <p className="text-white text-lg">Không tìm thấy kết quả nào.</p>
                    </div>
                ) : (
                    <GenreMovieList />
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Search;