export type Step = 0 | 1;
export type Pattern = Step[];
export type InstrumentName = "kick" | "snare" | "hihat" | "bass" | "melody";
export interface BeatPattern {
  kick: Pattern;
  snare: Pattern;
  hihat: Pattern;
  bass: Pattern;
  melody: Pattern;
}
export interface Beat {
  id: string;
  title: string;
  creator: string;
  bpm: number;
  createdAt: string;
  plays: number;
  likes: number;
  pattern: BeatPattern;
  settings: {
    masterVolume: number;
    trackVolumes: Record<InstrumentName, number>;
  };
}
export interface SequencerState {
  isPlaying: boolean;
  currentStep: number;
  bpm: number;
  pattern: BeatPattern;
  masterVolume: number;
}
