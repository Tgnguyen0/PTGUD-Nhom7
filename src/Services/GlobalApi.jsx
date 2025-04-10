import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3"
const api_key = '2ec0d66f5bdf1dd12eefa0723f1479cf'

const movieByGenreBaseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf';

//https://api.themoviedb.org/3/trending/all/day?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf
const getTrendingVideos = axios.get(movieBaseUrl +
    "/trending/all/day?api_key=" + api_key);
const getMovieByGenreId = (id) =>
    axios.get(movieByGenreBaseURL + "&with_genres=" + id)
const getMovieById = (id) =>
    axios.get(`${movieBaseUrl}/movie/${id}?api_key=${api_key}`);
const getAllMovies = () =>
    axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}`);
const getMoviesByGenreIds = (ids) => {
    const genreIds = ids.join(',');
    return axios.get(`${movieByGenreBaseURL}&with_genres=${genreIds}`);
};
const getMoviesByLanguage = (languageCode) => {
    return axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}&with_original_language=${languageCode}`);
};
const getMoviesByFilters = (filters = {}) => {
    let url = `${movieBaseUrl}/discover/movie?api_key=${api_key}`;

    if (filters.genres && filters.genres.length > 0) {
        url += `&with_genres=${filters.genres.join(',')}`;
    }

    if (filters.language) {
        url += `&with_original_language=${filters.language}`;
    }

    if (filters.year) {
        url += `&primary_release_year=${filters.year}`;
    }

    if (filters.sortBy) {
        url += `&sort_by=${filters.sortBy}`;
    }

    if (filters.page) {
        url += `&page=${filters.page}`;
    }

    return axios.get(url);
};
const getMoviesAndSeries = async (page = 1) => {
    const today = new Date().toISOString().split('T')[0];

    const movieURL = `${movieBaseUrl}/discover/movie?api_key=${api_key}&page=${page}&language=vi-VN&sort_by=release_date.desc&per_page=20&include_adult=false&include_video=false&vote_count.gte=100&release_date.lte=${today}`;

    const tvURL = `${movieBaseUrl}/discover/tv?api_key=${api_key}&page=${page}&language=vi-VN&sort_by=first_air_date.desc&per_page=20&vote_count.gte=100&first_air_date.lte=${today}`;

    try {
        const [movieResponse, tvResponse] = await Promise.all([
            axios.get(movieURL),
            axios.get(tvURL)
        ]);

        const movieResults = movieResponse.data.results || [];
        const tvResults = tvResponse.data.results || [];

        // Pad để đủ 20 phần tử mỗi loại (nếu thiếu)
        const padResults = (results, label) => {
            const padded = [...results];
            while (padded.length < 20 && results.length > 0) {
                padded.push({ ...results[0], id: `dummy-${label}-${padded.length}` });
            }
            return padded;
        };

        const paddedMovies = padResults(movieResults, 'movie');
        const paddedTV = padResults(tvResults, 'tv');

        return [...paddedMovies, ...paddedTV];
    } catch (error) {
        console.error("Error fetching movies and series:", error);
        throw error;
    }
};

export default {
    getTrendingVideos,
    getMovieByGenreId,
    getMovieById,
    getAllMovies,
    getMoviesByGenreIds,
    getMoviesByLanguage,
    getMoviesByFilters,
    getMoviesAndSeries
};