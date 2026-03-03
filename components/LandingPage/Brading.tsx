import React from "react";

const brands = [
  { type: "icon-text", icon: "/hospital-icon.png", text: "HMS", textSize: "text-[24px]", fontWeight: "font-bold" },
  { type: "image", icon: "/HMS.png" },
  { type: "icon-text", icon: "/earth-icon.png", text: "Heal-trust", textSize: "text-[13px]", fontWeight: "font-medium" },
  { type: "text", text: "HMS", textSize: "text-[24px]", fontWeight: "font-bold" },
  { type: "text", text: "SmartHMS", textSize: "text-[24px]", fontWeight: "font-bold" },
];

const BrandItem = ({ brand }: { brand: (typeof brands)[number] }) => {
  if (brand.type === "image") {
    return (
      <div className="flex-shrink-0 px-8">
        <img src={brand.icon} alt="" />
      </div>
    );
  }
  if (brand.type === "icon-text") {
    return (
      <div className="flex-shrink-0 px-8 flex gap-2 items-center">
        <img src={brand.icon} alt="" />
        <p className={`${brand.textSize} ${brand.fontWeight} bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent whitespace-nowrap`}>
          {brand.text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 px-8">
      <p className={`${brand.textSize} ${brand.fontWeight} bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent whitespace-nowrap`}>
        {brand.text}
      </p>
    </div>
  );
};

const Brading = () => {
  return (
    <div className="bg-white py-5 overflow-hidden">
      <div className="flex items-center animate-marquee w-max">
        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
          <BrandItem key={index} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Brading;
