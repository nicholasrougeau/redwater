import { PlayCircle } from 'lucide-react';

interface VideoEmbedProps {
  videoUrl?: string | null;
  title: string;
  className?: string;
}

interface ParsedSource {
  provider: 'youtube' | 'loom';
  embedUrl: string;
}

function parseVideoUrl(raw: string): ParsedSource | null {
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');

    // YouTube — youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = url.searchParams.get('v');
      if (v) return ytEmbed(v);
      const segs = url.pathname.split('/').filter(Boolean);
      if (segs[0] === 'embed' && segs[1]) return ytEmbed(segs[1]);
      if (segs[0] === 'shorts' && segs[1]) return ytEmbed(segs[1]);
    }
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      if (id) return ytEmbed(id);
    }

    // Loom — loom.com/share/ID, loom.com/embed/ID
    if (host === 'loom.com') {
      const segs = url.pathname.split('/').filter(Boolean);
      if ((segs[0] === 'share' || segs[0] === 'embed') && segs[1]) {
        return { provider: 'loom', embedUrl: `https://www.loom.com/embed/${segs[1]}` };
      }
    }
  } catch {
    return null;
  }
  return null;
}

function ytEmbed(id: string): ParsedSource {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  return { provider: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}?${params}` };
}

export const VideoEmbed = ({ videoUrl, title, className = '' }: VideoEmbedProps) => {
  const parsed = videoUrl ? parseVideoUrl(videoUrl) : null;

  if (!parsed) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-dashed border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 ${className}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <PlayCircle className="h-12 w-12 text-zinc-300" />
          <div className="px-6">
            <p className="text-sm font-bold text-zinc-700">{title}</p>
            <p className="mt-1 text-xs text-zinc-400">Video coming soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 ${className}`}>
      <iframe
        src={parsed.embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
};
