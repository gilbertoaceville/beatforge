import { Beat, DbBeat, fromDbBeat } from "@/lib/types/sequencer";
import { supabaseServer } from "@/lib/supabase/server";

export async function getAllBeats(): Promise<Beat[]> {
  const { data, error } = await supabaseServer
    .from("beats")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching beats:", error);
    return [];
  }

  return data.map((beat: DbBeat) => fromDbBeat(beat));
}

export async function getBeatById(id: string): Promise<Beat | null> {
  const { data, error } = await supabaseServer
    .from("beats")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching beat:", error);
    return null;
  }

  return fromDbBeat(data as DbBeat);
}

export async function getFeaturedBeats(limit: number = 3): Promise<Beat[]> {
  const { data, error } = await supabaseServer
    .from("beats")
    .select("*")
    .order("plays", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured beats:", error);
    return [];
  }

  return data.map((beat: DbBeat) => fromDbBeat(beat));
}

export async function saveBeat(
  beat: Omit<Beat, "id" | "createdAt" | "plays" | "likes">
): Promise<Beat | null> {
  const { data, error } = await supabaseServer
    .from("beats")
    .insert({
      title: beat.title,
      creator: beat.creator,
      bpm: beat.bpm,
      pattern: beat.pattern,
      settings: beat.settings,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving beat:", error);
    return null;
  }

  return fromDbBeat(data as DbBeat);
}

export async function incrementPlays(beatId: string): Promise<void> {
  const { error } = await supabaseServer.rpc("increment_plays", {
    beat_id: beatId,
  });

  if (error) {
    console.error("Error incrementing plays:", error);
  }
}

export async function incrementLikes(beatId: string): Promise<void> {
  const { error } = await supabaseServer.rpc("increment_likes", {
    beat_id: beatId,
  });

  if (error) {
    console.error("Error incrementing likes:", error);
  }
}
