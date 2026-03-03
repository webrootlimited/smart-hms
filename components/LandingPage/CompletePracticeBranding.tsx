import { practiceData } from "./practice";

const CompletePracticeBranding = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-175 w-175 rounded-full bg-[#6DDCFF] opacity-20 blur-[120px]" />
        <div className="absolute top-20 right-0 h-125 w-125 rounded-full bg-[#7F60F9] opacity-15 blur-[120px]" />
        <div className="absolute top-60 left-1/3 h-100 w-100 rounded-full bg-[#4D8BE9] opacity-10 blur-[100px]" />
      </div>
      <div className="w-[90%] mx-auto py-10">
        <p className="text-2xl md:text-[36px] font-bold text-center">
          Complete Practice{" "}
          <span className="bg-linear-to-r  from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
            Management
          </span>
        </p>
        <p className="text-[#475569] pt-2 text-base md:text-[18px] text-center w-[90%] md:w-[60%] mx-auto">
          Everything you need to run a modern healthcare facility, from patient
          intake to billing, all in one secure platform.
        </p>
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {practiceData.map((val, index) => {
            return (
              <div
                key={index}
                className="border rounded-[24px] shadow-md bg-[#F8FAFC] p-6 gap-3 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:border-[#7F60F9]/30 cursor-pointer"
              >
                <span className="p-2 mt-4 shadow-md rounded-lg bg-[#FFFFFF] inline-block ">
                  <img src={val.icon} alt="" />
                </span>
                <p className="pt-3 text-[#0F172A] font-bold text-[20px]">
                  {val.title}
                </p>
                <p className="pt-3 text-[#475569]">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompletePracticeBranding;
