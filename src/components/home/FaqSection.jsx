export default function FaqSection() {
  const faqs = [
    "Does this system support patient electronic records?",
    "Can the system handle appointment scheduling automatically?",
    "Does the system support billing and invoicing?",
    "Is patient data secure and compliant with regulation?",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Side - Title */}
          <div className="lg:col-span-5">
            <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              FAQ
            </span>
            <h2 className="mt-6 text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              Discover the most
              <span className="text-[#0284C7]"> common questions.</span>
            </h2>
            <p className="mt-6 text-[13px] font-semibold leading-[40px] text-[#0F172ACC]">
              Hospital Management System helps automate patient records,
              appointment scheduling, billing, staff management, inventory, and
              reporting — making healthcare operations easier, faster, and more
              reliable for hospitals, clinics, and medical centers.
            </p>
          </div>

          {/* Right Side - FAQ List */}
          <div className="lg:col-span-7 max-w-3xl">
            <div className="space-y-4">
              {faqs.map((question, index) => (
                <details
                  key={index}
                  className="group bg-[#F6F6F6] rounded-2xl overflow-hidden transition-all hover:bg-gray-100 cursor-pointer"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between px-6 py-3 text-[14px] font-medium text-black list-none">
                    <span>{question}</span>
                    <svg
                      className="w-6 h-6 text-gray-400 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-8 pb-6 text-[13px] text-[#0F172ACC] leading-relaxed">
                    <p>
                      Yes, the system maintains complete Electronic Medical
                      Records (EMR) including patient history, prescriptions,
                      lab reports, allergies, and follow-up notes.
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
