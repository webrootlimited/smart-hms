"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Does this system support patient electronic records?",
    answer:
      "Yes, the system maintains complete Electronic Medical Records (EMR) including patient history, prescriptions, lab reports, allergies, and follow-up notes.",
  },
  {
    question: "Can I book appointments online through the system?",
    answer:
      "Absolutely. Patients can book, reschedule, or cancel appointments online through the self-service portal with real-time provider availability.",
  },
  {
    question: "Is the system compliant with NHS and HIPAA standards?",
    answer:
      "Yes, the platform is engineered to meet both UK NHS data security standards and US HIPAA compliance requirements, including encrypted data storage and audit logging.",
  },
  {
    question: "Does it support telehealth or virtual consultations?",
    answer:
      "Yes, the system supports telemedicine appointment types with integrated virtual consultation links, allowing patients to attend visits remotely.",
  },
  {
    question: "Can multiple doctors and clinics use the same system?",
    answer:
      "Yes, the platform supports multi-provider and multi-location setups, with individual schedules, availability rules, and department assignments for each provider.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-20 pb-40 bg-[#f9f9f9]">
      <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left column */}
        <div>
          <p className=" font-light text-[#000000B2] mb-4">FAQ</p>
          <h2 className="text-3xl md:text-[36px] font-bold leading-tight">
            Discover the most{" "}
            <span className="text-[#0284C7]">common questions.</span>
          </h2>
          <p className="mt-6 text-[12px] leading-10 w-full md:w-[70%] ">
            Hospital Management System helps automate patient records,
            appointment scheduling, billing, staff management, inventory, and
            reporting — making healthcare operations easier, faster, and more
            reliable for hospitals, clinics, and medical centers.
          </p>
        </div>

        {/* Right column — Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl  bg-[#F5F5F5ED]/93 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-semibold text-[13px]  pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-[12px] text-[#0F172ACC]/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
