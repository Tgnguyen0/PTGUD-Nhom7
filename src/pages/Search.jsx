import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import ShadowButton from '../Componets/ShadowButton';
import GenreMovieList from '../Componets/GenreMovieList';
import GenresList from '../Constant/GenresList';
import LangList from '../Constant/LangList';
import AgeList from '../Constant/AgeList';
import MovieCard from '../Componets/MovieCard';
import Footer from '../Componets/Footer';
import GlobalApi from "../Services/GlobalApi";
import DisplayList from '../Componets/DisplayList';
import ReleaseYearList from '../Constant/ReleaseYearList';
//import '../App.css'
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";

function Search() {
    const [ displayList, setDisplayList ] = useState([]);
    const [ allList, setAllList ] = useState([]);
    const [filter, setFilter] = useState("");
    const [ filters, setFilters ] = useState({});
    const [ search, setSearch ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ show, setShow ] = useState(false);
    const [activeButtonIds, setActiveButtonIds] = useState([]);

    useEffect(() => {
        fetchMoviesAndSeries();
        getMoviesByFilters();
    }, [currentPage]);
    
    const fetchMoviesAndSeries = async () => {
        try {
            setLoading(true);
            const data = await GlobalApi.getMoviesAndSeries(currentPage);
            setAllList(data);
            setDisplayList(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getMoviesByFilters = (filters) => {
        setLoading(true);
        GlobalApi.getMoviesByFilters(filters)
            .then((response) => {
                setDisplayList(response.data.results);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy phim theo filters:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const renderFilterButtons = (label, list, type, idKey, nameKey) => (
        <tr className="border-bottom border-secondary">
          <td className="text-white">{label}</td>
          <td>
            {list.map((item) => {
              const itemId = item[idKey];
              const isActive = activeButtonIds.includes(itemId);
      
              return (
                <button
                  key={itemId}
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
                    color: isActive ? "black" : "ghostwhite",
                    backgroundColor: isActive ? "ghostwhite" : "",
                    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)"
                  }}
                  onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.4)"}
                  onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.2)"}
                  onClick={() => handleChooseFilter(type, item, itemId)}
                >
                  {item[nameKey]}
                </button>
              );
            })}
          </td>
        </tr>
    );
    
    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleChooseFilter = (type, value, id) => {
        setActiveButtonIds(prevIds => {
            // Toggle button
            if (prevIds.includes(id)) {
                return prevIds.filter(existingId => existingId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
    
            if (type === "genre") {
                const existingGenres = updatedFilters.genres || [];
                if (existingGenres.includes(value.id)) {
                    // Nếu đã chọn, bỏ đi
                    updatedFilters.genres = existingGenres.filter(genreId => genreId !== value.id);
                } else {
                    // Thêm mới
                    updatedFilters.genres = [...existingGenres, value.id];
                }
    
                // Nếu mảng rỗng thì xóa field
                if (updatedFilters.genres.length === 0) {
                    delete updatedFilters.genres;
                }
            }
    
            if (type === "language") {
                if (updatedFilters.language === value.iso_639_1) {
                    delete updatedFilters.language;
                } else {
                    updatedFilters.language = value.iso_639_1;
                }
            }
    
            if (type === "releaseYear") {
                if (updatedFilters.year === value.year) {
                    delete updatedFilters.year;
                } else {
                    updatedFilters.year = value.year;
                }
            }
    
            // Fetch movies với filters mới
            getMoviesByFilters(updatedFilters);
    
            return updatedFilters;
        });
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
                <table className="table table-borderless table-transparent" style={{ width: "70%", maxWidth: "70%" }}>
                    <tbody>
                        {renderFilterButtons("Thể loại", GenresList.genere, "genre", "id", "name")}
                        {renderFilterButtons("Ngôn ngữ", LangList.lang, "language", "iso_639_1", "name")}
                        {renderFilterButtons("Năm phát hành", ReleaseYearList.years, "releaseYear", "year", "year")}
                    </tbody>
                </table>      
            </div>

            {(search.trim() === '' && Object.keys(filters).length === 0) ? (
                <GenreMovieList />
            ) : (
                <DisplayList
                    displayList={displayList}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            )}

            <Footer />
        </div>
    );
}

export default Search;