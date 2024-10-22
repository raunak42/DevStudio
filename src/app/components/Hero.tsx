"use client";
import Image from "next/image";
import { Button } from "./Button";
import HeroCode from "./HeroCode";
import { code } from "@/lib/constants";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <div className="absolute h-screen w-screen flex items-start justify-center z-0">
        <Image
          alt="img"
          src={"/backgrounds/blob.svg"}
          width={1000}
          height={1000}
        />
      </div>
      <h1 className="text-6xl font-bold text-center mt-16 w-[60%] z-10 text-[#204e7d]">
        Build your most ambitious projects with{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
          DevStudio
        </span>
      </h1>
      <h2 className="text-lg text-gray-400 z-10">
        A powerful{" "}
        <span className="text-gray-600 font-semibold bg-gradient-to-l from-orange-400 to-pink-500 text-transparent bg-clip-text">
          Cloud IDE
        </span>{" "}
        that turns your ideas into reality, anywhere, anytime
      </h2>
      <div className="h-[60px] z-10 flex items-center justify-center">
        <Button
          onClick={() => router.push("/signup")}
          className="bg-gradient-to-t z-10 from-[#001f3f] to-[#3b5f85] w-[200px] active:w-[180px] font-semibold"
        >
          Get Started
        </Button>
      </div>
      <HeroCode fileName="index.js" code={code} className="z-10" />
    </div>
  );
}
