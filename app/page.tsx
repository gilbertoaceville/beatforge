import Link from "next/link";
import { getFeaturedBeats } from "@/lib/data/beats";
import { Music, Play, Heart, TrendingUp } from "lucide-react";
import { ActivityFeed } from "@/components/realtime/ActivityFeed";
import Footer from "@/components/ui/Footer";
import BackLink from "@/components/ui/BackLink";

export default async function Home() {
  const featuredBeats = await getFeaturedBeats(6);

  return (
    <main className="min-h-screen bg-gray-900">
      <section className="bg-linear-to-b from-indigo-900 to-gray-900 py-20 px-4">
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
            <BackLink title="View All →" link="/beats" className="font-semibold" />
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

      <Footer />
    </main>
  );
}
