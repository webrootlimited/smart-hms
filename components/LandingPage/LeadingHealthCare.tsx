import React from "react";
import { Button } from "../ui/button";

const LeadingHealthCare = () => {
  return (
    <>
      <div className="w-[90%] mx-auto pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img src="/landing-page/LeadingHealthCare.png" alt="Leading Health Care" className="w-full" />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full md:w-[70%] text-center md:text-left">
            <p className="font-bold text-2xl md:text-[36px]">
              Leading healthcare{" "}
              <br className="hidden md:inline" />
              <span className="text-[#0284C7]">providers</span>{" "}
            </p>
            <p className="text-base md:text-[18px] trxt-[#7D7987] mt-8 font-light w-full md:w-[90%]">
              Trafalgar provides progressive, and affordable healthcare,
              accessible on mobile and online for everyone. To us, it&apos;s not just
              work. We take pride in the solutions we deliver
            </p>
            <Button className="text-[#458FF6] mt-8 bg-transparent border border-[#458FF6] rounded-[22px] py-2 px-4 hover:bg-transparent hover:text-[#458FF6] cursor-pointer">
              Learn more
            </Button>
          </div>
        </div>
      </div>
      <img src="/landing-page/Rectangle 43.png" alt="" className="mt-6 w-full" />
    </>
  );
};

export default LeadingHealthCare;
