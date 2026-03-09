"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, VideoIcon, VideoOff, Monitor, PhoneOff } from "lucide-react";

export default function VideoPanel() {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="relative bg-[#1E293B] rounded-2xl overflow-hidden aspect-video">
      {/* Main video placeholder (patient) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-[#334155] flex items-center justify-center">
          <span className="text-4xl font-bold text-white/40">MC</span>
        </div>
      </div>

      {/* Speaker indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="text-xs text-white font-medium">Mitchell is speaking...</span>
        </div>
      </div>

      {/* Recording badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EF4444] rounded-full">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs text-white font-semibold">REC {formatTime(elapsed)}</span>
        </div>
      </div>

      {/* Doctor's mini video (PiP) */}
      <div className="absolute bottom-20 right-4 w-36 h-24 bg-[#334155] rounded-xl border-2 border-white/20 overflow-hidden flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[#475569] flex items-center justify-center">
          <span className="text-sm font-bold text-white/40">Dr</span>
        </div>
        <span className="absolute bottom-1.5 left-2 text-[10px] text-white/70 font-medium">Dr. John</span>
      </div>

      {/* Controls bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={() => setMuted(!muted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
            muted ? "bg-[#EF4444] text-white" : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          }`}
        >
          {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
            !videoOn ? "bg-[#EF4444] text-white" : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          }`}
        >
          {videoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
          <Monitor className="w-5 h-5" />
        </button>

        <button className="w-12 h-12 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] transition cursor-pointer">
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
