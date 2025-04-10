import React from 'react';
import MovieCard from './MovieCard';

function DisplayList({ displayList, currentPage, totalPages, handlePageChange }) {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Movie Grid */}
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
    );
}

export default DisplayList;