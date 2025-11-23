"use client";

import { cn } from "@/lib/utils";

interface StepProps {
  isActive: boolean;
  isPlaying: boolean;
  instrumentColor: string;
  onToggle: () => void;
}

export function Step({
  isActive,
  isPlaying,
  instrumentColor,
  onToggle,
}: StepProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-12 h-12 rounded border-2 transition-all duration-150",
        isActive && `${instrumentColor} border-white`,
        !isActive && "bg-gray-800 border-gray-600 hover:border-gray-400",
        isPlaying && "scale-110 shadow-lg"
      )}
    >
      {isActive && <span className="text-white font-bold">■</span>}
    </button>
  );
}
