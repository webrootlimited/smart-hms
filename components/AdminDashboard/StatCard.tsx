import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  iconColor,
  iconBg,
  value,
  label,
}: {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border-t border-[#F3F4F6] p-5 flex flex-col gap-3 shadow-sm" style={{ background: "linear-gradient(135deg, rgba(109,220,255,0.08) 0%, rgba(127,96,249,0.08) 100%)" }}>
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#101828]">{value}</p>
        <p className="text-xs text-[#4A5565] mt-0.5">{label}</p>
      </div>
    </div>
  );
}
