"use client";
import Image from 'next/image';
import step1 from '@/assets/homepage/step1.png';
import step2 from '@/assets/homepage/step2.png';
import step3 from '@/assets/homepage/step3.png';
import { motion } from "framer-motion";

export default function SimpleSteps() {
    const steps = [
        {
            num: "1",
            title: "Register / Login",
            desc: "Securely create your account or log in to the HMS platform.",
            img: step1,
        },
        {
            num: "2",
            title: "Book Appointment",
            desc: "Select your preferred doctor, time, and service effortlessly.",
            img: step2,
        },
        {
            num: "3",
            title: "Attend Visit",
            desc: "Join your consultation on-site or via integrated telehealth.",
            img: step3,
        }
    ];

    return (
        <section className="py-10 relative overflow-x-hidden bg-[conic-gradient(from_180deg_at_50%_50%,rgba(2,132,199,0.3)_0deg,rgba(181,219,238,0.797368)_43.27deg,#FEFEFE_211.15deg,rgba(139,198,229,0.680702)_347.88deg,rgba(2,132,199,0.3)_360deg)]">

            <div className="max-w-7xl mx-auto px-6">

                {/* Header - subtle fade in */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-[#D9FFDAB2] text-[#1B61CA] px-7 py-2 rounded-full text-xs font-semibold tracking-wider uppercase">
                        Steps
                    </span>
                    <h2 className="mt-5 text-2xl md:text-4xl font-bold">
                        Simple Steps to Smart Management
                    </h2>
                    <p className="mt-4 text-[16px] max-w-3xl mx-auto leading-relaxed">
                        We provide the resources and connections you need to thrive. Let's create a healthier future, together.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-10">
                    {steps.map((step, index) => {
                        const isFirst = index === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.2,
                                    ease: "easeOut"
                                }}
                                whileHover={{ scale: 1.03 }}
                                className={`
                                    relative rounded-3xl px-8 py-3 bg-[#F8FAFC] cursor-pointer
                                    border border-[#F1F5F9] transition-all
                                    ${isFirst
                                        ? "shadow-[0_4px_8px_-2px_#3FA8DE] border-b-4 border-b-[#3FA8DE]"
                                        : "shadow-sm hover:shadow-[0_4px_12px_-2px_#3FA8DE] hover:border-b-4 hover:border-b-[#3FA8DE]"
                                    }
                                `}
                            >
                                {/* Floating Image – Infinite Up/Down */}
                                <motion.div
                                    animate={{
                                        y: [-10, -20, -10],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className={`
                                        absolute -right-10 z-[999]
                                        ${index === 2 ? "w-57 h-57 -top-8 -right-12" : "w-45 h-45 -top-10"}
                                    `}
                                >
                                    <Image
                                        src={step.img}
                                        alt={step.title}
                                        className="object-contain"
                                    />
                                </motion.div>

                                {/* Top Row: Step Number */}
                                <div className="flex items-center justify-between">
                                    <motion.div
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 360
                                        }}
                                        transition={{
                                            rotate: { duration: 0.8, ease: "easeInOut" },
                                            scale: { duration: 0.3 }
                                        }}
                                        className="w-12 h-12 bg-[#8DB1E7E5] rounded-full flex items-center justify-center
                                        text-2xl font-bold text-white shadow-[0_0_4px_0_#00000022]"
                                    >
                                        {step.num}
                                    </motion.div>
                                </div>

                                {/* Text Section */}
                                <div className="mt-10">
                                    <h3 className="text-lg font-bold text-[#0F172A] mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-[16px] text-[#475569] leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}