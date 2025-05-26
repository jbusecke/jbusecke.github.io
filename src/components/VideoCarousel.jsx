import { useState, useEffect, useRef } from 'preact/hooks';

function parseVideoData(video) {
  let videoId, embedUrl, imageUrl;
  const url = new URL(video.url);
  const hostname = url.hostname;

  const isYouTube = hostname.includes('youtube') || hostname.includes('youtu.be');
  const isVimeo = hostname.includes('vimeo');

  if (isYouTube) {
    if (hostname.includes('youtu.be')) {
      videoId = url.pathname.slice(1);
    } else {
      videoId = url.searchParams.get('v');
    }
    embedUrl = `https://www.youtube.com/embed/${videoId}?start=5&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`;
    imageUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else if (isVimeo) {
    videoId = url.pathname.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
    imageUrl = `https://vumbnail.com/${videoId}.jpg`;
  }

  return { ...video, embedUrl, imageUrl };
}

export default function VideoCarousel({ videos }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [fade, setFade] = useState(false);
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  const intervalRef = useRef(null);
  const parsedVideos = videos.map(parseVideoData);
  const totalCycles = 2;
  const totalPlays = parsedVideos.length * totalCycles;

  const selectIndex = (newIndex) => {
    if (newIndex < 0) newIndex = parsedVideos.length - 1;
    else if (newIndex >= parsedVideos.length) newIndex = 0;

    if (countRef.current >= totalPlays) {
      clearInterval(intervalRef.current);
      return;
    }

    setPrevIndex(index);
    setFade(true);

    setTimeout(() => {
      setIndex(newIndex);
      setFade(false);
      setCount((c) => {
        const newCount = c + 1;
        countRef.current = newCount;
        return newCount;
      });
    }, 500);

    clearInterval(intervalRef.current);

    if (countRef.current < totalPlays - 1) {
      intervalRef.current = setInterval(() => {
        if (countRef.current >= totalPlays) {
          clearInterval(intervalRef.current);
          return;
        }
        selectIndex((i) => (i + 1) % parsedVideos.length);
      }, 25000);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (countRef.current >= totalPlays) {
        clearInterval(intervalRef.current);
        return;
      }
      selectIndex(index + 1);
    }, 25000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) selectIndex(index + 1);
    else if (diff < -50) selectIndex(index - 1);
  };

  const current = parsedVideos[index];
  const previous = prevIndex !== null ? parsedVideos[prevIndex] : null;

  return (
    <section
      class="relative w-full max-w-7xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Video carousel"
    >
      {previous && fade && (
        <iframe
          key={`prev-${prevIndex}`}
          src={previous.embedUrl}
          title={previous.title}
          class="absolute top-0 left-0 w-full h-full transition-opacity duration-500 opacity-0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

      <iframe
        key={`curr-${index}`}
        src={current.embedUrl}
        title={current.title}
        class={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      <button
        aria-label="Previous video"
        onClick={() => selectIndex(index - 1)}
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        aria-label="Next video"
        onClick={() => selectIndex(index + 1)}
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
