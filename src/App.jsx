import { useState } from 'react'
import { Route } from 'react-router-dom';
import { BrowserRouter, createBrowserRouter, Router, RouterProvider, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import DetailPage from './pages/DetailPage';
import Video from './pages/Video';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} path="/" />
          <Route path='/home' element={<Home />} />
          <Route path='/movie/:id' element={<DetailPage />} />
          <Route path='/movie/video-player/unique_id_doyyess' element={<Video />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
