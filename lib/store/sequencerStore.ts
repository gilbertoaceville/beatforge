import { create } from "zustand";
import {
  BeatPattern,
  InstrumentName,
  SequencerState,
} from "@/lib/types/sequencer";
import { createEmptyBeatPattern } from "@/lib/utils";

interface SequencerStore extends SequencerState {
  toggleStep: (instrument: InstrumentName, stepIndex: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentStep: (step: number) => void;
  setBpm: (bpm: number) => void;
  setMasterVolume: (volume: number) => void;
  clearPattern: () => void;
  loadPattern: (pattern: BeatPattern) => void;
}

export const useSequencerStore = create<SequencerStore>((set) => ({
  isPlaying: false,
  currentStep: 0,
  bpm: 120,
  pattern: createEmptyBeatPattern(),
  masterVolume: 0.8,

  toggleStep: (instrument, stepIndex) =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        [instrument]: state.pattern[instrument].map(
          (step, i) => (i === stepIndex ? (step === 1 ? 0 : 1) : step)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any,
      },
    })),

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentStep: (step) => set({ currentStep: step }),

  setBpm: (bpm) => set({ bpm }),

  setMasterVolume: (volume) => set({ masterVolume: volume }),

  clearPattern: () =>
    set({
      pattern: createEmptyBeatPattern(),
      currentStep: 0,
      isPlaying: false,
    }),

  loadPattern: (pattern) => set({ pattern }),
}));
