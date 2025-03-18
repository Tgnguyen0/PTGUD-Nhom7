import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import ShadowButton from '../Componets/ShadowButton';
import GenreMovieList from '../Componets/GenreMovieList';
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";

function Search() {
    const [startIndex, setStartIndex] = useState(0);
    const maxVisible = 5;
    const genre = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", 
        "Crime", "Documentary", "Drama", "Family", "Fantasy", 
        "History", "Horror", "Music", "Musical", "Mystery", 
        "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
    ];

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    }

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, genre.length - maxVisible));
    }

    return (
        <div>
            <Header />

            <div className="text-center font-semibold">
                <h1>What do you want to watch ?</h1>
            </div>

            <div className="d-flex justify-content-center align-items-center vh-100 text-center">
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
                    onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.4)"}
                    onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.2)"}
                />

                <div className="flex justify-center items-center" style={{flexWrap: "nowrap", width: "100%"}}>
                    <ShadowButton onClick={handlePrev} disabled={startIndex === 0}>&lt;</ShadowButton>
                    <div style={{overflow: "hidden", margin: "5px", maxWidth: "60%", padding: "5px"}}>
                        {genre.slice(startIndex, startIndex + maxVisible).map((item) => (
                            <button 
                                key={item} 
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
                            >{item}</button>
                        ))}
                    </div>
                    <ShadowButton onClick={handleNext} disabled={startIndex >= genre.length - maxVisible}>&gt;</ShadowButton>
                </div>
            </div>

            <GenreMovieList />
        </div>
    );
}

export default Search;