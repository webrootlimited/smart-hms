"use client";

import { Play, Pause, MoveUpRight } from "lucide-react";

const testimonials = [
  {
    name: "Albert Flores",
    role: "Heart patient",
    image: "/landing-page/tu1.png",
    playing: false,
  },
  {
    name: "Leslie Alexander",
    role: "Diabetes patient",
    image: "/landing-page/tu2.png",
    playing: true,
  },
  {
    name: "Courtney Henry",
    role: "Eye patient",
    image: "/landing-page/tu3.png",
    playing: false,
  },
];

export default function TrustUs() {
  return (
    <section className="py-24 bg-white">
      <div className="w-[90%] md:w-[80%] mx-auto px-0 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-[52px] font-semibold text-[#131212]">
            Over 1000+ people trust us
          </h2>
          <p className="mt-4 text-base md:text-[18px] leading-relaxed w-full md:w-[85%] mx-auto">
            HMS provides a complete suite of hospital-grade features — from
            patient records and appointments to pharmacy, billing and reporting
            — everything you need to operate your healthcare facility smoothly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {testimonials.map((item, index) => (
            <div key={index} className="relative pt-[10px] pl-[20px]">
              {/* Background overlay (eaeaea) — sits behind the image */}
              <div className="absolute inset-0 rounded-3xl bg-[#eaeaea]" />

              {/* Image wrapper — relative so image flows naturally */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="block w-full rounded-3xl"
                />

                {/* Dark gradient overlay on image */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Title + icon — absolute on top of overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <h3 className="font-semibold text-[18px]">{item.name}</h3>
                    <p className="text-[14px] text-gray-200">{item.role}</p>
                  </div>

                  <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/40 hover:bg-white/30 transition cursor-pointer">
                    {item.playing ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button className="group relative px-8 md:px-10 py-3 bg-linear-to-r from-[#1a1a2e] to-[#4a2d8a] text-white rounded-full cursor-pointer font-semibold flex items-center gap-3 text-sm md:text-base shadow-lg shadow-[#4a2d8a]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#4a2d8a]/50 hover:scale-105 hover:-translate-y-0.5">
            See all reviews by our customers
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <MoveUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
