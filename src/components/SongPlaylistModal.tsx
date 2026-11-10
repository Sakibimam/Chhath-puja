"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Music, ExternalLink, Disc, Sparkles } from "lucide-react";
import { Song, CHHATH_SONGS, YT_PLAYLIST_URL } from "@/data/songs";

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface SongPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSong: Song;
  isPlaying: boolean;
  onSelectSong: (song: Song) => void;
}

export default function SongPlaylistModal({
  isOpen,
  onClose,
  currentSong,
  isPlaying,
  onSelectSong,
}: SongPlaylistModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0f0a07]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-gradient-to-b from-[#241710] via-[#170e0a] to-[#0f0a07] border border-[#5c3a28]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#5c3a28]/25 flex items-center justify-between bg-[#1f140e]/90 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#3a2418] border border-[#5c3a28]/40 flex items-center justify-center text-amber-100 shadow-md">
                <Music className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-amber-100 tracking-tight font-serif">
                  छठी मईया के गीत
                </h2>
                <p className="text-xs text-amber-200/70">
                  बिहार के महापर्व के पवित्र भक्ति भजन
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#140c08] hover:bg-[#2c1b12] text-amber-200/80 hover:text-amber-100 border border-[#5c3a28]/30 transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Playlist source label */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-[#5c3a28]/20 bg-[#170e0a] text-xs sm:text-sm font-bold text-amber-200">
            <Music className="w-3.5 h-3.5" />
            <span>Top Chhath Puja Hits ({CHHATH_SONGS.length})</span>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
              <div className="space-y-2.5">
                {CHHATH_SONGS.map((song, index) => {
                  const isCurrent = song.id === currentSong.id;
                  const trackNum = (index + 1).toString().padStart(2, "0");

                  return (
                    <motion.div
                      key={song.id}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className={`group relative p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                        isCurrent
                          ? "bg-gradient-to-r from-[#3a2418]/90 via-[#281810]/90 to-[#3a2418]/80 border-amber-400/60 shadow-xl"
                          : "bg-[#170e0a]/60 hover:bg-[#241710]/80 border-[#5c3a28]/15 hover:border-[#5c3a28]/40"
                      }`}
                      onClick={() => {
                        onSelectSong(song);
                        onClose();
                      }}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div className="relative w-10 h-10 rounded-full bg-[#140c08] border border-[#5c3a28]/40 flex items-center justify-center shrink-0 shadow-md">
                          {isCurrent && isPlaying ? (
                            <Disc className="w-5 h-5 text-amber-400 animate-spin-slow" />
                          ) : (
                            <span className="text-xs font-bold font-mono text-amber-300/90">
                              {trackNum}
                            </span>
                          )}
                        </div>

                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                            isCurrent
                              ? "bg-amber-400 text-[#140c08] shadow-md scale-105"
                              : "bg-[#241710] text-amber-300 group-hover:bg-amber-400 group-hover:text-[#140c08]"
                          }`}
                        >
                          {isCurrent && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3.5">
                              <span className="w-0.5 bg-[#140c08] rounded-full animate-bounce h-full" />
                              <span className="w-0.5 bg-[#140c08] rounded-full animate-bounce delay-150 h-2.5" />
                              <span className="w-0.5 bg-[#140c08] rounded-full animate-bounce delay-300 h-3.5" />
                            </div>
                          ) : (
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          )}
                        </div>

                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-amber-100 truncate">
                              {song.title}
                            </h3>
                            {song.tag && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 hidden sm:inline-block font-medium">
                                {song.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-amber-200/70 truncate font-medium mt-0.5">
                            {song.artist}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-amber-300/70 font-mono hidden sm:inline">
                          {song.duration}
                        </span>

                        <a
                          href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-500/30 transition-all hover:scale-105 active:scale-95"
                          title="YouTube पर देखें"
                        >
                          <YoutubeIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 bg-[#0f0a07] border-t border-[#5c3a28]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-200/80">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>छठी मईया का आशीर्वाद सदा आप पर बना रहे 🙏</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={YT_PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-950/90 hover:bg-red-900 text-white font-bold text-xs border border-red-500/40 transition-colors shadow-lg active:scale-95"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
                <span>Open Playlist</span>
                <ExternalLink className="w-3 h-3" />
              </a>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
