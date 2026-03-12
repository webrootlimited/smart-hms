import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ApplicationSubmitted() {
  return (
    <div className="text-center py-4">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#1E293B] mb-2">
        Application Submitted!
      </h3>

      <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
        Your doctor registration has been submitted for review. Our admin team
        will verify your credentials and approve your account.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-sm font-semibold text-[#1E293B] mb-2">
          What happens next?
        </p>
        <ul className="text-xs text-gray-600 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
            Our team will review your submitted documents
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
            You will receive an email once your account is approved
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
            After approval, you can log in and access your dashboard
          </li>
        </ul>
      </div>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0284C7] text-white font-semibold rounded-xl hover:opacity-90 transition text-sm"
      >
        Back to Login <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
