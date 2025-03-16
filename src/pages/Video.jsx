import React, { useRef, useState, useEffect } from 'react'
import { FaPause, FaVolumeDown, FaVolumeMute, FaVolumeUp, FaPlay, FaVolumeOff, FaCompress, FaExpand } from 'react-icons/fa';
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import marvelV from './../assets/Videos/marvel.mp4'
const Video = () => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [progress, setProgress] = useState(0);
    const [skipAmount] = useState(10);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                setDuration(videoRef.current.duration);
                setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Full màn hình
    useEffect(() => {
        //nhận sự kiện mở full màn hình
        const onFullScreen = () => {
            if (document.fullscreenElement === null) {
                setIsFullScreen(false);
            } else {
                setIsFullScreen(true);
            }
        };

        //Thêm sự kiện document cho các sự kiện khác
        document.addEventListener('fullscreenchange', onFullScreen);
        document.addEventListener('webkitfullscreenchange', onFullScreen); //cho safari
        document.addEventListener('mozfullscreenchange', onFullScreen); //cho firefox
        document.addEventListener('MSfullscreenchange', onFullScreen); //cho edge

        return () => {
            document.removeEventListener('fullscreenchange', onFullScreen);
            document.removeEventListener('webkitfullscreenchange', onFullScreen); //cho safari
            document.removeEventListener('mozfullscreenchange', onFullScreen); //cho firefox
            document.removeEventListener('MSfullscreenchange', onFullScreen); //cho edge
        }

    }, [])

    // hàm load video 
    const handleVideoLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    //nút phát và tạm dừng
    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    //bỏ qua và quay lại
    const handleSkip = (seconds) => {
        videoRef.current.currentTime += seconds;
    };

    //thay đổi tốc độ chạy
    const handleChangeSpeed = (e) => {
        setPlaybackRate(e.target.value);
        videoRef.current.playbackRate = e.target.value;
    };

    // load lại video
    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        videoRef.currentTime = newTime;
        setProgress(e.target.value);
    };

    //hàm tăng giảm tiếng
    const handleChangeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    //
    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (isMuted) {
            videoRef.current.volume = volume;
        } else {
            volume.current.volume = 0;
        }
    };

    //
    const enterFullScreen = () => {
        if (playerRef.current) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen();
            }
        }
    }


    //thoát mở full màn hình
    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    //thêm icon volume
    const volumeIcon = () => {
        if (isMuted) {
            return <FaVolumeMute />
        } else if (volume > 0 && volume <= 0.5) {
            return <FaVolumeDown />
        } else if (volume > 0.5) {
            return <FaVolumeUp />
        } else {
            return <FaVolumeOff />
        }
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <div
                ref={playerRef}
                className={`relative mx-auto group rounded-xl overflow-hidden ease-in-out duration-300 ${isFullScreen ? "fullscreen" : "w-full md:aspect-[20/8] aspect-auto"}`}
            >

                <video
                    src={marvelV}
                    className='w-full h-full'
                    ref={videoRef}
                    onClick={togglePlayPause}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadedMetadata={handleVideoLoadedMetadata}

                />
                {/* điều khiển play và pause video */}
                <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-950 bg-opacity-20 group-hover:flex hidden items-center justify-center gap-16 ease-in-out duration-300">
                    {/* nút bỏ qua */}
                    <div className="w-12 h-12 rounded-full bg-neutral-950/40 flex items-center justify-center">
                        <button className="text-neutral-50" onClick={() => handleSkip(-skipAmount)}>
                            < TbRewindBackward10 className='w-6 h-6' />
                        </button>
                    </div>
                    {/* nút play và pause */}
                    <div className="w-12 h-12 rounded-full bg-neutral-950/40 flex items-center justify-center">
                        <button className="text-neutral-50" onClick={togglePlayPause}>
                            {
                                isPlaying
                                    ? <FaPause className='w-6 h-6 ml-0.5' /> : <FaPlay className='w-6 h-6 ml-0.5' />
                            }
                        </button>
                    </div>
                    {/* nut quay lại */}
                    <div className="w-12 h-12 rounded-full bg-neutral-950/40 flex items-center justify-center">
                        <button className="text-neutral-50" onClick={() => handleSkip(skipAmount)}>
                            < TbRewindForward10 className='w-6 h-6' />
                        </button>
                    </div>
                </div>
                {/* các điều khiển khác */}
                <div className="w-full group-hover:block hidden ease-in-out duration-300">
                    {/*thời gian và tốc độ video*/}
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-60 px-4 py-2 flex items-center justify-end gap-10">
                        {/*Điều khiển */}
                        <div className="px-2 flex items-center space-x-2">
                            {/* nút âm thanh */}
                            <button onClick={toggleMute} className="text-neutral-50">
                                {volumeIcon()}
                            </button>
                            {/* thanh kéo */}
                            <input
                                type="range"
                                value={isMuted ? 0 : volume}
                                onChange={handleChangeVolume}
                                min={0}
                                max={1}
                                step={0.01}
                                disabled={isMuted}
                                className="w-24 h-1 bg-neutral-500 cursor-pointer"
                            />
                            {/* nút kéo âm thanh */}
                            <span className="text-neutral-50 text-sm font-normal">
                                {Math.round(volume * 100)}%
                            </span>
                        </div>
                        {/* tốc độ */}
                        <select
                            value={playbackRate}
                            onChange={handleChangeSpeed}
                            className='text-neutral-50 bg-reutral-900 rounded-md p-1 cursor-pointer focus:outline-none'
                        >
                            <option value={0.5}>0.5x</option>
                            <option value={1}>1x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>

                        </select>
                        {/* fullscreen và miniscreen */}
                        <button className="text-neutral-50" onClick={isFullScreen ? exitFullScreen : enterFullScreen}>
                            {
                                isFullScreen
                                    ? <FaCompress className='w-6 h-6' />
                                    : <FaExpand className='w-6 h-6' />
                            }
                        </button>
                    </div>
                    {/* thanh kéo tiến trình */}
                    <div className="relative w-full">
                        {/* Nền của thanh kéo */}
                        <div className="absolute bottom-0 w-full bg-neutral-600 h-1">
                            <input
                                type="range"
                                className="w-full h-1 bg-transparent cursor-pointer"
                                value={progress}
                                onChange={handleProgressChange}
                            />
                            {/* Hiển thị phần đã xem */}
                            <div
                                className="absolute top-0 left-0 h-1 bg-red-900"
                                style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
                            ></div>
                        </div>
                    </div>

                    {/* Các nút thời gian */}
                    <div className="absolute bottom-3 left-4 text-neutral-50 text-base font-medium">
                        <span>
                            {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : "00:00"}
                        </span>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div >
    )
}

export default Video