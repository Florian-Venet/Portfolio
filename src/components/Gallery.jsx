import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import cld from "../lib/cloudinary";
import { auto } from "@cloudinary/url-gen/actions/resize";

// ─── Constantes ───────────────────────────────────────────────────────────────
const ROW_HEIGHT        = 380;
const ROW_HEIGHT_MOBILE = 150;
const GAP               = 6;

// ─── Utilitaires ──────────────────────────────────────────────────────────────
function getImageSrc(item, width = 1200) {
  if (item.cloudinaryId) {
    return `https://res.cloudinary.com/di0mcchgn/image/upload/f_auto,q_auto,w_${width},c_limit/${item.cloudinaryId}`;
  }
  return item.src;
}

function buildRows(items, targetRatio) {
  const rows = [];
  let current = [];
  let sumRatios = 0;

  items.forEach((item) => {
    const r = item._aspect || 1;
    current.push(item);
    sumRatios += r;
    if (sumRatios >= targetRatio) {
      rows.push({ items: current, sumRatios, incomplete: false });
      current = [];
      sumRatios = 0;
    }
  });

  if (current.length > 0) {
    rows.push({ items: current, sumRatios, incomplete: true });
  }

  return rows;
}

function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

// ─── AspectProbe ──────────────────────────────────────────────────────────────
function AspectProbe({ items, onReady }) {
  const done = useRef(new Map());
  const total = items.length;

  const register = useCallback((id, w, h) => {
    if (w && h) done.current.set(id, w / h);
    if (done.current.size >= total) onReady(new Map(done.current));
  }, [total, onReady]);

  return (
    <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
      {items.map((item) => {
        if (item.ratio) {
          setTimeout(() => register(item.id, item.ratio, 1), 0);
          return null;
        }
        if (item.type === "image") {
          return (
            <img
              key={item.id}
              src={getImageSrc(item)}
              alt=""
              onLoad={(e) => register(item.id, e.target.naturalWidth, e.target.naturalHeight)}
            />
          );
        }
        if (item.type === "video") {
          return (
            <video
              key={item.id}
              src={item.src}
              preload="metadata"
              muted
              playsInline
              onLoadedMetadata={(e) => register(item.id, e.target.videoWidth, e.target.videoHeight)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

// ─── MediaCard ────────────────────────────────────────────────────────────────
function MediaCard({ item, width, height, onClick }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) videoRef.current?.play().catch(() => {});
        else videoRef.current?.pause();
      },
      { threshold: 0.3 }
    );
    obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, [item.type]);

  return (
    <div
      className="card"
      style={{ width, height }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(item)}
      aria-label={item.alt || item.label}
    >
      {!loaded && <div className="skeleton" />}

      {item.type === "image" ? (
        <img
          src={getImageSrc(item, Math.round(width))}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}

      <div className={`overlay${hovered ? " visible" : ""}`} />
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose, onPrev, onNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (item?.type === "video") videoRef.current?.play().catch(() => {});
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lb-close" onClick={onClose} aria-label="Fermer">✕</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Précédent">‹</button>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Suivant">›</button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        {item.type === "image"
          ? <img src={getImageSrc(item)} alt={item.alt} />
          : <video ref={videoRef} src={item.src} controls loop playsInline />}
      </div>
    </div>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
export default function Gallery({ items = [] }) {
  const containerRef = useRef(null);
  const containerWidth = useContainerWidth(containerRef);
  const isMobile = containerWidth > 0 && containerWidth < 640;

  const [aspects, setAspects] = useState(new Map());
  const handleReady = useCallback((map) => setAspects(map), []);

  const enriched = useMemo(() =>
    items.map((item) => ({
      ...item,
      _aspect: item.ratio || aspects.get(item.id) || 1,
    })),
    [items, aspects]
  );

  const rowHeight = isMobile ? ROW_HEIGHT_MOBILE : ROW_HEIGHT;
  const targetRatio = containerWidth > 0
    ? (containerWidth + GAP) / (rowHeight + GAP)
    : 5;

  const rows = useMemo(() => buildRows(enriched, targetRatio), [enriched, targetRatio]);

  const [lightboxIdx, setLightboxIdx] = useState(null);
  const open  = useCallback((item) => setLightboxIdx(items.findIndex((i) => i.id === item.id)), [items]);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev  = useCallback(() => setLightboxIdx((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next  = useCallback(() => setLightboxIdx((i) => (i + 1) % items.length), [items.length]);

  return (
    <>
      <style>{CSS}</style>
      <div className="gallery-root" ref={containerRef} style={{ position: "relative" }}>
        <AspectProbe items={items} onReady={handleReady} />

        {containerWidth > 0 && rows.map((row, ri) => {
          const availableWidth = containerWidth - GAP * (row.items.length - 1);
          const actualHeight = row.incomplete
            ? Math.min(availableWidth / row.sumRatios, rowHeight)
            : availableWidth / row.sumRatios;

          return (
            <div key={ri} className="gallery-row">
              {row.items.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  width={item._aspect * actualHeight}
                  height={actualHeight}
                  onClick={open}
                />
              ))}
            </div>
          );
        })}
      </div>

      <Lightbox
        item={lightboxIdx !== null ? items[lightboxIdx] : null}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}

// ─── Styles (inchangés) ───────────────────────────────────────────────────────
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
    flex-direction: row;
    gap: ${GAP}px;
    margin-bottom: ${GAP}px;
    overflow: hidden;
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

  .card img,
  .card video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s var(--ease), opacity 0.35s ease;
  }
  .card:hover img,
  .card:hover video { transform: scale(1.04); }

  .skeleton {
    position: absolute;
    inset: 0;
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
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.35s var(--ease);
    pointer-events: none;
    z-index: 2;
  }
  .overlay.visible { opacity: 1; }

  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.93);
    backdrop-filter: blur(12px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lbIn 0.2s ease;
  }
  @keyframes lbIn { from { opacity: 0; } to { opacity: 1; } }

  .lb-content {
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lbScale 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes lbScale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .lb-content img,
  .lb-content video {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    display: block;
  }
  .lb-content video { background: #000; min-width: 280px; }

  .lb-close {
    position: fixed;
    top: 18px; right: 22px;
    background: transparent;
    border: 1px solid var(--border);
    color: #e8e4dc;
    font-size: 1rem;
    width: 38px; height: 38px;
    border-radius: 50%;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    z-index: 10000;
  }
  .lb-close:hover { background: var(--accent); color: #000; border-color: var(--accent); }

  .lb-nav {
    position: fixed;
    top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    color: #e8e4dc;
    font-size: 2rem;
    width: 46px; height: 68px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
    z-index: 10000;
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
