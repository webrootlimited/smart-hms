import { Shield, CalendarCheck, FileText, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    color: "bg-[#F0FDF4] text-[#16A34A]",
    title: "Bank-Level Security",
    desc: "Your medical data is encrypted with HIPAA-compliant protocols.",
  },
  {
    icon: CalendarCheck,
    color: "bg-[#EFF6FF] text-[#2563EB]",
    title: "Easy Scheduling",
    desc: "Book appointments with specialists in just a few clicks.",
  },
  {
    icon: FileText,
    color: "bg-[#FAF5FF] text-[#9333ea]",
    title: "Digital Records",
    desc: "Access your lab results and prescriptions anytime, anywhere.",
  },
];

export default function SignUpLeft() {
  return (
    <div className="flex flex-col justify-center  px-8 lg:px-8">
      {/* Star badge */}
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl lg:text-[48px] font-bold text-[#0F172A] leading-tight ">
       <p> Your Health Journey{" "}</p>
        <span className="text-[#0284C7]">Starts Here</span>
      </h1>

      <p className="mt-4 text-[#475569] text-[18px] leading-relaxed max-w-sm">
        Join thousands of patients who trust MediCare Connect for secure,
        seamless, and personalized healthcare management.
      </p>

      {/* Features */}
      <div className="mt-8 flex flex-col gap-5">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}>
              <f.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold  text-[#1E293B]">{f.title}</p>
              <p className=" text-[#64748B] text-xs mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust bar */}
      <div className="mt-10 flex items-center gap-4">
        <div className="flex -space-x-3">
          {["user1.png","user2.png","user3.png"].map((i) => (
            <img
              key={i}
              src={`/auth/${i}`}
              className="w-8 h-8 "
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-blue-600">
            +2k
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-xs text-gray-500 mt-0.5">
            Trusted by patients worldwide
          </span>
        </div>
      </div>
    </div>
  );
}
