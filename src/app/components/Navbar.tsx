"use client";
import React from "react";
import { Button } from "./Button";
import { TiArrowSortedUp } from "react-icons/ti";
import { BsWindowSidebar } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { ScrollToState } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const router = useRouter()
  const setScrollTo= useSetRecoilState(ScrollToState);

  return (
    <div className="h-16 w-full py-8 px-16 flex items-center justify-between z-20 border-b bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Link href={"/"} className="flex items-center gap-2">
          <BsWindowSidebar
            strokeWidth={0.3}
            className="text-[#001f3f]"
            size={28}
          />
          <h1 className="text-2xl font-bold text-[#001f3f]">DevStudio</h1>
        </Link>

        <div className="h-6 w-px bg-gray-300 mx-4" />

        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          <h1
            onClick={() => {
              setScrollTo({
                section: "features",
                clicked: true,
              });
            }}
            className="hover:text-[#001f3f] transition-colors cursor-pointer"
          >
            Features
          </h1>
          <h1
            onClick={() => {
              setScrollTo({
                section: "testimonials",
                clicked: true,
              });
            }}
            className="hover:text-[#001f3f] transition-colors cursor-pointer"
          >
            Testimonials
          </h1>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="/signin"
          className="hidden md:block text-gray-600 hover:text-[#001f3f] transition-colors"
        >
          Sign In
        </a>
        <div className="w-[140px] flex items-center justify-center">
          <Button onClick={()=>router.push("/signin")} className="w-[140px] active:w-[120px] bg-gradient-to-t from-orange-400 to-[#fcd076] text-white font-semibold transition-all">
            Dashboard
            <TiArrowSortedUp className="rotate-90" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
