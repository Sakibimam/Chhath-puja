"use client";

import React, { useState, useEffect, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Disc,
  X,
  AlertCircle,
} from "lucide-react";
import { Song, CHHATH_SONGS } from "@/data/songs";

interface MusicPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  onOpenPlaylistModal: () => void;
  onSongEnd: () => void;
}

export default function MusicPlayer({
  currentSong,
  isPlaying,
  onPlayToggle,
  onNextSong,
  onPrevSong,
  onOpenPlaylistModal,
  onSongEnd,
}: MusicPlayerProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(425);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [hasNoPlayableTracks, setHasNoPlayableTracks] = useState<boolean>(false);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    // Privacy-enhanced mode: no tracking cookies, so any ads YouTube serves
    // are non-personalized. (YouTube still controls whether ads run.)
    host: "https://www.youtube-nocookie.com",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      enablejsapi: 1,
    },
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setIsPlayerReady(true);
    try {
      if (isPlaying) {
        event.target.playVideo();
      }
    } catch (e) {}
  };

  const onStateChange = (event: { data: number }) => {
    if (event.data === 1) { // PLAYING
      setSkipCount(0);
      setHasNoPlayableTracks(false);
      if (!isPlaying) onPlayToggle();
    } else if (event.data === 2) { // PAUSED
      if (isPlaying) onPlayToggle();
    } else if (event.data === 0) { // ENDED
      onSongEnd();
    }
  };

  const onError = (event: { data: number }) => {
    console.error(
      `[YouTube Error ${event.data}] Track "${currentSong.title}" (ID: ${currentSong.youtubeId}) failed to embed.`
    );

    setSkipCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= CHHATH_SONGS.length) {
        console.warn("⚠️ Reached max skip limit (all tracks failed to embed). Stopping auto-skip.");
        setHasNoPlayableTracks(true);
        return nextCount;
      }
      setTimeout(() => {
        onNextSong();
      }, 700);
      return nextCount;
    });
  };

  const handlePlayClick = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (!isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (err) {}
    }
    onPlayToggle();
  };

  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      setCurrentTime(0);
      playerRef.current.loadVideoById(currentSong.youtubeId);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    } catch (e) {}
  }, [currentSong.youtubeId, isPlayerReady]);

  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {}
  }, [isPlaying, isPlayerReady]);

  // Real-time progress polling (250ms interval)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isPlayerReady && playerRef.current) {
      interval = setInterval(async () => {
        try {
          if (playerRef.current?.getCurrentTime) {
            const cur = await playerRef.current.getCurrentTime();
            const dur = await playerRef.current.getDuration();
            if (cur !== undefined && cur !== null) setCurrentTime(cur);
            if (dur && dur > 0) setDuration(dur);
          }
        } catch (e) {}
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPlayerReady]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(seekTime, true);
      } catch (e) {}
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-4 sm:bottom-8 inset-x-0 z-40 px-3 sm:px-4 flex flex-col items-center gap-2 sm:gap-3">
      {/* Notice Banner if all tracks fail to play */}
      <AnimatePresence>
        {hasNoPlayableTracks && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/50 backdrop-blur-md text-stone-200 text-[11px] sm:text-xs flex items-center gap-2 shadow-xl"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>No playable tracks right now. Please check network settings.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Official YouTube iframe player container */}
      <div
        className={`relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700/40 bg-stone-950/90 backdrop-blur-xl transition-all duration-300 ${
          showVideoModal
            ? "w-[92vw] max-w-lg h-56 sm:h-72 mb-2 z-50 opacity-100 pointer-events-auto"
            : "w-[320px] h-[180px] fixed -bottom-[500px] -right-[500px] opacity-0 pointer-events-none -z-50"
        }`}
      >
        <YouTube
          videoId={currentSong.youtubeId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          onEnd={onSongEnd}
          className="w-full h-full"
        />

        {showVideoModal && (
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-950/80 text-stone-300 border border-stone-700/30 backdrop-blur-md shadow-md z-10 hover:scale-105 active:scale-95"
            title="Minimize Video"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Mobile Responsive Player Capsule */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-[calc(100%-1rem)] max-w-md sm:max-w-lg rounded-full bg-white/40 backdrop-blur-2xl border border-white/50 p-2 sm:p-2.5 shadow-2xl shadow-stone-950/30 flex items-center justify-between gap-2 sm:gap-3"
      >
        <div
          onClick={() => setShowVideoModal((prev) => !prev)}
          className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 cursor-pointer group"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3a2418] border border-[#5c3a28]/40 p-1 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
            <Disc
              className={`w-full h-full text-amber-200 ${
                isPlaying ? "animate-spin-slow" : ""
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                <h3 className="text-xs sm:text-sm font-extrabold text-[#24150c] truncate">
                  {currentSong.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#4a2e1d] font-semibold truncate">
                  {currentSong.artist}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#3a2418] font-bold shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="relative flex-1 flex items-center min-w-[50px]">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-[#3a2418]/25 rounded-lg appearance-none cursor-pointer accent-[#3a2418] focus:outline-none"
                />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#3a2418] rounded-lg pointer-events-none"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Friendly Touch Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
          <button
            onClick={onPrevSong}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#3a2418]/15 text-[#3a2418] font-bold transition-colors active:scale-95 touch-manipulation"
            title="Prev"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={handlePlayClick}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3a2418] hover:bg-[#281810] text-amber-100 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-[#5c3a28]/40 touch-manipulation"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={onNextSong}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#3a2418]/15 text-[#3a2418] font-bold transition-colors active:scale-95 touch-manipulation"
            title="Next"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
