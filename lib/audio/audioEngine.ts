import * as Tone from 'tone';
import { InstrumentName } from '@/lib/types/sequencer';

export class AudioEngine {
  private synths: Record<InstrumentName, Tone.Sampler | Tone.Synth | Tone.NoiseSynth | Tone.MetalSynth>;
  private isInitialized = false;

  constructor() {
    this.synths = {
      kick: new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 6,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
      }).toDestination(),

      snare: new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
      }).toDestination(),

      hihat: new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).toDestination(),

      bass: new Tone.Synth({
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.5 }
      }).toDestination(),

      melody: new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
      }).toDestination(),
    };
  }

  async initialize() {
    if (this.isInitialized) return;
    
    await Tone.start();
    console.log('🎵 Audio engine initialized');
    this.isInitialized = true;
  }

  playInstrument(instrument: InstrumentName, time?: number) {
    if (!this.isInitialized) {
      console.warn('Audio engine not initialized');
      return;
    }

    const synth = this.synths[instrument];

    switch (instrument) {
      case 'kick':
        (synth as Tone.MembraneSynth).triggerAttackRelease('C1', '8n', time);
        break;
      case 'snare':
        (synth as Tone.NoiseSynth).triggerAttackRelease('16n', time);
        break;
      case 'hihat':
        (synth as Tone.MetalSynth).triggerAttackRelease('32n', time as number);
        break;
      case 'bass':
        (synth as Tone.Synth).triggerAttackRelease('C2', '8n', time);
        break;
      case 'melody':
        (synth as Tone.Synth).triggerAttackRelease('C4', '8n', time);
        break;
    }
  }

  setBPM(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }

  start() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  dispose() {
    Object.values(this.synths).forEach(synth => synth.dispose());
    Tone.Transport.cancel();
  }
}

let audioEngineInstance: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!audioEngineInstance) {
    audioEngineInstance = new AudioEngine();
  }
  return audioEngineInstance;
}