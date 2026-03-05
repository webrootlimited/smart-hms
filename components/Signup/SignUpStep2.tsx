import { Mail, Lock, ArrowRight } from "lucide-react";
import FormField from "./FormField";
import type { SignUpData } from "./types";

export default function SignUpStep2({
  data,
  onChange,
  onNext,
}: {
  data: SignUpData;
  onChange: (field: keyof SignUpData, value: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-[#334155] mb-2">
          Gender
        </label>
        <div className="flex gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => onChange("gender", g)}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                data.gender === g
                  ? "border-[#0284C7] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={`/auth/${g}.png`}
                alt={g}
                className="w-10 h-10 rounded-lg object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <FormField
        label="Email"
        icon={Mail}
        placeholder="Enter Your Email"
        type="email"
        value={data.email}
        onChange={(val) => onChange("email", val)}
      />
      <FormField
        label="Password"
        icon={Lock}
        placeholder="••••••••"
        type="password"
        value={data.password}
        onChange={(val) => onChange("password", val)}
      />
      <button
        onClick={onNext}
        className="w-full py-2.5 bg-[#0284C7] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer text-sm mt-2"
      >
        Sign Up <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
