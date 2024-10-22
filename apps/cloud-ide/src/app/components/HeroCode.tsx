// import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils";

interface HeroCodeProps {
  fileName?: string;
  code: string;
  language?: string;
  className?: string;
}

export default function HeroCode({
  fileName = "script.js",
  code,
  language = "javascript",
  className,
}: HeroCodeProps) {
  return (
    <div
      className={cn(
        className,
        "w-full max-w-3xl bg-white fdark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 fdark:bg-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm font-medium text-gray-600 fdark:text-white">
          {fileName}
        </div>
      </div>
      <div className="h-full w-full fdark:text-gray-300">
        <pre className="p-4 text-sm  bg-transparent">
          <code className={`language-${language} `}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
