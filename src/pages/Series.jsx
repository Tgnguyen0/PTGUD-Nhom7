import React, { useState, useEffect } from 'react';
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import SeriesCard from '../Componets/SeriesCard';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchSeries();
    }, [currentPage]);

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
            setTotalPages(data.total_pages);
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
        <div className="min-h-screen bg-[#1A1C22]">
            <Header />
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-white mb-6">Phim bộ</h1>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {series.map((show) => (
                        <SeriesCard key={show.id} series={show} />
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

            <Footer />
        </div>
    );
};

export default Series; 