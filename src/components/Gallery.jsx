import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { cloudinaryUrl } from '../utils/cloudinary'

const GAP            = 6;
const ROW_HEIGHT     = 380;
const ROW_HEIGHT_MOB = 140;

function parseRatio(r) {
  if (typeof r === "number") return r;
  if (typeof r === "string" && r.includes("/")) {
    const [a, b] = r.split("/").map(Number);
    return b ? a / b : 1;
  }
  return parseFloat(r) || 1;
}

function getImageSrc(item, width = null) {
  if (item.cloudinaryId) return cloudinaryUrl(item.cloudinaryId, width)
  return item.src
}

function buildRows(items, targetRatio) {
  const rows    = [];
  let current   = [];
  let sumRatios = 0;

  const flush = () => {
    if (current.length > 0) {
      rows.push({ items: current, sumRatios });
      current   = [];
      sumRatios = 0;
    }
  };

  items.forEach((item) => {
    const r = item._aspect;

    if (current.length === 0) {
      current.push(item);
      sumRatios = r;
      if (sumRatios >= targetRatio) flush();
      return;
    }

    const nextSum    = sumRatios + r;
    const overBefore = targetRatio - sumRatios;
    const overAfter  = nextSum - targetRatio;

    if (overAfter <= 0) {
      current.push(item);
      sumRatios = nextSum;
      if (sumRatios >= targetRatio) flush();
    } else if (overAfter < overBefore) {
      current.push(item);
      sumRatios = nextSum;
      flush();
    } else {
      flush();
      current.push(item);
      sumRatios = r;
      if (sumRatios >= targetRatio) flush();
    }
  });

  flush();
  return rows;
}

function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

// ─── Carte ────────────────────────────────────────────────────────────────────

