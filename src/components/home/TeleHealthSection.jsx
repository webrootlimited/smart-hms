"use client";
import Image from 'next/image';
import { Mic, PhoneOff, Video } from "lucide-react";
import { motion } from "framer-motion";

import teleImage from '@/assets/homepage/tele-section.jpg';

export default function TeleHealthSection() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT SIDE - Image + Floating Elements */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative lg:self-stretch hidden lg:block"  // Hide on mobile, show and stretch on lg+
                    >
                        {/* Main Background Image */}
                        <motion.div
                            initial={{ scale: 0.95 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="overflow-hidden h-full w-full"  // Ensure full height and width
                        >
                            <Image
                                src={teleImage}
                                alt="Doctor in telehealth consultation"
                                className="w-full h-full object-cover"
                                priority
                            />
                        </motion.div>
                    </motion.div>



                    {/* RIGHT SIDE - Content (from right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="space-y-8 lg:ml-auto"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 bg-[#DBEAFE] text-[#0284C7] px-6 py-2 rounded-full text-xs font-medium"
                        >
                            <Video className="w-5 h-5 text-current" />
                            VIRTUAL CARE
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-2xl md:text-4xl font-semibold"
                        >
                            Seamless Tele<span className="text-[#0284C7]">health</span><br />
                            <span className="text-[#0284C7]">Experience</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-md max-w-lg"
                        >
                            Connect with patients remotely through our secure, HD video platform. No external apps required—it's all built right into the dashboard.
                        </motion.p>

                        <motion.ul
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.9, staggerChildren: 0.15 }}
                        >
                            {[
                                "Secure File Sharing During Calls",
                                "Integrated Chat & Notes",
                                "End-to-End Encryption"
                            ].map((text, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + i * 0.15 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-8 h-8 border-[#E2E8F0] rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">{text}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.a
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 }}
                            href="#"
                            className="inline-flex items-center gap-3 text-[#0284C7] font-medium hover:gap-5 transition-all text-md"
                        >
                            Learn more about Telehealth features
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}