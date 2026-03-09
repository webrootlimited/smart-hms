import { Video, LogOut } from "lucide-react";
import Link from "next/link";

export default function VideoCallHeader({ doctorSlug }: { doctorSlug: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#0284C7] rounded-lg flex items-center justify-center">
          <Video className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#101828]">
            Smart<span className="text-[#0284C7]">HMS</span>
          </p>
          <p className="text-[11px] text-[#6A7282]">Telehealth Session #4829</p>
        </div>
      </div>

      <Link
        href={`/doctor/${doctorSlug}/telehealth`}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        <LogOut className="w-4 h-4 text-[#6A7282]" />
        Leave Room
      </Link>
    </div>
  );
}
