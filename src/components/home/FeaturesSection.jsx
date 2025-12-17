// components/FeaturesSection.tsx
"use client";

import { Calendar, Video, Users, CreditCard, FileText, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
    const features = [
        {
            icon: <Calendar className="w-8 h-8 text-blue-600" />,
            title: "Smart Scheduling",
            desc: "AI-powered booking system that optimizes doctor availability and reduces no-shows automatically.",
        },
        {
            icon: <Video className="w-8 h-8 text-blue-600" />,
            title: "Telehealth Integrated",
            desc: "Built-in secure video consultations with screen sharing and instant chat capabilities.",
        },
        {
            icon: <Users className="w-8 h-8 text-blue-600" />,
            title: "Patient Portal",
            desc: "Self-service portal for patients to book visits, view records, and message their providers securely.",
        },
        {
            icon: <CreditCard className="w-8 h-8 text-blue-600" />,
            title: "Billing & Payments",
            desc: "Automated invoicing, insurance claim processing (USA), and secure online payment gateways.",
        },
        {
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            title: "Patient Registration",
            desc: "Digital intake forms and swift check-in process to minimize waiting room congestion.",
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
            title: "Practice Analytics",
            desc: "Deep insights into practice performance, patient demographics, and financial health.",
        },
    ];

    return (
        <section
            className="py-20 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(2,132,199,0.3)_0deg,rgba(181,219,238,0.797368)_43.27deg,#FEFEFE_211.15deg,rgba(139,198,229,0.680702)_347.88deg,rgba(2,132,199,0.3)_360deg),linear-gradient(0deg,rgba(195,195,195,0.2),rgba(195,195,195,0.2))]">

            <div className="max-w-7xl mx-auto px-6 ">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block bg-[#D9FFDAB2] text-[#1B61CA] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                    >
                        Features
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl mt-4 md:text-4xl font-bold"
                    >
                        Complete Practice <span className="text-[#0284C7]">Management</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-[18px] text-[#475569] max-w-3xl mx-auto"
                    >
                        Everything you need to run a modern healthcare facility, from patient intake to billing.
                    </motion.p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => {
                        const isFirst = index === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, x: -80 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.15,
                                    ease: [0.6, -0.05, 0.01, 0.99],
                                }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.05,
                                    transition: { duration: 0.4 },
                                }}
                                // 👇 Added group to detect hover on card
                                className={`
                  group bg-white rounded-2xl px-8 py-6 cursor-pointer border 
                  border-[#F1F5F9] transition-all relative overflow-hidden
                  ${isFirst
                                        ? "shadow-[0_4px_8px_-2px_#3FA8DE] border-b-4 border-b-[#3FA8DE]"
                                        : "shadow-sm hover:shadow-[0_10px_30px_-10px_#3FA8DE] hover:border-b-4 hover:border-b-[#3FA8DE]"
                                    }
                `}
                            >

                                {/* Icon — NOW rotates when card is hovered */}
                                <motion.div
                                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-[0_0_2px_0_#0000000D]"
                                    variants={{
                                        rotate: { rotate: 360 },
                                        initial: { rotate: 0 },
                                    }}
                                    initial="initial"
                                    animate="initial"
                                    whileHover="rotate"
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {item.icon}
                                </motion.div>

                                {/* Title */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15 + 0.3 }}
                                    className="text-lg font-bold text-[#0F172A] mb-2"
                                >
                                    {item.title}
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15 + 0.4 }}
                                    className="text-[#475569] leading-relaxed"
                                >
                                    {item.desc}
                                </motion.p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
