import { useRef, useState } from "react";

// The play counter lives on the component instance. App.jsx gives <VideoStage>
// a `key` per scenario, so every video starts again at 0 / maxPlays.
export default function VideoStage({ src, label, maxPlays }) {
  const videoRef = useRef(null);
  const [startedCount, setStartedCount] = useState(0);
  const [ended, setEnded] = useState(false);

  const limited = maxPlays != null;
  // Grey out only once the LAST allowed play has actually finished.
  const blocked = limited && startedCount >= maxPlays && ended;

  function handlePlay() {
    const video = videoRef.current;
    const freshStart = (video?.currentTime ?? 0) < 0.5;
    if (!freshStart) return; // resuming after a pause, never counts

    if (limited && startedCount >= maxPlays) {
      // Would be one play too many, stop it before it really starts.
      video?.pause();
      setEnded(true);
      return;
    }
    setEnded(false);
    setStartedCount((c) => c + 1);
  }

  function goFullscreen() {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen(); // iOS Safari
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-black overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[var(--color-ink)]">
        <span className="font-mono text-xs tracking-wider text-white/70 uppercase truncate">
          {label}
        </span>
        <div className="flex items-center gap-3 flex-shrink-0">
          {limited && (
            <span className="font-mono text-xs text-white/70">
              Plays {Math.min(startedCount, maxPlays)}/{maxPlays}
            </span>
          )}
          <button
            type="button"
            onClick={goFullscreen}
            disabled={blocked}
            className="font-mono text-xs text-white/70 hover:text-white disabled:opacity-30 whitespace-nowrap"
            aria-label="Play in fullscreen"
          >
            ⤢<span className="hidden sm:inline"> Fullscreen</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <video
          key={src}
          ref={videoRef}
          src={src}
          controls={!blocked}
          controlsList="nodownload"
          playsInline
          onPlay={handlePlay}
          onEnded={() => setEnded(true)}
          className="w-full aspect-video bg-black"
        >
          Your browser does not support the video element.
        </video>

        {blocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center">
            <p className="font-mono text-sm text-white">
              You have watched this clip {maxPlays} times.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
