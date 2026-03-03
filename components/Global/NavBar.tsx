"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";

const navLinks = ["Appointment", "Features", "Pricing", "Support"];

const NavBar = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto py-5 flex items-center justify-between">
        <div>
          <Link href="/">
            <img src="/logo.png" alt="" className="cursor-pointer max-w-full" />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            // <p
            //   key={link}
            //   className="cursor-pointer bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent"
            // >
               <p
              key={link}
              className="cursor-pointer bg-linear-to-r from-[#7F60F9] font-semibold to-[#7F60F9] bg-clip-text text-transparent"
            >
              {link}
            </p>
          ))}
        </div>

        {/* Desktop button */}
        <div className="hidden md:block">
          <Button className="rounded-[22px] py-2 px-4 bg-transparent text-black cursor-pointer hover:bg-transparent hover:text-black border border-[#7F60F9]">
            Start free trial
          </Button>
        </div>

        {/* Mobile drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden cursor-pointer">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-70">
            <SheetHeader>
              <SheetTitle>
                <img src="/logo.png" alt="SmartHMS" />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-5 px-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link}>
                  <p className="cursor-pointer text-lg bg-linear-to-r from-[#6DDCFF] to-[#7F60F9] bg-clip-text text-transparent">
                    {link}
                  </p>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button className="rounded-[22px] py-2 px-4 w-fit bg-transparent text-black cursor-pointer hover:bg-transparent hover:text-black border border-[#7F60F9]">
                  Start free trial
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
