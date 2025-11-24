"use client";

import { InstrumentName } from "@/lib/types/sequencer";
import { useSequencerStore } from "@/lib/store/sequencerStore";
import { Step } from "./Step";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface TrackProps {
  instrument: InstrumentName;
  label: string;
  color: string;
}

export function Track({ instrument, label, color }: TrackProps) {
  const { pattern, currentStep, toggleStep } = useSequencerStore();
  const [isMuted, setIsMuted] = useState(false);
  const trackPattern = pattern[instrument];

  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-24 flex items-center justify-between">
        <span className="text-white font-semibold text-sm uppercase">
          {label}
        </span>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-1 rounded transition-colors ${
            isMuted ? "text-gray-500" : "text-white hover:text-gray-300"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className="flex gap-1">
        {trackPattern.map((step, index) => (
          <Step
            key={index}
            isActive={step === 1}
            isPlaying={currentStep === index}
            instrumentColor={color}
            onToggle={() => toggleStep(instrument, index)}
          />
        ))}
      </div>
    </div>
  );
}
