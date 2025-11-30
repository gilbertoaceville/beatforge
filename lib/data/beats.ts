import { Beat } from '@/lib/types/sequencer';

export const mockBeats: Beat[] = [
  {
    id: 'beat-001',
    title: 'Classic House',
    creator: 'DJ Alex',
    bpm: 128,
    createdAt: '2024-01-15T10:30:00Z',
    plays: 1234,
    likes: 456,
    pattern: {
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hihat: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      bass: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      melody: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    },
    settings: {
      masterVolume: 0.8,
      trackVolumes: { kick: 1.0, snare: 0.8, hihat: 0.6, bass: 0.9, melody: 0.7 },
    },
  },
  {
    id: 'beat-002',
    title: 'Lo-fi Chill',
    creator: 'BeatsBy_M',
    bpm: 85,
    createdAt: '2024-01-14T15:20:00Z',
    plays: 890,
    likes: 234,
    pattern: {
      kick: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hihat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      bass: [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      melody: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    },
    settings: {
      masterVolume: 0.7,
      trackVolumes: { kick: 0.9, snare: 0.7, hihat: 0.5, bass: 0.8, melody: 0.9 },
    },
  },
  {
    id: 'beat-003',
    title: 'Trap Bounce',
    creator: 'ProdX',
    bpm: 140,
    createdAt: '2024-01-13T20:45:00Z',
    plays: 2345,
    likes: 678,
    pattern: {
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hihat: [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
      bass: [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      melody: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    settings: {
      masterVolume: 0.85,
      trackVolumes: { kick: 1.0, snare: 0.9, hihat: 0.7, bass: 0.95, melody: 0.6 },
    },
  },
  {
    id: 'beat-004',
    title: 'Synthwave Dreams',
    creator: 'DJ_Retro',
    bpm: 120,
    createdAt: '2024-01-12T12:00:00Z',
    plays: 1567,
    likes: 432,
    pattern: {
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      bass: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      melody: [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    },
    settings: {
      masterVolume: 0.8,
      trackVolumes: { kick: 1.0, snare: 0.8, hihat: 0.6, bass: 0.9, melody: 0.8 },
    },
  },
  {
    id: 'beat-005',
    title: 'Jungle Groove',
    creator: 'RhythmMaster',
    bpm: 160,
    createdAt: '2024-01-11T18:30:00Z',
    plays: 987,
    likes: 321,
    pattern: {
      kick: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      hihat: [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
      bass: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      melody: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    settings: {
      masterVolume: 0.75,
      trackVolumes: { kick: 0.95, snare: 0.85, hihat: 0.7, bass: 0.9, melody: 0.6 },
    },
  },
];

export async function getAllBeats(): Promise<Beat[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockBeats;
}

export async function getBeatById(id: string): Promise<Beat | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockBeats.find((beat) => beat.id === id) || null;
}

export async function getFeaturedBeats(limit: number = 3): Promise<Beat[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockBeats
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit);
}

export async function saveBeat(beat: Beat): Promise<Beat> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Beat saved:', beat);
  return beat;
}