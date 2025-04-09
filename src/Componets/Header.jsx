import React, { useState } from 'react';
import logo from './../assets/Images/logo.png';
import {
    HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv,
} from "react-icons/hi2";
import { HiDotsVertical } from 'react-icons/hi';
import HeaderItem from './HeaderItem';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [username, setUsername] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const menu = [
        { name: 'HOME', icon: HiHome },
        { name: 'SEARCH', icon: HiMagnifyingGlass },
        { name: 'MOVIES', icon: HiPlayCircle },
        { name: 'SERIES', icon: HiTv },
        { name: 'ABOUT', icon: HiDotsVertical }
    ];

    const handleLogin = () => {
        if (inputUsername.trim() && inputPassword.trim()) {
            setIsLoggedIn(true);
            setUsername(inputUsername);
            setShowLoginModal(false);
            // Reset input fields
            setInputUsername('');
            setInputPassword('');
        } else {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập!');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <div className='flex items-center justify-between p-5 relative'>
            <div className='flex gap-8 items-center'>
                <img src={logo} className='w-[80px] md:w-[115px] object-cover' alt="Logo" />
                <div className='hidden md:flex gap-8'>
                    {menu.map((item, index) => (
                        <HeaderItem key={index} name={item.name} Icon={item.icon} />
                    ))}
                </div>
                <div className='flex md:hidden gap-5'>
                    {menu.map((item, index) => index < 3 && (
                        <HeaderItem key={index} name={''} Icon={item.icon} />
                    ))}
                    <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                        <HeaderItem name={''} Icon={HiDotsVertical} />
                        {toggle && (
                            <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-5 py-4'>
                                {menu.map((item, index) => index > 2 && (
                                    <HeaderItem key={index} name={item.name} Icon={item.icon} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* User Info / Avatar */}
            <div className='flex items-center gap-3'>
                {isLoggedIn && <span className='text-white hidden md:inline'>{username}</span>}
                <img
                    onClick={() => setShowLoginModal(!showLoginModal)}
                    src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    className='w-[40px] rounded-full cursor-pointer'
                    alt="User Avatar"
                />
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className='absolute top-20 right-5 bg-[#1e1e1e] border border-gray-700 p-5 rounded-xl shadow-lg w-[300px] z-50'>
                    {isLoggedIn ? (
                        <div className='text-white'>
                            <p className='mb-3'>Xin chào, <strong>{username}</strong>!</p>
                            <button
                                onClick={handleLogout}
                                className='w-full bg-red-600 hover:bg-red-700 p-2 rounded-md'
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className='text-white'>
                            <h3 className='text-lg mb-3'>Đăng nhập</h3>
                            <input
                                type="text"
                                placeholder='Tên đăng nhập'
                                value={inputUsername}
                                onChange={(e) => setInputUsername(e.target.value)}
                                className='w-full mb-2 p-2 rounded-md bg-gray-800 border border-gray-600 text-white'
                            />
                            <input
                                type="password"
                                placeholder='Mật khẩu'
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                className='w-full mb-4 p-2 rounded-md bg-gray-800 border border-gray-600 text-white'
                            />
                            <button
                                onClick={handleLogin}
                                className='w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-md'
                            >
                                Đăng nhập
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
