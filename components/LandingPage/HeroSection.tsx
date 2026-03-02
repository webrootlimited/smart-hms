import { Search } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto items-center grid grid-cols-1 md:grid-cols-2 py-10 md:py-20 gap-10 md:gap-0">
        <div className="text-center md:text-left">
          <p className="text-3xl md:text-[48px] font-medium leading-tight">
            Smarter Scheduling for Smarter Healthcare{" "}
            <span className="text-[#4D8BE9]">Anytime, Anywhere</span>
          </p>
          <p className="text-[#7F60F9] text-base md:text-[18px] mt-4">
            Book, manage, and monitor appointments seamlessly.{" "}
            <br className="hidden md:inline" />
            Engineered for healthcare providers with full UK NHS & USA{" "}
            <br className="hidden md:inline" />
            HIPAA compliance standards.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex items-center gap-0 max-w-md mx-auto md:mx-0 rounded-[60px] border p-2">
            <div className="flex flex-1 items-center gap-2 rounded-[60px] px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Type disease, etc."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            <Button className="rounded-[60px] bg-[#161515] px-4 sm:px-6 py-3 h-auto text-xs sm:text-sm font-semibold text-white hover:bg-[#161515] cursor-pointer whitespace-nowrap">
              FIND A DOCTOR
            </Button>
          </div>

          {/* Trusted by */}
          <div className="mt-8 items-center gap-4 text-sm text-gray-500">
            <p className="font-semibold text-[18px] text-[#7F60F9]">
              Trusted by 50k+ users
            </p>
            <p className="bg-linear-to-r text-[26px] from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
              &#9733;&#9733;&#9733;&#9733;&#9734;{" "}
              <span className="text-[16px] font-semibold text-[#7F60F9]">
                4.1/5
              </span>{" "}
              <span className="text-[16px] text-[#584E4E]"> (14k Reviews)</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src="/landing-page/hero-section.png"
            alt=""
            className="w-full max-w-sm md:max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
