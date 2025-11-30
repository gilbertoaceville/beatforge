"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSequencerStore } from "@/lib/store/sequencerStore";
import { getAudioEngine } from "@/lib/audio/audioEngine";
import { InstrumentName } from "@/lib/types/sequencer";
import * as Tone from "tone";

export function useAudioEngine() {
  const audioEngineRef = useRef(getAudioEngine());
  const { isPlaying, bpm, setCurrentStep } =
    useSequencerStore();
  const sequenceIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  const initializeAudio = useCallback(async () => {
    if (isInitializedRef.current) return;

    try {
      await audioEngineRef.current.initialize();
      isInitializedRef.current = true;
      console.log("Audio engine initialized");
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }, []);

  useEffect(() => {
    audioEngineRef.current.setBPM(bpm);
  }, [bpm]);

  useEffect(() => {
    const transport = Tone.getTransport();

    if (isPlaying) {
      if (!isInitializedRef.current) {
        console.warn("Audio not initialized, initializing now...");
        initializeAudio().then(() => {
          startPlayback();
        });
        return;
      }

      startPlayback();
    } else {
      stopPlayback();
    }

    function startPlayback() {
      if (sequenceIdRef.current !== null) {
        transport.clear(sequenceIdRef.current);
      }

      sequenceIdRef.current = transport.scheduleRepeat((time) => {
        const storeState = useSequencerStore.getState();
        const step = storeState.currentStep;
        const currentPattern = storeState.pattern;

        (Object.keys(currentPattern) as InstrumentName[]).forEach(
          (instrument) => {
            if (currentPattern[instrument][step] === 1) {
              audioEngineRef.current.playInstrument(instrument, time);
            }
          }
        );

        const nextStep = (step + 1) % 16;

        Tone.Draw.schedule(() => {
          setCurrentStep(nextStep);
        }, time);
      }, "16n");

      audioEngineRef.current.start();
    }

    function stopPlayback() {
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
  }, [isPlaying, initializeAudio, setCurrentStep]);

  useEffect(() => {
    const engine = audioEngineRef.current;

    return () => {
      engine.stop();
    };
  }, []);

  return { initializeAudio };
}
