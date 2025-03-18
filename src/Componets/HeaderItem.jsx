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
        alert("None done yet");
        break;
      case 'ORIGINALS':
        alert("None done yet");
        break;
      case 'MOVIES':
        alert("None done yet");
        break;
      case 'SERIES':
        alert("None done yet");
        break;
      case 'ABOUT':
        navigate('/about');
        break;
      default: 
        break;
    }
  };

  return (
    <div className='text-white flex items-center gap-3
    text-[15px] font-semibold cursor-pointer hover:underline
    underline-offset-8 mb-2'
    onClick={handleClick}
    >
        <Icon/>
        <h2 className=''>{name}</h2>
    </div>
  )
}

export default HeaderItem