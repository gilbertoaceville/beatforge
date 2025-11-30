"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSequencerStore } from "@/lib/store/sequencerStore";
import { getAudioEngine } from "@/lib/audio/audioEngine";
import { InstrumentName } from "@/lib/types/sequencer";
import * as Tone from "tone";

export function useAudioEngine() {
  const audioEngineRef = useRef(getAudioEngine());
  const { isPlaying, bpm, pattern, currentStep, setCurrentStep } =
    useSequencerStore();
  const sequenceIdRef = useRef<number | null>(null);

  const initializeAudio = useCallback(async () => {
    await audioEngineRef.current.initialize();
  }, []);

  useEffect(() => {
    audioEngineRef.current.setBPM(bpm);
  }, [bpm]);

  useEffect(() => {
    const transport = Tone.getTransport();

    if (isPlaying) {
      if (sequenceIdRef.current !== null) {
        transport.clear(sequenceIdRef.current);
      }

      sequenceIdRef.current = transport.scheduleRepeat((time) => {
        const step = currentStep;

        (Object.keys(pattern) as InstrumentName[]).forEach((instrument) => {
          if (pattern[instrument][step] === 1) {
            audioEngineRef.current.playInstrument(instrument, time);
          }
        });

        const nextStep = (step + 1) % 16;

        Tone.Draw.schedule(() => {
          setCurrentStep(nextStep);
        }, time);
      }, "16n");

      audioEngineRef.current.start();
    } else {
      audioEngineRef.current.stop();

      if (sequenceIdRef.current !== null) {
        transport.clear(sequenceIdRef.current);
        sequenceIdRef.current = null;
      }

      setCurrentStep(0);
    }

    return () => {
      if (sequenceIdRef.current !== null) {
        transport.clear(sequenceIdRef.current);
      }
    };
  }, [isPlaying, pattern, currentStep, setCurrentStep]);

  useEffect(() => {
    const engine = audioEngineRef.current;

    return () => {
      engine.stop();
      engine.dispose();
    };
  }, []);

  return { initializeAudio };
}
