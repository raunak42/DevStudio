"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { templates } from "@/app/(pages)/dashboard/CreateProjectModal";
import { House } from "lucide-react";
import { BiSolidRightArrow } from "react-icons/bi";
import Image from "next/image";
import { Button } from "./Button";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { HomeClickedState } from "@/store";

export const SessionNavbar: React.FC = () => {
  const setHomeCLicked = useSetRecoilState(HomeClickedState);

  const params = useSearchParams();
  const projectId = params.get("projectId");

  if (!projectId) return;

  const framework = projectId.split("-")[0];
  const workspace = projectId.split("-")[1];
  const logoSrc = templates.find((t) => t.framework === framework)!.logo;

  return (
    <div className="h-12 w-full px-6 gap-16 grid grid-cols-3 z-20 border-b bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-start gap-3 col-span-1">
        <Link href={"/dashboard"} onClick={() => setHomeCLicked(true)}>
          <House size={20} className="stroke-[1.5px] text-gray-800" />
        </Link>
        <Image
          src={logoSrc}
          alt={framework}
          width={20}
          height={20}
          className="select-none"
        />
        <h1 className="select-none text-sm text-gray-600 font-medium">
          {workspace}
        </h1>
      </div>
      <div className=" col-span-1 flex items-center justify-center">
        <Button className="flex items-center justify-center gap-1 bg-green-600 rounded-md w-[68px] h-[32px] active:w-[68px] active:h-[32px] group">
          <BiSolidRightArrow
            size={14}
            className="text-green-200 group-hover:text-white"
          />
          <h1 className="text-sm text-green-200 group-hover:text-white font-semibold">
            Run
          </h1>
        </Button>
      </div>
      <div className=" col-span-1 flex items-center justify-end">
        <UserButton showName={true} />
      </div>
    </div>
  );
};
