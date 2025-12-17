"use client";
import Image from 'next/image';
import { motion } from "framer-motion";
import sectionImg from "@/assets/homepage/leading-healthcare-section.png";

export default function HealthcareProviderSections() {
    return (
        <section className="overflow-hidden relative isolate">
            {/* Conic gradient applied via inline styles - placed at the bottom and covering full width */}
            <div
                className="absolute inset-x-0 bottom-0 h-10 -z-10 pointer-events-none"
                style={{
                    background: 'conic-gradient(from 180deg at 50% 50%, rgba(2, 132, 199, 0.3) 0deg, rgba(181, 219, 238, 0.797368) 43.27deg, #FEFEFE 211.15deg, rgba(139, 198, 229, 0.680702) 347.88deg, rgba(2, 132, 199, 0.3) 360deg)'
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-16 items-center min-h-[600px] py-24">
                    {/* Left Side - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="w-full lg:w-auto flex justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-full max-w-lg"
                        >
                            <Image
                                src={sectionImg}
                                alt="Healthcare providers with medical tools"
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="w-full lg:w-auto space-y-8 flex flex-col items-start justify-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl md:text-4xl font-semibold leading-tight"
                        >
                            Leading healthcare <br />
                            <span className="text-[#0284C7]">providers</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xs md:text-sm max-w-md leading-relaxed text-gray-600"
                        >
                            Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone. To us, it’s not just work. We take pride in the solutions we deliver
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="px-6 py-2 bg-transparent border border-[#0284C7] text-[#0284C7] rounded-full text-xs md:text-sm font-medium hover:bg-[#0284C7] hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            Learn more
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}