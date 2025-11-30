'use client';

import { Beat } from '@/lib/types/sequencer';
import { Track } from '@/components/sequencer/Track';
import { Play, Pause } from 'lucide-react';
import { useSequencerStore } from '@/lib/store/sequencerStore';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { INSTRUMENTS } from '@/lib/contants';

interface BeatPlayerProps {
  beat: Beat;
}

export default function BeatPlayer({ beat }: BeatPlayerProps) {
  const { initializeAudio } = useAudioEngine();
  const { isPlaying, setIsPlaying, setBpm, loadPattern } = useSequencerStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      loadPattern(beat.pattern);
      setBpm(beat.bpm);
      await initializeAudio();
      setIsReady(true);
    };
    
    init();
    
    return () => {
      setIsPlaying(false);
    };
  }, [beat, loadPattern, setBpm, initializeAudio, setIsPlaying]);

  const handlePlay = async () => {
    if (!isReady) {
      await initializeAudio();
      setIsReady(true);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <button
          onClick={handlePlay}
          disabled={!isReady}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
            isPlaying
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={24} />
              Pause
            </>
          ) : (
            <>
              <Play size={24} />
              {isReady ? 'Play Beat' : 'Loading...'}
            </>
          )}
        </button>
      </div>

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

      <div className="mt-6 text-center">
        <Link
          href="/create"
          className="text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          Remix this beat →
        </Link>
      </div>
    </div>
  );
}