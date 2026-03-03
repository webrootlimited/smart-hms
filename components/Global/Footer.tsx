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
    <footer className="bg-[#2D2D2D] text-white">
      {/* CTA Banner */}
      <div className="w-[90%] max-w-7xl mx-auto -translate-y-1/2">
        <div className="rounded-2xl bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-[29px] font-medium text-white text-center md:text-left">
              Master your Wellness, Live Fully
            </h3>
            <p className="mt-2 text-white/80 text-sm md:text-base max-w-lg text-center md:text-left">
              By cultivating healthy habits and embracing balance, you&apos;ll
              unlock your full potential and enjoy a life of vitality and purpose
            </p>
          </div>
          <button className="rounded-[20px] bg-white px-6 md:px-8 py-3 font-medium text-base md:text-[19px] text-[#1B61CA] cursor-pointer whitespace-nowrap">
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
                className="w-full rounded-2xl bg-[#71717133]/20 px-6 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/40"
              />
              <button className="rounded-[20px] bg-[#2F70D3E5]/90 px-8 py-3 text-sm font-medium text-white hover:bg-[#2563eb] transition cursor-pointer whitespace-nowrap">
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
                      className="text-[#CBD5E1] text-sm hover:text-white transition"
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
                      className="text-[#CBD5E1] text-sm hover:text-white transition"
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
          <img src="/logo.png" alt="SmartHMS" className="max-w-full" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex items-center gap-5">
            <Link href="#" className="text-white/50 hover:text-white transition">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-white/50 hover:text-white transition">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-white/50 hover:text-white transition">
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="#"
            className="text-white/50 text-sm hover:text-white transition"
          >
            Terms &amp; Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}
