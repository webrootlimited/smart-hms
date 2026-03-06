import { Award, Calendar, Download, ShieldCheck } from "lucide-react";
import type { providerDetail } from "./detailData";

type Data = typeof import("./detailData").providerDetail;

export default function CertificationsTab({ data }: { data: Data }) {
  return (
    <div className="space-y-5">
      {/* Certification cards */}
      <div className="space-y-4">
        {data.certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#0284C7]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828]">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-[#6A7282] mt-0.5">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-[#6A7282]">
                      <Calendar className="w-3 h-3" /> Issued: {cert.issued}
                    </span>
                    {cert.expires && (
                      <span className="flex items-center gap-1 text-xs text-[#6A7282]">
                        <Calendar className="w-3 h-3" /> Expires: {cert.expires}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] rounded-full">
                  {cert.status}
                </span>
                <button className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <Download className="w-4 h-4 text-[#6A7282]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* License & DEA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Medical License */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-sm font-bold text-[#101828]">
              Medical License
            </h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-[#EFF6FF] rounded-xl">
              <p className="text-xs text-[#0284C7] font-medium mb-0.5">
                License Number
              </p>
              <p className="text-sm font-bold text-[#101828]">
                {data.medicalLicense.number}
              </p>
            </div>
            <div className="p-3 bg-[#F0FDF4] rounded-xl">
              <p className="text-xs text-[#16A34A] font-medium mb-0.5">
                Status
              </p>
              <p className="text-sm font-bold text-[#101828]">
                {data.medicalLicense.status}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-[#6A7282] font-medium mb-0.5">
                Expiry Date
              </p>
              <p className="text-sm font-bold text-[#101828]">
                {data.medicalLicense.expiry}
              </p>
            </div>
          </div>
        </div>

        {/* DEA Certificate */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-sm font-bold text-[#101828]">
              DEA Certificate
            </h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-[#EFF6FF] rounded-xl">
              <p className="text-xs text-[#0284C7] font-medium mb-0.5">
                DEA Number
              </p>
              <p className="text-sm font-bold text-[#101828]">
                {data.deaCertificate.number}
              </p>
            </div>
            <div className="p-3 bg-[#F0FDF4] rounded-xl">
              <p className="text-xs text-[#16A34A] font-medium mb-0.5">
                Status
              </p>
              <p className="text-sm font-bold text-[#101828]">
                {data.deaCertificate.status}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-[#6A7282] font-medium mb-0.5">
                Expiry Date
              </p>
              <p className="text-sm font-bold text-[#101828]">
                {data.deaCertificate.expiry}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
