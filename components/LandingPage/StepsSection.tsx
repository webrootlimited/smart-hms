import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Register / Login",
    description: "Securely create your account or log in to the HMS platform.",
    image: "/simplestep1.png",
  },
  {
    id: 2,
    title: "Book Appointment",
    description:
      "Select your preferred doctor, time, and service effortlessly.",
    image: "/simplestep2.png",
  },
  {
    id: 3,
    title: "Attend Visit",
    description: "Join your consultation on-site or via integrated telehealth.",
    image: "/simplestep3.png",
  },
];

export default function StepsSection() {
  return (
    <section className="w-full overflow-hidden bg-linear-to-r from-sky-100 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[36px] font-bold ">
            Simple Steps to Smart Management
          </h2>
          <p className="mt-4 text-[#0B0B0B99]/60 max-w-2xl text-[14px] mx-auto">
            We provide the resources and connections you need to thrive. Let’s
            create a healthier future, together.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 mt-5 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition"
            >
              {/* Number Badge */}
              <div className="flex">
                <div className="rounded-full w-[68px] h-[68px] bg-[#8DB1E7E5]/90 text-white text-[36px] flex items-center justify-center">
                  {step.id}
                </div>
              </div>

              {/* Image */}
              <div className="mb-6 justify-center absolute -top-20 -right-10 hidden md:flex">
                <img
                  src={step.image}
                  alt={step.title}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-[28px] mt-8 font-bold text-[#0F172A] mb-2">
                {step.title}
              </h3>
              <p className="text-[#475569] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
