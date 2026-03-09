"use client";

import { useParams } from "next/navigation";
import VideoCallHeader from "./VideoCallHeader";
import VideoPanel from "./VideoPanel";
import ChatPanel from "./ChatPanel";

export default function VideoCallMain() {
  const params = useParams();
  const doctorSlug = params.doctorName as string;

  return (
    <div className="space-y-4 h-full">
      <VideoCallHeader doctorSlug={doctorSlug} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: "calc(100vh - 180px)" }}>
        {/* Video — 2/3 */}
        <div className="lg:col-span-2">
          <VideoPanel />
        </div>

        {/* Chat — 1/3 */}
        <div className="min-h-0">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}
