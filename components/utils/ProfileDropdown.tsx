"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ChevronDown } from "lucide-react";
import removeSession from "@/auth/removeSession";

export default function ProfileDropdown({
  name,
  subtitle,
  initials,
}: {
  name: string;
  subtitle: string;
  initials: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await removeSession();
    router.push("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-[#0284C7] flex items-center justify-center text-white text-sm font-bold">
          {initials}
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-semibold text-[#101828]">{name}</p>
          <p className="text-xs text-[#6A7282]">{subtitle}</p>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 hidden md:block transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-gray-200 shadow-lg z-50 py-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
