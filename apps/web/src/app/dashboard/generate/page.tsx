"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [platform, setPlatform] = useState("Instagram");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleGenerate() {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          topic,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setResult(data.text);
    } catch (error) {
      console.error(error);
      setResult("Something went wrong while generating content.");
    } finally {
      setLoading(false);
    }
  }

  async function copyContent() {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    alert("Content copied!");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-4xl font-bold">
          AI Content Generator
        </h1>

        <p className="mt-2 text-slate-400">
          Generate engaging social media content using Gemini AI.
        </p>

        <div className="mt-10 space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-8">

          <div>
            <label className="mb-2 block font-medium">
              Platform
            </label>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
            >
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>X (Twitter)</option>
              <option>Facebook</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Topic
            </label>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Benefits of AI in education"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tone
            </label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
            >
              <option>Professional</option>
              <option>Friendly</option>
              <option>Funny</option>
              <option>Persuasive</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>

        </div>

        {result && (
          <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-8">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Generated Content
              </h2>

              <button
                onClick={copyContent}
                className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700"
              >
                Copy
              </button>
            </div>

            <pre className="whitespace-pre-wrap font-sans text-slate-200">
              {result}
            </pre>

          </div>
        )}

      </div>
    </main>
  );
}