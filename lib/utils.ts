import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BeatPattern, Pattern } from '@/lib/types/sequencer';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createEmptyPattern(): Pattern {
  return Array(16).fill(0) as Pattern;
}

export function createEmptyBeatPattern(): BeatPattern {
  return {
    kick: createEmptyPattern(),
    snare: createEmptyPattern(),
    hihat: createEmptyPattern(),
    bass: createEmptyPattern(),
    melody: createEmptyPattern(),
  };
}