"use client";
import React from "react";
import { PanelsTopLeft } from 'lucide-react';
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export const SessionNavbar: React.FC = () => {
  return (
    <div className="h-16 w-full py-8 px-4 gap-16 flex items-center justify-between z-20 border-b bg-white/80 backdrop-blur-sm">
      <Link href={"/"} className="flex items-center gap-2">
        <PanelsTopLeft
        // fill="#000000"
        color="#000000"
          className="text-[#000000] stroke-[1.4px]"
          size={28}
        />
        <h1 className="text-2xl font-normal text-[#000000]">DevStudio</h1>
      </Link>
      <UserButton showName={true} />
    </div>
  );
};
