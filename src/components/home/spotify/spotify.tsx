"use client";
import { useEffect, useState } from "react";

interface SpotifyPlayerProps {
  uri: string;
}

export function SpotifyPlayer({ uri }: SpotifyPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!uri) return null;

  return (
    <div className="flex justify-center items-center mt-6">
      {isLoaded && (
        <iframe
          title="Spotify Player"
          className="rounded-xl shadow-lg border-2 border-amber-300"
          src={`https://open.spotify.com/embed/${uri}`}
          width="100%"
          height="80"
          allow="encrypted-media"
        />
      )}
    </div>
  );
}
