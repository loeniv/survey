import { useRef, useState } from "react";

export default function VideoStage({ src, label, maxPlays }) {
  const videoRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  const limitReached = maxPlays != null && playCount >= maxPlays;

  function handlePlay() {
    if (limitReached) {
      videoRef.current?.pause();
      return;
    }
    // Nur einen frischen Start (nicht ein Fortsetzen nach Pause) als
    // eine Wiedergabe zählen.
    const startedFromBeginning = (videoRef.current?.currentTime ?? 0) < 0.5;
    if (startedFromBeginning) {
      setPlayCount((c) => c + 1);
    }
  }

  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-black overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-ink)]">
        <span className="font-mono text-xs tracking-wider text-white/70 uppercase">
          {label}
        </span>
        {maxPlays != null && (
          <span className="font-mono text-xs text-white/70">
            Plays {Math.min(playCount, maxPlays)}/{maxPlays}
          </span>
        )}
      </div>

      <div className="relative">
        <video
          key={src}
          ref={videoRef}
          src={src}
          controls={!limitReached}
          controlsList="nodownload"
          onPlay={handlePlay}
          className="w-full aspect-video bg-black"
        >
          Your browser does not support the video element.
        </video>

        {limitReached && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center">
            <p className="font-mono text-sm text-white">
              Maximum number of plays reached ({maxPlays}×)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
