"use client";
import { useEffect, useState } from "react";
import { PiSpinnerLight } from "react-icons/pi";

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [messageIndex]); 

  return (
    <div className="h-screen-minus-nav w-screen flex flex-col items-center justify-start mt-64 gap-2">
      <PiSpinnerLight
        size={56}
        strokeWidth={0.5}
        className="animate-spin text-gray-600"
      />
      {loadingMessages[messageIndex]}
    </div>
  );
}

const loadingMessages = [
  <h1 key={0} className="text-sm">
    Preparing workspace...
  </h1>,
  <h1 key={1} className="text-sm">
    Fetching your files...
  </h1>,
  <h1 key={2} className="text-sm">
    Setting up the terminal...
  </h1>,
  <h1 key={3} className="text-sm">
    Just hang in there...
  </h1>,
];