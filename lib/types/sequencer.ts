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

export interface DbBeat {
  id: string;
  title: string;
  creator: string;
  bpm: number;
  pattern: BeatPattern;
  settings: {
    masterVolume: number;
    trackVolumes: Record<InstrumentName, number>;
  };
  plays: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export function fromDbBeat(dbBeat: DbBeat): Beat {
  return {
    id: dbBeat.id,
    title: dbBeat.title,
    creator: dbBeat.creator,
    bpm: dbBeat.bpm,
    pattern: dbBeat.pattern,
    settings: dbBeat.settings,
    plays: dbBeat.plays,
    likes: dbBeat.likes,
    createdAt: dbBeat.created_at,
  };
}