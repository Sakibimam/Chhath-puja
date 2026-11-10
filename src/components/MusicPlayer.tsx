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
  ListMusic,
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
  // Progress is stored with the song it belongs to, so switching songs shows 0:00
  // immediately without resetting state inside an effect.
  const [progress, setProgress] = useState<{ songId: string; time: number }>({
    songId: currentSong.youtubeId,
    time: 0,
  });
  const currentTime = progress.songId === currentSong.youtubeId ? progress.time : 0;
  const [duration, setDuration] = useState<number>(425);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const skipCountRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(isPlaying);
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
    } catch {}
  };

  const onStateChange = (event: { data: number }) => {
    if (event.data === 1) { // PLAYING
      skipCountRef.current = 0;
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

    skipCountRef.current += 1;
    if (skipCountRef.current >= CHHATH_SONGS.length) {
      console.warn("⚠️ Reached max skip limit (all tracks failed to embed). Stopping auto-skip.");
      setHasNoPlayableTracks(true);
      return;
    }
    setTimeout(() => {
      onNextSong();
    }, 700);
  };

  const handlePlayClick = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (!isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch {}
    }
    onPlayToggle();
  };

  // Keep the latest play state readable from the song-change effect below
  // without re-loading the video every time play/pause is toggled.
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      playerRef.current.loadVideoById(currentSong.youtubeId);
      if (isPlayingRef.current) {
        playerRef.current.playVideo();
      }
    } catch {}
  }, [currentSong.youtubeId, isPlayerReady]);

  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch {}
  }, [isPlaying, isPlayerReady]);

  // Real-time progress polling (250ms interval)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const songId = currentSong.youtubeId;
    if (isPlaying && isPlayerReady && playerRef.current) {
      interval = setInterval(async () => {
        try {
          if (playerRef.current?.getCurrentTime) {
            const cur = await playerRef.current.getCurrentTime();
            const dur = await playerRef.current.getDuration();
            if (cur !== undefined && cur !== null) setProgress({ songId, time: cur });
            if (dur && dur > 0) setDuration(dur);
          }
        } catch {}
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPlayerReady, currentSong.youtubeId]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setProgress({ songId: currentSong.youtubeId, time: seekTime });
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(seekTime, true);
      } catch {}
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-8 inset-x-0 z-40 px-3 sm:px-4 flex flex-col items-center gap-2 sm:gap-3">
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
            ? "w-[92vw] max-w-lg aspect-video mb-2 z-50 opacity-100 pointer-events-auto"
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
            className="absolute top-2 right-2 p-2.5 rounded-full bg-stone-950/80 text-stone-300 border border-stone-700/30 backdrop-blur-md shadow-md z-10 hover:scale-105 active:scale-95"
            title="Minimize Video"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Responsive Player Capsule */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md sm:max-w-lg rounded-full bg-white/40 backdrop-blur-2xl border border-white/50 p-2 sm:p-2.5 shadow-2xl shadow-stone-950/30 flex items-center justify-between gap-2 sm:gap-3"
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
              <span className="text-[10px] sm:text-[11px] font-mono text-[#3a2418] font-bold shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Tall invisible hit area so the seek bar is easy to drag with a finger */}
              <div
                className="relative flex-1 flex items-center min-w-[50px] h-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[#3a2418]/25 rounded-lg pointer-events-none" />
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek"
                  className="relative z-10 w-full h-6 bg-transparent appearance-none cursor-pointer accent-[#3a2418] focus:outline-none touch-none"
                />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#3a2418] rounded-lg pointer-events-none"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Touch controls: every target is at least 36px */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <button
            onClick={onPrevSong}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-[#3a2418]/15 text-[#3a2418] transition-colors active:scale-95 touch-manipulation"
            title="Prev"
            aria-label="Previous song"
          >
            <SkipBack className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={handlePlayClick}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#3a2418] hover:bg-[#281810] text-amber-100 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-[#5c3a28]/40 touch-manipulation"
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={onNextSong}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-[#3a2418]/15 text-[#3a2418] transition-colors active:scale-95 touch-manipulation"
            title="Next"
            aria-label="Next song"
          >
            <SkipForward className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={onOpenPlaylistModal}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-[#3a2418]/15 text-[#3a2418] transition-colors active:scale-95 touch-manipulation"
            title="Playlist"
            aria-label="Open playlist"
          >
            <ListMusic className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
