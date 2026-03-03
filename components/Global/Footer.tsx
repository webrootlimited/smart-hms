import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
];

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Telehealth", href: "#" },
  { label: "Integrations", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1a1a2e] text-white">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -left-40 h-120 w-120 rounded-full bg-[#7F60F9] opacity-10 blur-[120px]" />
        <div className="absolute top-20 -right-20 h-100 w-100 rounded-full bg-[#6DDCFF] opacity-8 blur-[100px]" />
        <div className="absolute bottom-40 right-1/3 h-80 w-80 rounded-full bg-[#4D8BE9] opacity-5 blur-[100px]" />
      </div>

      {/* CTA Banner */}
      <div className="w-[90%] max-w-7xl mx-auto -translate-y-1/2">
        <div className="rounded-2xl bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-[#7F60F9]/20 hover:shadow-xl hover:shadow-[#7F60F9]/30 transition-all duration-300">
          <div>
            <h3 className="text-xl md:text-[29px] font-medium text-white text-center md:text-left">
              Master your Wellness, Live Fully
            </h3>
            <p className="mt-2 text-white/80 text-sm md:text-base max-w-lg text-center md:text-left">
              By cultivating healthy habits and embracing balance, you&apos;ll
              unlock your full potential and enjoy a life of vitality and purpose
            </p>
          </div>
          <button className="rounded-[20px] bg-white px-6 md:px-8 py-3 font-medium text-base md:text-[19px] text-[#1B61CA] cursor-pointer whitespace-nowrap shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
            Receive Your Quote
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-[90%] max-w-7xl mx-auto pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left — Info + Email */}
          <div>
            <h2 className="text-2xl md:text-[32px] font-semibold leading-tight">
              Support Your Wellness{" "}
              <br className="hidden md:inline" />
              Journey
            </h2>
            <p className="mt-4 text-white  max-w-lg">
              Our smart appointment system, trusted doctors, and seamless
              telehealth services ensure you receive care smoothly — anytime,
              anywhere
            </p>

            {/* Email input */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-4 max-w-md">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-2xl bg-white/10 px-6 py-3 text-sm text-white placeholder:text-white/40 outline-none border border-white/10 focus:border-[#7F60F9]/50 focus:ring-2 focus:ring-[#7F60F9]/30 transition-all duration-300"
              />
              <button className="rounded-[20px] bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] px-8 py-3 text-sm font-medium text-white hover:scale-105 hover:shadow-lg hover:shadow-[#7F60F9]/30 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Enter Email
              </button>
            </div>
          </div>

          {/* Right — Links */}
          <div className="flex gap-16 md:gap-20 md:justify-end">
            <div>
              <h4 className="font-bold text-base mb-4">Company</h4>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#CBD5E1] text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4">Product</h4>
              <ul className="flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#CBD5E1] text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Logo centered */}
        <div className="flex justify-center mt-14 mb-10">
          <img src="/logo.png" alt="SmartHMS" className="max-w-full opacity-80 hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6">
          <div className="flex items-center gap-3">
            <Link href="#" className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-white/40 text-sm">&copy; 2026 SmartHMS. All rights reserved.</p>
            <Link
              href="#"
              className="text-white/50 text-sm hover:text-white transition-all duration-200"
            >
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
