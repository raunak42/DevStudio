"use client";

import CreateProjectModal from "@/app/(pages)/dashboard/CreateProjectModal";
import { CreateNew } from "./CreateNew";
import { useState } from "react";

export default function Page() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen h-full bg-gray-100 flex flex-col items-center justify-start py-12 px-28 relative">
      <CreateNew setShowModal={setShowModal} />
      <CreateProjectModal showModal={showModal} setShowModal={setShowModal} />

      <div className="w-full flex flex-col items-start justify-start mt-12 gap-4">
        <h1 className="text-[#000000] text-xl font-semibold">Your projects</h1>
        <div className="w-[400px] h-[60px] rounded-2xl border border-dashed border-[#000000]"></div>
      </div>
    </div>
  );
}
