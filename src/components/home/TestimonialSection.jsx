"use client";
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { motion } from "framer-motion";

import patient1 from '@/assets/homepage/trust-section-img1.png';
import patient2 from '@/assets/homepage/trust-section-img2.png';
import patient3 from '@/assets/homepage/trust-section-img3.png';

export default function TestimonialSection() {
    const cards = [
        {
            name: "Albert Flores",
            role: "Heart patient",
            img: patient1,
            icon: <Play className="w-5 h-5 ml-1 text-white" />,
        },
        {
            name: "Leslie Alexander",
            role: "Diabetes patient",
            img: patient2,
            icon: <Pause className="w-5 h-5 text-white" />,
            featured: true,
        },
        {
            name: "Courtney Henry",
            role: "Eye patient",
            img: patient3,
            icon: <Play className="w-5 h-5 ml-1 text-white" />,
        },
    ];

    // Card animation
    const cardVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: i * 0.2 + (i === 1 ? 0.1 : 0), // middle card slightly delayed for pop
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        }),
    };

    return (
        <section className="py-24 shadow-[0px_4px_4px_0px_#00000040]
">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header - Fade In */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-bold tracking-tight"
                    >
                        Over <span className="">1000+</span> people trust us
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-md max-w-3xl mx-auto leading-relaxed"
                    >
                        HMS provides a complete suite of hospital-grade features — from patient records and appointments
                        to pharmacy, billing and reporting — everything you need to operate your healthcare facility smoothly.
                    </motion.p>
                </motion.div>

                {/* Cards - Scale from 0 to 1 with stagger */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
                            className="relative rounded-3xl overflow-hidden border border-white/20 cursor-pointer shadow-[0px_0px_10px_0px_#000000]

"

                        >
                            {/* Image */}
                            <div className="relative h-100 w-full">
                                <Image
                                    src={card.img}
                                    alt={card.name}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>

                            {/* Text overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h4 className="font-semibold text-white text-lg">{card.name}</h4>
                                    <p className="text-white/80 text-sm">{card.role}</p>
                                </div>
                                <div
                                    className="w-12 h-12 flex items-center justify-center rounded-full"
                                    style={{
                                        backdropFilter: "blur(26px)",
                                        boxShadow: "0px 15px 75px 0px #1B19444D",
                                        border: "2px solid #FFFFFF"
                                    }}
                                >
                                    {card.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 bg-black/90 text-white py-2 px-10 rounded-full font-medium hover:shadow-xl transition transform cursor-pointer"
                    >
                        See all reviews by our customers
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}