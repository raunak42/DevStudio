"use client";
import { Button } from "@/components/Button";
import { Dispatch, SetStateAction } from "react";
import { IoIosAdd } from "react-icons/io";

interface CreateNewProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateNew = ({ setShowModal }: CreateNewProps) => {
  return (
    <div className="w-full flex gap-2">
      <div className="w-[150px] h-[30px] flex items-center justify-center group">
        <Button
          onClick={() => setShowModal(true)}
          className="gap-1 w-[150px] h-[30px] active:w-[140px] active:h-[28px] rounded-md bg-gradient-to-t z-10 from-[#001f3f] to-[#3b5f85]"
        >
          <IoIosAdd className="size-[20px] group-active:size-[18px] transition-all duration-100" />
          <h1 className="text-sm font-medium group-active:text-xs transition-all duration-100">
            Create project
          </h1>
        </Button>
      </div>
    </div>
  );
};
