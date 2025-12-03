import { Music, TrendingUp, Play } from "lucide-react";

export default function Footer() {
  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why BeatForge?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
            <p className="text-gray-400">
              Intuitive 16-step sequencer with real-time audio playback
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Global Community
            </h3>
            <p className="text-gray-400">
              Share your beats and discover patterns from around the world
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Instant Playback
            </h3>
            <p className="text-gray-400">
              Professional quality sounds powered by Tone.js
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
