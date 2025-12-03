import { getBeatById } from "@/lib/data/beats";
import { notFound } from "next/navigation";
import BeatPlayer from "@/components/beats/BeatPlayer";
import { Play, Heart, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import BackLink from "@/components/ui/BackLink";

export default async function BeatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const beat = await getBeatById(id);

  if (!beat) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <BackLink
          title="← Back to Home"
          link="/"
          className="mb-6 inline-block"
        />

        <div className="bg-gray-800 rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {beat.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  {beat.creator}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  {beat.bpm} BPM
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(beat.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-2xl font-bold">
              {beat.bpm} BPM
            </div>
          </div>

          <div className="flex gap-6 text-lg">
            <div className="flex items-center gap-2 text-gray-300">
              <Play size={20} />
              <span className="font-semibold">
                {beat.plays.toLocaleString()}
              </span>
              <span className="text-gray-500">plays</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Heart size={20} />
              <span className="font-semibold">
                {beat.likes.toLocaleString()}
              </span>
              <span className="text-gray-500">likes</span>
            </div>
          </div>
        </div>

        <BeatPlayer beat={beat} />
      </div>
    </main>
  );
}
