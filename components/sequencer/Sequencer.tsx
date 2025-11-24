"use client";

import { Track } from "./Track";
import { Controls } from "./Controls";
import { INSTRUMENTS } from "@/lib/contants";

export function Sequencer() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">🎵 BeatForge</h1>

      <Controls />

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-24"></div>
            <div className="flex gap-1">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className="w-12 text-center text-xs text-gray-400 font-mono"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {INSTRUMENTS.map((instrument) => (
          <Track
            key={instrument.name}
            instrument={instrument.name}
            label={instrument.label}
            color={instrument.color}
          />
        ))}
      </div>
    </div>
  );
}
