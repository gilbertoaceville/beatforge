import { getAllBeats } from "@/lib/data/beats";
import Link from "next/link";
import { Play, Heart } from "lucide-react";
import BackLink from "@/components/ui/BackLink";

export const metadata = {
  title: "All Beats | BeatForge",
  description: "Explore all beats created by the BeatForge community",
};

export default async function BeatsPage() {
  const beats = await getAllBeats();

  return (
    <main className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <BackLink
          title="← Back to Home"
          link="/"
          className="mb-6 inline-block"
        />

        <h1 className="text-4xl font-bold text-white mb-8">All Beats</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beats.map((beat) => (
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
                      {pattern.map((step: number, i: number) => (
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
    </main>
  );
}
