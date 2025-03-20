import React from 'react'
import { useNavigate } from 'react-router-dom';

function HeaderItem({name,Icon}) {
  const navigate = useNavigate();

  const handleClick = () => {
    switch(name) {
      case 'HOME':
        navigate('/home');
        break;
      case 'SEARCH':
        navigate('/search');
        break;
      case 'WATCH LIST':
        navigate('/watchlist');
        break;
      case 'ORIGINALS':
        navigate('/originals');
        break;
      case 'MOVIES':
        navigate('/movies');
        break;
      case 'SERIES':
        navigate('/series');
        break;
      case 'ABOUT':
        navigate('/about');
        break;
      default: 
        break;
    }
  };

  return (
    <div 
      className='text-white flex items-center gap-3
      text-[15px] font-semibold cursor-pointer hover:underline
      underline-offset-8 mb-2 transition-all duration-300'
      onClick={handleClick}
    >
        <Icon className="h-5 w-5"/>
        <h2 className=''>{name}</h2>
    </div>
  )
}

export default HeaderItem