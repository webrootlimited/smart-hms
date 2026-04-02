"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Loader2, PhoneOff } from "lucide-react";
import VideoControls from "./VideoControls";
import { apiPost } from "@/lib/api";

interface DailyVideoCallProps {
  roomUrl: string;
  appointmentId: string;
  userName: string;
  onLeave: () => void;
}

export default function DailyVideoCall({
  roomUrl,
  appointmentId,
  userName,
  onLeave,
}: DailyVideoCallProps) {
  const callFrameRef = useRef<ReturnType<typeof import("@daily-co/daily-js").default.createFrame> | null>(null);
  const [joining, setJoining] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const leavingRef = useRef(false);

  // Timer
  useEffect(() => {
    if (joining) return;
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [joining]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleLeave = useCallback(async () => {
    if (leavingRef.current) return;
    leavingRef.current = true;

    try {
      callFrameRef.current?.leave();
      callFrameRef.current?.destroy();
    } catch { /* ignore */ }

    try {
      await apiPost(`/api/video/room/${appointmentId}/end`);
    } catch { /* ignore */ }

    onLeave();
  }, [appointmentId, onLeave]);

  // Initialize Daily iframe — dynamic import to avoid SSR
  useEffect(() => {
    if (!roomUrl) return;

    const container = document.getElementById("daily-video-container");
    if (!container) return;

    let frame: ReturnType<typeof import("@daily-co/daily-js").default.createFrame> | null = null;

    import("@daily-co/daily-js").then((DailyModule) => {
      const DailyIframe = DailyModule.default;

      frame = DailyIframe.createFrame(container, {
        iframeStyle: {
          width: "100%",
          height: "100%",
          border: "0",
          borderRadius: "16px",
        },
        showLeaveButton: false,
        showFullscreenButton: true,
      });

      frame.join({
        url: roomUrl,
        userName,
      });

      frame.on("joined-meeting", () => {
        setJoining(false);
      });

      frame.on("left-meeting", () => {
        handleLeave();
      });

      frame.on("error", (e: unknown) => {
        console.error("Daily error:", e);
      });

      callFrameRef.current = frame;
    });

    return () => {
      if (frame) {
        try { frame.destroy(); } catch { /* ignore */ }
      }
    };
  }, [roomUrl, userName, handleLeave]);

  const toggleMic = () => {
    const frame = callFrameRef.current;
    if (!frame) return;
    const newState = !isMicOn;
    frame.setLocalAudio(newState);
    setIsMicOn(newState);
  };

  const toggleCam = () => {
    const frame = callFrameRef.current;
    if (!frame) return;
    const newState = !isCamOn;
    frame.setLocalVideo(newState);
    setIsCamOn(newState);
  };

  const toggleScreen = async () => {
    const frame = callFrameRef.current;
    if (!frame) return;
    if (isScreenSharing) {
      frame.stopScreenShare();
      setIsScreenSharing(false);
    } else {
      frame.startScreenShare();
      setIsScreenSharing(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1E293B] rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-medium text-white">
            {joining ? "Connecting..." : `In Call — ${formatTime(elapsed)}`}
          </span>
        </div>
        <button
          onClick={handleLeave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          Leave
        </button>
      </div>

      {/* Video area */}
      <div className="flex-1 bg-[#0F172A] relative min-h-[400px]">
        {joining && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#0284C7] animate-spin mx-auto mb-3" />
              <p className="text-sm text-white/70">Joining video call...</p>
            </div>
          </div>
        )}
        <div id="daily-video-container" className="w-full h-full" />
      </div>

      {/* Controls */}
      <div className="bg-[#1E293B] rounded-b-2xl">
        <VideoControls
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          isScreenSharing={isScreenSharing}
          onToggleMic={toggleMic}
          onToggleCam={toggleCam}
          onToggleScreen={toggleScreen}
          onLeave={handleLeave}
        />
      </div>
    </div>
  );
}
