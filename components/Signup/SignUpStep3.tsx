import { ArrowRight } from "lucide-react";
import type { SignUpData } from "./types";

export default function SignUpStep3({
  data,
  onChange,
  onNext,
}: {
  data: SignUpData;
  onChange: (field: keyof SignUpData, value: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-4">
        Role
      </label>
      <div className="grid grid-cols-2 gap-4">
        {(["doctor", "patient"] as const).map((r) => (
          <button
            key={r}
            onClick={() => onChange("role", r)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              data.role === r
                ? "border-[#0284C7] bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={`/auth/${r}.png`}
              alt={r}
              className="w-24 h-24 object-contain"
            />
            <span className="text-sm font-semibold text-[#334155] capitalize">
              {r}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-full py-2.5 bg-[#0284C7] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer text-sm mt-6"
      >
        Sign Up <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