function MediaCard({ item, width, height, onClick }) {
  const videoRef = useRef(null);
  const [loaded,  setLoaded]  = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (item.type !== "video" || item.vimeoId || !videoRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) videoRef.current?.play().catch(() => {});
        else                  videoRef.current?.pause();
      },
      { threshold: 0.3 }
    );
    obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, [item.type, item.vimeoId]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  return (
    <div
      className="card"
      style={{ width, height, flexShrink: 0, flexGrow: 0 }}
      onClick={() => onClick(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(item)}
      aria-label={item.alt || item.label}
    >
      {!loaded && <div className="skeleton" />}

      {item.type === "image" ? (
        <img
          src={getImageSrc(item)}
          alt={item.alt}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      ) : item.vimeoId ? (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <iframe
            src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&loop=1&autoplay=1&muted=1`}
            style={{
              opacity: loaded ? 1 : 0,
              border: 'none',
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% + 200px)',
              height: 'calc(100% + 200px)',
              pointerEvents: 'none',
            }}
            allow="autoplay; fullscreen"
            onLoad={() => setLoaded(true)}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          muted loop playsInline preload="metadata"
          onLoadedMetadata={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}

      <div className={`overlay${hovered ? " visible" : ""}`} />
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ item, items, onClose, onPrev, onNext }) {
  const videoRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => { setImgLoaded(false); }, [item?.id]);

  // Précharge prev + next
  useEffect(() => {
    if (!item || !items) return;
    const idx  = items.findIndex((i) => i.id === item.id);
    const prev = items[(idx - 1 + items.length) % items.length];
    const next = items[(idx + 1) % items.length];
    [prev, next].forEach((neighbor) => {
      if (neighbor?.type === "image") {
        const img = new Image();
        img.src = getImageSrc(neighbor, 1800);
      }
    });
  }, [item, items]);

  useEffect(() => {
    if (item?.type === "video" && !item.vimeoId) videoRef.current?.play().catch(() => {});
    const h = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [item, onClose, onPrev, onNext]);

  // Bloque le scroll + cache le header quand la lightbox est ouverte
  useEffect(() => {
    const header = document.querySelector("header");
    if (item) {
      document.body.style.overflow = "hidden";
      if (header) header.style.display = "none";
    } else {
      document.body.style.overflow = "";
      if (header) header.style.display = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (header) header.style.display = "";
    };
  }, [item]);

  if (!item) return null;

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      {/* Bouton fermer dans le portal, z-index max */}
      <button className="lb-close" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Fermer">✕</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        {item.type === "image" ? (
          <>
            {!imgLoaded && (
              <img
                src={getImageSrc(item, 40)}
                alt={item.alt}
                style={{ filter: 'blur(20px)', transform: 'scale(1.05)', transition: 'none' }}
              />
            )}
            <img
              key={item.id}
              src={getImageSrc(item, 1800)}
              alt={item.alt}
              onLoad={() => setImgLoaded(true)}
              style={{
                opacity: imgLoaded ? 1 : 0,
                position: imgLoaded ? 'relative' : 'absolute',
                transition: 'opacity 0.2s ease',
              }}
            />
          </>
        ) : item.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&loop=1`}
            style={{ border: 'none', width: '80vw', height: '45vw', maxHeight: '90vh' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <video ref={videoRef} src={item.src} controls loop playsInline />
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── Galerie ──────────────────────────────────────────────────────────────────

export default function Gallery({ items = [] }) {
  const containerRef   = useRef(null);
  const containerWidth = useContainerWidth(containerRef);
  const isMobile       = containerWidth > 0 && containerWidth < 640;

  const enriched = useMemo(() =>
    items.map((item) => ({ ...item, _aspect: parseRatio(item.ratio) })),
    [items]
  );

  // Précharge toutes les images lightbox dès le montage
  useEffect(() => {
    enriched.forEach((item) => {
      if (item.type !== "image") return;
      const img = new Image();
      img.src = getImageSrc(item, 1800);
    });
  }, [enriched]);

  const rowHeight   = isMobile ? ROW_HEIGHT_MOB : ROW_HEIGHT;
  const targetRatio = useMemo(() => {
    if (!containerWidth) return 3;
    return (containerWidth - GAP) / rowHeight;
  }, [containerWidth, rowHeight]);

  const rows = useMemo(
    () => (enriched.length && containerWidth ? buildRows(enriched, targetRatio) : []),
    [enriched, targetRatio, containerWidth]
  );

  const [lightboxIdx, setLightboxIdx] = useState(null);
  const open  = useCallback((item) => setLightboxIdx(enriched.findIndex((i) => i.id === item.id)), [enriched]);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev  = useCallback(() => setLightboxIdx((i) => (i - 1 + enriched.length) % enriched.length), [enriched.length]);
  const next  = useCallback(() => setLightboxIdx((i) => (i + 1) % enriched.length), [enriched.length]);

  return (
    <>
      <style>{CSS}</style>

      <div className="gallery-root" ref={containerRef}>
        {containerWidth > 0
          ? rows.map((row, ri) => {
              const availableW = containerWidth - GAP * (row.items.length - 1);
              const scale      = availableW / row.sumRatios;
              return (
                <div key={ri} className="gallery-row">
                  {row.items.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      width={Math.round(item._aspect * scale)}
                      height={rowHeight}
                      onClick={open}
                    />
                  ))}
                </div>
              );
            })
          : <div style={{ height: rowHeight, background: "#1e1e1e" }} />
        }
      </div>

      <Lightbox
        item={lightboxIdx !== null ? enriched[lightboxIdx] : null}
        items={enriched}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #141414;
    --surface: #1e1e1e;
    --border:  #2a2a2a;
    --accent:  #c9a84c;
    --ease:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .gallery-root { background: var(--bg); }

  .gallery-row {
    display: flex;
    gap: ${GAP}px;
    margin-bottom: ${GAP}px;
  }
  .gallery-row:last-child { margin-bottom: 0; }

  .card {
    position: relative;
    overflow: hidden;
    background: var(--surface);
    cursor: pointer;
    outline: none;
    flex-shrink: 0;
  }
  .card:focus-visible { box-shadow: 0 0 0 2px var(--accent); }

  .card img, .card video, .card iframe {
    position: absolute;
    inset: 0; width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s var(--ease), opacity 0.35s ease;
  }
  .card:hover img,
  .card:hover video { transform: scale(1.04); }

  .skeleton {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--surface) 25%, #242424 50%, var(--surface) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    z-index: 1;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.35s var(--ease);
    pointer-events: none; z-index: 2;
  }
  .overlay.visible { opacity: 1; }

  /* ── Lightbox — z-index très élevé pour passer au-dessus du header ── */
  .lightbox {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.93);
    backdrop-filter: blur(12px);
    z-index: 51;           /* ← au-dessus de tout */
    display: flex; align-items: center; justify-content: center;
    animation: lbIn 0.2s ease;
  }
  @keyframes lbIn { from { opacity: 0; } to { opacity: 1; } }

  .lb-content {
    position: relative;
    z-index: 52;          /* ← au-dessus de la lightbox elle-même */
    max-width: 90vw; max-height: 90vh;
    display: flex; align-items: center; justify-content: center;
    animation: lbScale 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes lbScale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .lb-content img, .lb-content video, .lb-content iframe {
    max-width: 100%; max-height: 90vh;
    object-fit: contain; display: block;
  }
  .lb-content video { background: #000; min-width: 280px; }

  .lb-close {
    position: fixed; top: 18px; right: 22px;
    background: transparent;
    border: 1px solid var(--border); color: #e8e4dc;
    font-size: 1rem; width: 38px; height: 38px;
    border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    z-index: 53;          /* ← au-dessus de tout le reste */
  }
  .lb-close:hover { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.4); }

  .lb-nav {
    position: fixed; top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border); color: #e8e4dc;
    font-size: 2rem; width: 46px; height: 68px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
    z-index: 53;          /* ← même niveau que lb-close */
    line-height: 1;
  }
  .lb-nav:hover { background: rgba(255,255,255,0.13); }
  .lb-prev { left: 12px;  border-radius: 0 4px 4px 0; }
  .lb-next { right: 12px; border-radius: 4px 0 0 4px; }

  @media (max-width: 479px) {
    .lb-nav { width: 34px; height: 52px; font-size: 1.4rem; }
    .lb-prev { left: 4px; }
    .lb-next { right: 4px; }
  }
`;
