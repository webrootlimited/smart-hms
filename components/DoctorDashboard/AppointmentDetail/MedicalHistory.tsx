import { Stethoscope } from "lucide-react";

export default function MedicalHistory() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Medical History Summary</h3>
      <div className="flex items-center justify-center py-6">
        <div className="text-center">
          <Stethoscope className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#6A7282]">No medical history available yet</p>
        </div>
      </div>
    </div>
  );
}
