import { createContext, useReducer } from "react";

const FilmReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.payload];
        case 'DELETE':
            return state.filter((item) => item.id !== action.payload.id);
        case 'PAYMENT':
            alert("Cám ơn bạn đã mua hàng của chúng tôi!");
            return [];
        case 'DELETEALL':
            return [];
        case 'SEARCH':
            return {
                ...state,
                searchTerm: action.payload,
                filteredFilms: state.films.filter(film =>
                    film.title.toLowerCase().includes(action.payload.toLowerCase())
                )
            };
        default:
            return state;
    }
}

export const FilmContext = createContext();

export const FilmProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FilmReducer, initialState);

    const HandleAddFilm = (item) => {
        dispatch({ type: 'ADD', payload: item });
    };

    const HandleRemoveFilm = (item) => {
        dispatch({ type: 'DELETE', payload: item });
    };

    const HandleRemoveAllFromFilm = () => {
        dispatch({ type: 'DELETEALL' });
    };

    const HandlePay = () => {
        dispatch({ type: 'PAYMENT' });
    };

    const HandleSearchFilm = (searchTerm) => {
        dispatch({ type: 'SEARCH', payload: searchTerm });
    };

    return (
        <FilmContext.Provider value={{
            films: state.filteredFilms.length > 0 ? state.filteredFilms : state.films,
            HandleAddFilm,
            HandleRemoveFilm,
            HandleRemoveAllFromFilm,
            HandlePay,
            HandleSearchFilm
        }}>
            {children}
        </FilmContext.Provider>
    );
};