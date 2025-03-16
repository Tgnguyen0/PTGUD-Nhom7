import React from 'react'
import Header from '../Componets/Header'
import Slider from '../Componets/Slider'
import ProductionHouse from '../Componets/ProductionHouse'
import GenreMovieList from '../Componets/GenreMovieList'
import Footer from '../Componets/Footer'
const Home = () => {
    return (
        <div>
            <Header />

            <Slider />

            <ProductionHouse />

            <GenreMovieList />

            <Footer />
        </div>
    )
}

export default Home