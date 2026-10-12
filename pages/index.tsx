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
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/songs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: 'quick' }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
      setResult({ error: 'Generation failed. Make sure the FastAPI backend is running on port 8000.' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-md px-4 pb-10 pt-5 sm:max-w-xl sm:px-6">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-zinc-400">GrungeForge</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight">Prompt to ruin.</h1>
          </div>

          <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-medium text-zinc-200">
            Saved
          </button>
        </header>

        <section className="rounded-[28px] border border-white/10 bg-[#11161d] p-4 shadow-[0_0_0_1px_rgba(255,92,63,0.25),0_16px_40px_rgba(0,0,0,0.35)]">
          <label className="mb-3 block text-[10px] uppercase tracking-[0.26em] text-zinc-400">
            Describe the track
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-36 w-full resize-none rounded-2xl border border-white/10 bg-[#0d1117] p-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a36]/60"
            placeholder="Make me a raw, nasty grunge track with a chorus that sounds like a knife in the throat."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {quickPresets.map((item) => (
              <button
                key={item}
                onClick={() => setPrompt(item)}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-300 transition hover:border-[#ff5a36]/60 hover:text-white"
              >
                Quick
              </button>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex-1 rounded-2xl bg-[#ff5a36] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(255,90,54,0.4)] transition active:scale-[0.98]"
            >
              {isGenerating ? 'Generating...' : 'Generate track'}
            </button>

            <button className="rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-3 text-sm font-semibold text-zinc-200">
              Mix
            </button>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          <div className="rounded-[22px] border border-white/10 bg-[#11161d] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400">Song spec</p>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${result ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-zinc-400'}`}>
                {result ? 'Ready' : 'Draft'}
              </span>
            </div>

            <div className="space-y-2 text-sm text-zinc-200">
              <div className="flex items-center justify-between"><span className="text-zinc-400">Tempo</span><span>118 BPM</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Key</span><span>D minor</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Tuning</span><span>Drop D</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Vocal</span><span>raspy / close mic</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Tone</span><span>raw / distorted / bleak</span></div>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[#11161d] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400">Track stack</p>
              <span className="text-[10px] text-zinc-500">Preview</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Lyrics', status: 'Ready' },
                { label: 'Chords', status: 'Ready' },
                { label: 'Tabs', status: 'Ready' },
                { label: 'Drums', status: 'Ready' },
                { label: 'Mix', status: 'Preview' },
              ].map((item, idx) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d1117] px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5a36]/15 text-[10px] font-bold text-[#ff8a69]">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-zinc-200">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div className="rounded-[22px] border border-white/10 bg-[#11161d] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400">Generated result</p>
                <span className="text-[10px] text-zinc-500">Live</span>
              </div>

              <div className="space-y-3 text-sm text-zinc-200">
                {result.error ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-3 text-red-200">{result.error}</div>
                ) : (
                  <>
                    <div><strong className="text-white">Title:</strong> {result.title}</div>
                    <div><strong className="text-white">Tempo:</strong> {result.tempo} BPM</div>
                    <div><strong className="text-white">Key:</strong> {result.key}</div>
                    <div><strong className="text-white">Lyrics:</strong> {result.lyrics?.join(' ')}</div>
                    <div><strong className="text-white">Chords:</strong> {result.chords?.join(' • ')}</div>
                    <div><strong className="text-white">Drum pattern:</strong> {result.drums?.pattern}</div>
                    {result.preview_url ? (
                      <a href={`http://localhost:8000${result.preview_url}`} className="inline-block rounded-xl bg-[#ff5a36] px-3 py-2 text-xs font-bold text-white" target="_blank" rel="noreferrer">
                        Download preview
                      </a>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
