"use client";

import { useState } from "react";
import { useSequencerStore } from "@/lib/store/sequencerStore";
import { Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface SaveBeatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveBeatModal({ isOpen, onClose }: SaveBeatModalProps) {
  const { pattern, bpm } = useSequencerStore();
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const { data, error: saveError } = await supabase
        .from("beats")
        .insert({
          title,
          creator,
          bpm,
          pattern,
          settings: {
            masterVolume: 0.8,
            trackVolumes: {
              kick: 1.0,
              snare: 0.8,
              hihat: 0.6,
              bass: 0.9,
              melody: 0.7,
            },
          },
        })
        .select()
        .single();

      if (saveError) throw saveError;

      setSuccess(true);

      setTimeout(() => {
        onClose();
        setTitle("");
        setCreator("");
        setSuccess(false);
      }, 2000);
    } catch (err: unknown) {
      console.error("Error saving beat:", err);
      setError(err instanceof Error ? err.message : "Failed to save beat");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Save size={24} />
            Save Your Beat
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div className="bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded mb-4">
            <p className="font-semibold">✅ Beat saved successfully!</p>
            <p className="text-sm mt-1">
              Check the live activity feed to see your beat
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Beat Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Beat"
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="DJ Anonymous"
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="bg-gray-700 rounded p-3 mb-4">
              <p className="text-sm text-gray-300">
                <span className="font-semibold">BPM:</span> {bpm}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Active Steps:</span>{" "}
                {
                  Object.values(pattern)
                    .flat()
                    .filter((s) => s === 1).length
                }
              </p>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                {isSaving ? "Saving..." : "Save Beat"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
