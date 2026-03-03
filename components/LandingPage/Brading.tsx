import React from "react";

const Brading = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-wrap justify-center gap-6 md:gap-0 md:justify-evenly items-center w-[90%] mx-auto py-5">
        <div className="flex gap-2 items-center">
          <img src="/hospital-icon.png" alt="" className="max-w-full" />
          <p className="text-[24px] font-bold bg-linear-to-r  from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
            HMS
          </p>
        </div>
        <div>
          <img src="/HMS.png" alt="" className="max-w-full" />
        </div>
        <div className="flex gap-2 items-center">
          <img src="/earth-icon.png" alt="" className="max-w-full" />
          <p className="text-[13px] font-medium bg-linear-to-r  from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
            Heal-trust
          </p>
        </div>
        <div>
          <p className="text-[24px] font-bold bg-linear-to-r  from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
            HMS
          </p>
        </div>
        <div>
          <p className="text-[24px] font-bold bg-linear-to-r  from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
            SmartHMS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brading;
