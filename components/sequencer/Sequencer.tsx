"use client";

import { Track } from "./Track";
import { Controls } from "./Controls";
import { INSTRUMENTS } from "@/lib/contants";
import { useEffect, useState } from "react";
import { useAudioEngine } from "@/hooks/useAudioEngine";

export function Sequencer() {
  const { initializeAudio } = useAudioEngine();
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeAudio();
      setAudioReady(true);
    };
    init();
  }, [initializeAudio]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">🎵 BeatForge</h1>

      {!audioReady && (
        <div className="bg-yellow-900 border border-yellow-600 text-yellow-200 px-4 py-3 rounded mb-4">
          <p className="font-semibold">🔊 Initializing audio engine...</p>
          <p className="text-sm">Click anywhere to enable audio</p>
        </div>
      )}

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

      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">🎹 Quick Start</h2>
        <ul className="text-gray-300 space-y-2">
          <li>• Click on the grid to activate steps</li>
          <li>
            • Press <kbd className="bg-gray-700 px-2 py-1 rounded">Play</kbd> to
            start
          </li>
          <li>• Adjust BPM to change tempo (60-200)</li>
          <li>• Use mute buttons to solo instruments</li>
          <li>
            • Press <kbd className="bg-gray-700 px-2 py-1 rounded">Clear</kbd>{" "}
            to reset
          </li>
        </ul>
      </div>
    </div>
  );
}
