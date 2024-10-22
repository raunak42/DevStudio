"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, useState } from "react";
import { Loader } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const asyncOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await new Promise<void>(async (resolve) => {
      if (onClick) {
        await onClick(e); //It has.
      }
      resolve();
    });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await asyncOnClick(e);
    setLoading(false);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "bg-black hover:opacity-70 rounded-xl w-[300px] h-[40px] text-white flex items-center justify-center transition-all duration-100 active:w-[280px] active:h-[36px] active:text-sm text-base",
        className,
        {
          "opacity-70": loading,
        }
      )}
    >
      {loading ? <Loader size={16} className=" animate-spin" /> : children}
    </button>
  );
};
