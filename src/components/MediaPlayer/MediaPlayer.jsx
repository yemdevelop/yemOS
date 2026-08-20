import { useEffect, useRef, useState } from "react";
import styles from "./MediaPlayer.module.css";

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
};

const MediaPlayer = ({
    item,
    onClose
}) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [volume, setVolume] = useState(1);
    const [previousVolume, setPreviousVolume] = useState(1);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const [isPhone, setIsPhone] = useState(() => window.matchMedia("(max-width: 700px)").matches
    );

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const updateCurrentTime = () => {
            setCurrentTime(video.currentTime);
        };

        const updateDuration = () => {
            setDuration(video.duration || 0);
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleEnded = () => {
            video.currentTime = 0;

            setIsPlaying(false);
            setCurrentTime(0);
        };

        video.addEventListener("timeupdate", updateCurrentTime);
        video.addEventListener("loadedmetadata", updateDuration);
        video.addEventListener("durationchange", updateDuration);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);

        return () => {
            video.removeEventListener("timeupdate", updateCurrentTime);
            video.removeEventListener("loadedmetadata", updateDuration);
            video.removeEventListener("durationchange", updateDuration);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
            
        };
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(max-width: 700px)"
        );

        const handleChange = (event) => {
            setIsPhone(event.matches);
        };

        mediaQuery.addEventListener(
            "change",
            handleChange
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleChange
            );
        };
    }, []);

    useEffect(() => {
        if (!isPhone) return;

        const player = playerRef.current;

        if (!player) return;

        const enterPhoneFullscreen = async () => {
            if (
                !document.fullscreenElement &&
                player.requestFullscreen
            ) {
                try {
                    await player.requestFullscreen();
                } catch (error) {
                    console.warn(
                        "Unable to enter fullscreen:",
                        error
                    );
                }
            }
        };

        enterPhoneFullscreen();
    }, [isPhone]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement === playerRef.current
            );
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }  
    };

    const closePlayer = () => {
        const video = videoRef.current;

        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        onClose?.();
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        const nextTime = Number(e.target.value);

        if (!video) return;

        video.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const handleVolumeChange = (e) => {
        const video = videoRef.current;
        const nextVolume = Number(e.target.value);

        if (!video) return;

        video.volume = nextVolume;
        video.muted = nextVolume === 0;

        setVolume(nextVolume);

        if (nextVolume > 0) {
            setPreviousVolume(nextVolume);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;

        if (!video) return;

        if (volume === 0 || video.muted) {
            const restoredVolume = 
                previousVolume > 0 ? previousVolume : 1;

            video.muted = false;
            video.volume = restoredVolume;

            setVolume(restoredVolume);
        } else {
            setPreviousVolume(volume);

            video.muted = true;
            video.volume = 0;

            setVolume(0);
        }
    };

    const toggleFullScreen = async () => {
        const player = playerRef.current;
        const video = videoRef.current;

        if (!player || !video) return;

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (player.requestFullscreen) {
                await player.requestFullscreen();
            } else if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            } else {
                console.warn(
                    "Fullscreen is not supported by this browser."
                );
            } 
        } catch (error) {
            console.error(
                "Unable to toggle fullscreen:",
                error
            );
        }
     };

     const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closePlayer();
        }
     };    



  return (
    <div
        className={styles.overlay}
        onPointerDown={handleOverlayClick}
    >
        <section
            ref={playerRef}
            className={styles.player}
            role="dialog"
            aria-modal="true"
            aria-label={`Media player for ${item.name}`}
        >
            <header className={styles.titleBar}>
                <span className={styles.title}>
                    {item.name}
                </span>

                <button 
                    type="button"
                    className={styles.closeButton}
                    onClick={closePlayer}
                    aria-label="Close media player"
                >
                    x
                </button>
            </header>

            <div className={styles.playerBody}>
                <div className={styles.videoBevel}>
                    <div className={styles.videoShell}>
                        <video  
                            ref={videoRef}
                            src={item.src}
                            className={styles.video}
                            preload="metadata"
                            playsInline
                            onClick={toggleFullScreen}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.mediaInfo}>
                <span className={styles.nowPlayingLabel}>
                    Now Playing:
                </span>

                <span className={styles.mediaName}>
                    {item.name}
                </span>
            </div>

            <input
                className={styles.timeline}
                type="range"
                min="0"
                max={duration || 0}
                step="0.01"
                value={Math.min(currentTime, duration || 0)}
                onChange={handleSeek}
                aria-label="Seek through video"
            />
            <div className={styles.bottomConsole}>
                <div className={styles.controlDeck}>
                    <div className={styles.timeDisplay}>
                        {formatTime(currentTime)}
                        <span>/</span>
                        {formatTime(duration)}
                    </div>

                    <div className={styles.utilityRow}>
                        <div className={styles.volumeControls}>
                            <button
                                type="button"
                                className={styles.smallControl}
                                onClick={toggleMute}
                                aria-label={volume === 0 ? "Unmute" : "Mute"}
                            >
                                <span aria-hidden="true">
                                    {volume === 0 ? "×" : "◖"}
                                </span>
                            </button>

                            <input
                                className={styles.volume}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                aria-label="Volume"
                            />
                        </div>

                    {!isPhone && (
                        <button
                            type="button"
                            className={styles.smallControl}
                            onClick={toggleFullScreen}
                            aria-label={
                                isFullscreen
                                    ? "Exit fullscreen"
                                    : "Enter fullscreen"
                            }
                        >
                            <span aria-hidden="true">
                                ⛶ 
                            </span>
                        </button>
                    )}
                </div>
                
                    <div className={styles.transportControls}>
                        <button
                            type="button"
                            className={styles.controlButton}
                            disabled
                            aria-label="Skip backward unavailable"
                        >
                            <span aria-hidden="true">
                                ⏮
                            </span>
                        </button>

                        <button
                            type="button"
                            className={styles.controlButton}
                            disabled
                            aria-label="Rewind unavailable"
                        >
                            <span aria-hidden="true">
                                ◀◀  
                            </span>
                        </button>

                        <button
                            type="button"
                            className={`${styles.controlButton} ${styles.playButton}`}
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            <span aria-hidden="true">
                                {isPlaying ? "Ⅱ" : "▶"}
                            </span>
                        </button>

                        <button
                            type="button"
                            className={styles.controlButton}
                            disabled
                            aria-label="Fast forward unavailable"
                        >
                            <span aria-hidden="true">
                                ▶▶    
                            </span>
                        </button>

                        <button
                            type="button"
                            className={styles.controlButton}
                            disabled
                            aria-label="Skip forward unavailable"
                        >
                            <span aria-hidden="true">
                                ⏭   
                            </span> 
                        </button>
                    </div>
                </div>
            </div>

                <div
                    className={styles.speakerGrill}
                    aria-hidden="true"
                >
                    {Array.from({ length: 18}).map((_, index) => (
                        <span key={index} />
                    ))}
                </div>
        </section>
    </div>
  );
};

export default MediaPlayer