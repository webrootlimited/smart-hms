import { User, Calendar, Phone, ArrowRight } from "lucide-react";
import FormField from "./FormField";
import type { SignUpData } from "./types";

export default function SignUpStep1({
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
      <FormField
        label="Full Name"
        icon={User}
        placeholder="e.g. John Doe"
        value={data.fullName}
        onChange={(val) => onChange("fullName", val)}
      />
      <FormField
        label="Date of Birth"
        icon={Calendar}
        placeholder="mm/dd/yyyy"
        type="date"
        value={data.dob}
        onChange={(val) => onChange("dob", val)}
      />
      <FormField
        label="Phone Number"
        icon={Phone}
        placeholder="(555) 000-0000"
        type="tel"
        value={data.phone}
        onChange={(val) => onChange("phone", val)}
      />
      <button
        onClick={onNext}
        className="w-full py-2.5 bg-[#0284C7CC] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer text-sm mt-2"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
