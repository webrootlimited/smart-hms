"use client";
import { Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";

export default function FooterWithQuote() {
    return (
        <footer className="bg-[#2D2D2D] text-white mt-40">
            {/* Get Quote Section - Animated */}
            <section className="px-6 relative">
                <div className="max-w-7xl mx-auto translate-y-[-50%]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.9,
                            delay: 0.2,
                            ease: [0.6, -0.05, 0.01, 0.99],
                        }}
                        className="bg-[linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] relative rounded-3xl px-10 py-10 text-white shadow-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white opacity-5 rounded-3xl" />

                        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl font-semibold leading-tight">
                                    Master your Wellness, Live Fully
                                </h2>
                                <p className="mt-4 text-md leading-relaxed">
                                    By cultivating healthy habits and embracing balance, you’ll unlock your full potential
                                    and enjoy a life of vitality and purpose.
                                </p>
                            </div>

                            <div className="flex justify-center md:justify-end">
                                <button className="bg-white text-[#1B61CA] px-10 py-3 rounded font-semibold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer">
                                    Receive Your Quote
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer Content */}
            <div className="pb-20 pt-15 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-[65%] space-y-8">
                        <div>
                            <h3 className="text-[32px] font-semibold">Support Your Wellness Journey</h3>
                            <p className="mt-4 text-[16px] leading-relaxed w-full">
                                Our smart appointment system, trusted doctors, and seamless telehealth services ensure you receive care smoothly — anytime, anywhere.
                            </p>
                        </div>

                        <form className="flex flex-col sm:flex-row gap-8 w-full mt-8">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="flex-1 px-5 text-sm py-3.5 bg-[#1F2228] rounded text-white placeholder-gray-500 hover:ring-2 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                            />
                            <button className="px-6 text-sm py-3 h-fit bg-[#2F70D3E5] rounded font-medium transition cursor-pointer hover:scale-105 whitespace-nowrap">
                                Enter Email
                            </button>
                        </form>
                    </div>

                    <div className="lg:w-[30%] grid grid-cols-2 gap-12 text-sm">
                        <div>
                            <h4 className="font-semibold text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-6">Product</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition">Features</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Telehealth</Link></li>
                                <li><Link href="#" className="hover:text-white transition">Integrations</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-2 border-t border-t-white/20 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                <div className="flex items-center gap-6">
                    <Link href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></Link>
                    <Link href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></Link>
                    <Link href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></Link>
                    <Link href="#" className="hover:text-white transition"><Youtube className="w-5 h-5" /></Link>
                </div>

                <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">SmartHMS</span>
                </div>

                <div className="text-white text-sm px-4">
                    <Link href="#" className="hover:text-white transition">Terms & Conditions</Link>
                </div>
            </div>
        </footer>
    );
}