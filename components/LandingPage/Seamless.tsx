import { ArrowRight } from "lucide-react";
import React from "react";
const seamlessData = [
  {
    icon: "/landing-page/seamless1.png",
    title: "Secure File Sharing During Calls",
  },
  {
    icon: "/landing-page/seamless2.png",
    title: "Integrated Chat & Notes",
  },
  {
    icon: "/landing-page/seamless3.png",
    title: "End-to-End Encryption",
  },
];

const Seamless = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-[90%] mx-auto py-10">
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex">
              <div className="bg-[#DBEAFE] py-1 px-2 items-center rounded-full flex gap-2">
                <img src="/landing-page/video.png" alt="" className="w-5 h-4" />
                <span className="text-[#1D4ED8] font-semibold text-[12px]">
                  VIRTUAL CARE
                </span>
              </div>
            </div>
            <p className="text-2xl md:text-[36px] pt-4 font-bold">
              Seamless Tele<span className="text-[#0284C7]">health</span>{" "}
              <span className="text-[#0284C7]">Experience</span>
            </p>
            <p className="text-[#475569] text-base md:text-[18px] pt-3">
              Connect with patients remotely through our secure, HD video
              platform. No external apps required—it's all built right into the
              dashboard.
            </p>

            <div className="flex flex-col gap-3 mt-6">
              {seamlessData.map((val, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="rounded-full shadow-sm p-2">
                      <img src={val.icon} alt="" />
                    </span>
                    <p className=" font-medium text-[16px]">{val.title}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-[#0284C7] font-semibold mt-5 flex gap-2 items-start">
              Learn more about Telehealth features <ArrowRight />
            </p>
          </div>
          <div>
            <img src="/landing-page/seamless.png" alt="" className="w-full" />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Seamless;
