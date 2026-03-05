export default function FormField({
  label,
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/10 transition-all duration-200 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
