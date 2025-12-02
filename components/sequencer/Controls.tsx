"use client";

import { useSequencerStore } from "@/lib/store/sequencerStore";
import { Play, Pause, RotateCcw, Save } from "lucide-react";
import { useState } from "react";
import * as Tone from "tone";
import { SaveBeatModal } from "./SaveBeatModal";

export function Controls() {
  const { isPlaying, bpm, setIsPlaying, setBpm, clearPattern } =
    useSequencerStore();
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handlePlay = async () => {
    try {
      const context = Tone.getContext();

      if (context.state !== "running") {
        await Tone.start();
      }

      if (context.state === "suspended") {
        await context.resume();
      }

      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  return (
    <>
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
            onClick={() => setShowSaveModal(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <Save size={20} />
            Save Beat
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

      <SaveBeatModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </>
  );
}
