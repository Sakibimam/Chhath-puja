"use client";

import React, { useState } from "react";
import BackgroundScene from "@/components/BackgroundScene";
import TopBar from "@/components/TopBar";
import CenterTitle from "@/components/CenterTitle";
import MusicPlayer from "@/components/MusicPlayer";
import SongPlaylistModal from "@/components/SongPlaylistModal";
import { CHHATH_SONGS, Song } from "@/data/songs";

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const currentSong = CHHATH_SONGS[currentSongIndex];

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % CHHATH_SONGS.length);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + CHHATH_SONGS.length) % CHHATH_SONGS.length);
    setIsPlaying(true);
  };

  const handleSelectSong = (song: Song) => {
    const index = CHHATH_SONGS.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* 1. Interactive Animated Bihar River Ghat Background */}
      <BackgroundScene />

      {/* 2. Top Bar (Live Time, Online User Count, Spotify/YT Music Pills) */}
      <TopBar />

      {/* 3. Center Painted Hindi Title (Deluxe Saloon / 9XM Style) */}
      <CenterTitle onOpenPlaylistModal={() => setIsPlaylistOpen(true)} />

      {/* 4. Bottom Floating Glass Pill Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
        onOpenPlaylistModal={() => setIsPlaylistOpen(true)}
        onSongEnd={handleNextSong}
      />

      {/* 5. Full Song Playlist Drawer Modal */}
      <SongPlaylistModal
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onSelectSong={handleSelectSong}
      />
    </main>
  );
}
