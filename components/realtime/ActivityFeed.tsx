"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Play, Zap, Heart } from "lucide-react";
import { DbBeat } from "@/lib/types/sequencer";

interface Activity {
  id: string;
  type: "new_beat" | "play" | "like";
  beat: DbBeat;
  timestamp: Date;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("public:beats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "beats",
        },
        (payload) => {
          console.log("New beat created:", payload);

          const newActivity: Activity = {
            id: `${Date.now()}-setup`,
            type: "new_beat",
            beat: payload.new as DbBeat,
            timestamp: new Date(),
          };

          setActivities((prev) => [newActivity, ...prev].slice(0, 10));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "beats",
        },
        (payload) => {
          console.log("Beat updated:", payload);

          const oldBeat = payload.old as DbBeat;
          const newBeat = payload.new as DbBeat;

          if (newBeat.plays > oldBeat.plays) {
            const activity: Activity = {
              id: `${Date.now()}-play`,
              type: "play",
              beat: newBeat,
              timestamp: new Date(),
            };
            setActivities((prev) => [activity, ...prev].slice(0, 10));
          }

          if (newBeat.likes > oldBeat.likes) {
            const activity: Activity = {
              id: `${Date.now()}-like`,
              type: "like",
              beat: newBeat,
              timestamp: new Date(),
            };
            setActivities((prev) => [activity, ...prev].slice(0, 10));
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!isConnected) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm">Connecting to live feed...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-green-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-bold text-white">🔴 Live Activity</h3>
        </div>
        <div className="text-xs text-gray-400">
          {activities.length} recent{" "}
          {activities.length === 1 ? "event" : "events"}
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Zap size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Waiting for activity...</p>
            <p className="text-xs mt-1">
              Create a beat or play one to see live updates!
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-gray-700 rounded p-3 border border-gray-600 hover:border-gray-500 transition-all animate-slideIn"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "new_beat"
                      ? "bg-green-600"
                      : activity.type === "play"
                      ? "bg-blue-600"
                      : "bg-pink-600"
                  }`}
                >
                  {activity.type === "new_beat" && (
                    <Zap size={16} className="text-white" />
                  )}
                  {activity.type === "play" && (
                    <Play size={16} className="text-white" />
                  )}
                  {activity.type === "like" && (
                    <Heart size={16} className="text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">
                    {activity.type === "new_beat" && (
                      <>
                        <span className="text-green-400">
                          New beat created:
                        </span>{" "}
                        {activity.beat.title}
                      </>
                    )}
                    {activity.type === "play" && (
                      <>
                        <span className="text-blue-400">Someone played:</span>{" "}
                        {activity.beat.title}
                      </>
                    )}
                    {activity.type === "like" && (
                      <>
                        <span className="text-pink-400">Someone liked:</span>{" "}
                        {activity.beat.title}
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    by {activity.beat.creator} • {activity.beat.bpm} BPM •{" "}
                    {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
