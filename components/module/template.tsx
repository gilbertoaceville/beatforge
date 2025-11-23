"use client";

import { Step } from "@/components/sequencer/Step";

export default function StepTemplate() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 16 }).map((_, i) => (
        <Step
          key={i}
          isActive={false}
          isPlaying={i === 0}
          instrumentColor="bg-red-500"
          onToggle={() => console.log(`Step ${i} clicked`)}
        />
      ))}
    </div>
  );
}
