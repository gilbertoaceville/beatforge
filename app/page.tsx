import Link from "next/link";
import { getFeaturedBeats } from "@/lib/data/beats";
import { Music, Play, Heart, TrendingUp } from "lucide-react";
import { ActivityFeed } from "@/components/realtime/ActivityFeed";

export default async function Home() {
  const featuredBeats = await getFeaturedBeats(6);

  return (
    <main className="min-h-screen bg-gray-900">
      <section className="bg-gradient-to-b from-indigo-900 to-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">🎵 BeatForge</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create, share, and discover amazing beats. The online drum machine
            with global patterns and real-time collaboration.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/create"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2"
            >
              <Music size={24} />
              Start Creating
            </Link>
            <Link
              href="/beats"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2"
            >
              <TrendingUp size={24} />
              Explore Beats
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <ActivityFeed />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">🔥 Featured Beats</h2>
            <Link
              href="/beats"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBeats.map((beat) => (
              <Link
                key={beat.id}
                href={`/beats/${beat.id}`}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all hover:scale-105 border border-gray-700 hover:border-indigo-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {beat.title}
                    </h3>
                    <p className="text-sm text-gray-400">by {beat.creator}</p>
                  </div>
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {beat.bpm} BPM
                  </div>
                </div>

                <div className="mb-4 space-y-1">
                  {Object.entries(beat.pattern)
                    .slice(0, 3)
                    .map(([instrument, pattern]) => (
                      <div key={instrument} className="flex gap-1">
                        {(pattern as number[]).map((step, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded ${
                              step === 1 ? "bg-indigo-500" : "bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Play size={16} />
                    {beat.plays.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    {beat.likes.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
    </main>
  );
}
