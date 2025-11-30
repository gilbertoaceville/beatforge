"use client";

import { useSequencerStore } from "@/lib/store/sequencerStore";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState } from "react";
import * as Tone from "tone";

export function Controls() {
  const { isPlaying, bpm, setIsPlaying, setBpm, clearPattern } =
    useSequencerStore();
  const [audioStarted, setAudioStarted] = useState(false);

  const handlePlay = async () => {
    if (!audioStarted && Tone.getContext().state !== "running") {
      await Tone.start();
      setAudioStarted(true);
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={handlePlay}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            isPlaying
              ? "bg-orange-600 hover:bg-orange-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={20} />
              Pause
            </>
          ) : (
            <>
              <Play size={20} />
              Play
            </>
          )}
        </button>

        <button
          onClick={clearPattern}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Clear
        </button>

        <div className="flex items-center gap-3 ml-auto">
          <label className="text-white font-semibold">BPM:</label>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            min={60}
            max={200}
            className="w-20 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />

          <input
            type="range"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            min={60}
            max={200}
            className="w-48"
          />

          <span className="text-white font-mono text-sm w-12">{bpm}</span>
        </div>
      </div>
    </div>
  );
}
