"use client";
import React from "react";
import { BsWindowSidebar } from "react-icons/bs";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export const SessionNavbar: React.FC = () => {
  return (
    <div className="h-16 w-full py-8 px-16 gap-16 flex items-center justify-between z-20 border-b bg-white/80 backdrop-blur-sm">
      <Link href={"/"} className="flex items-center gap-2">
        <BsWindowSidebar
          strokeWidth={0.3}
          className="text-[#204e7d]"
          size={28}
        />
        <h1 className="text-2xl font-bold text-[#204e7d]">DevStudio</h1>
      </Link>
      <UserButton showName={true} />
    </div>
  );
};
