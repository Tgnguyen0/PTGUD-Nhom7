import { useState } from 'react'
import { Route } from 'react-router-dom';
import { BrowserRouter, createBrowserRouter, Router, RouterProvider, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import DetailPage from './pages/DetailPage';
import Video from './pages/Video';
import Search from './pages/Search';
import About from './pages/About';
import Movies from './pages/Movies';
import Series from './pages/Series';
import { FilmProvider } from './contex/FilmContext';

function App() {

  return (
    <div className="">
      <FilmProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} path="/" />
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/movie/:id' element={<DetailPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/movie/video-player/unique_id_doyyess/:id' element={<Video />} />
          </Routes>
        </BrowserRouter>
      </FilmProvider>
    </div>
  )
}

export default App
