import { useState } from 'react';

const quickPresets = [
  'Make a 2:30 angry grunge song in drop D, 118 BPM, with raw vocals and loud, distorted guitars.',
  'Write a bleak, intimate grunge chorus with a hook about self-destruction and no polish.',
  'Build a sludgy track with crashing drums, ugly riffs, and a dirty final chorus.',
  'Create a short track with a nasty lead riff and a hook that keeps repeating like a wound.',
];

export default function HomePage() {
  const [prompt, setPrompt] = useState(quickPresets[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/songs/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log('Generated song response:', data);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-md px-4 pb-10 pt-6 sm:max-w-xl sm:px-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-smoke">GrungeForge</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight">Prompt to ruin.</h1>
          </div>
          <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-smoke">
            Saved
          </button>
        </header>

        <section className="rounded-3xl border border-white/10 bg-panel p-4 shadow-glow">
          <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-smoke">Describe the track</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#101319] p-3 text-sm text-white outline-none ring-0 placeholder:text-white/35"
            placeholder="Make me a bleak grunge song with tense riffing, a dirty chorus, and a hook I can hum."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setPrompt(preset)}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-smoke transition hover:border-ember/60 hover:text-white"
              >
                Quick
              </button>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex-1 rounded-2xl bg-ember px-4 py-3 text-sm font-bold text-white shadow-glow transition active:scale-[0.98]"
            >
              {isGenerating ? 'Generating...' : 'Generate track'}
            </button>
            <button className="rounded-2xl border border-white/10 bg-[#101319] px-4 py-3 text-sm font-semibold text-white/80">
              Mix
            </button>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-smoke">Song spec</p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                Ready
              </span>
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Tempo: 118 BPM</li>
              <li>Key: D minor</li>
              <li>Tuning: Drop D</li>
              <li>Vocal: raspy, strained, close-mic</li>
              <li>Style: raw, distorted, bleak, live-room</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-smoke">Track stack</p>
              <span className="text-[10px] text-smoke">Preview</span>
            </div>
            <div className="space-y-3">
              {['Lyrics', 'Chords', 'Tabs', 'Drums', 'Mix'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-xl bg-[#101319] px-3 py-2 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ember/20 text-[10px] font-bold text-ember">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                  <span className="text-xs text-smoke">Ready</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
