"use client";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
} from "lucide-react";

interface VideoControlsProps {
  isMicOn: boolean;
  isCamOn: boolean;
  isScreenSharing: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onToggleScreen: () => void;
  onLeave: () => void;
}

export default function VideoControls({
  isMicOn,
  isCamOn,
  isScreenSharing,
  onToggleMic,
  onToggleCam,
  onToggleScreen,
  onLeave,
}: VideoControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {/* Mic toggle */}
      <button
        onClick={onToggleMic}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
          isMicOn
            ? "bg-[#1E293B] text-white hover:bg-[#334155]"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
        title={isMicOn ? "Mute microphone" : "Unmute microphone"}
      >
        {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>

      {/* Camera toggle */}
      <button
        onClick={onToggleCam}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
          isCamOn
            ? "bg-[#1E293B] text-white hover:bg-[#334155]"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
        title={isCamOn ? "Turn off camera" : "Turn on camera"}
      >
        {isCamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      </button>

      {/* Screen share */}
      <button
        onClick={onToggleScreen}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
          isScreenSharing
            ? "bg-[#0284C7] text-white"
            : "bg-[#1E293B] text-white hover:bg-[#334155]"
        }`}
        title={isScreenSharing ? "Stop sharing" : "Share screen"}
      >
        <MonitorUp className="w-5 h-5" />
      </button>

      {/* End call */}
      <button
        onClick={onLeave}
        className="w-14 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
        title="End call"
      >
        <PhoneOff className="w-5 h-5" />
      </button>
    </div>
  );
}
