"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { LogIn } from "lucide-react";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  const pathname = usePathname();

  const logout = async () => {
    const response = await axios.post("/api/logout");
  };

  return (
    <div className="flex p-4 items-center justify-between bg-white shadow-md">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <LaptopIcon className="h-6 w-6" />
        <span className="sr-only">Interview AI</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6 items-center ">
        <Link
          href="/#features"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
      <Link href={"/sign-in"}>
        <div className="gap-2 cursor-pointer flex text-sm items-center">
          {" "}
          {pathname === "/" ||
          pathname === "/sign-up" ||
          pathname === "/sign-in" ? (
            "Login"
          ) : (
            <UserButton />
          )}
        </div>
      </Link>
    </div>
  );
};

function LaptopIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

export default Header;

{
  /* <ul className=" hidden md:flex gap-6 ">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-gray-300 text-[17px] hover:font-bold
         transition-all  cursor-pointer hover:text-[18px] ${
           pathname === "/dashboard"
             ? "text-gray-300 font-bold underline "
             : "text-white font-semibold"
         }`}
          >
            Dashboard
          </li>
        </Link>
        <li
          className={`hover:text-gray-300 text-[17px] hover:font-bold
         transition-all cursor-pointer hover:text-[18px] ${
           pathname === "/questions"
             ? "text-gray-300 font-bold underline "
             : "text-white font-semibold"
         }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-gray-300 text-[17px] hover:font-bold
         transition-all cursor-pointer hover:text-[18px] ${
           pathname === "/upgrade"
             ? "text-gray-300 font-bold underline "
             : "text-white font-semibold"
         }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-gray-300 text-[17px] hover:font-bold
         transition-all cursor-pointer hover:text-[18px] ${
           pathname === "/how"
             ? "text-gray-300 font-bold underline  "
             : "text-white font-semibold"
         }`}
        >
          How it works?
        </li>
      </ul> */
}
