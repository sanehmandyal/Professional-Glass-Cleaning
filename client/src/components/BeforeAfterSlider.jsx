import { useRef, useState } from 'react';

// Simple drag-to-reveal before/after comparison slider.
// beforeSrc/afterSrc should be image URLs supplied via the admin gallery.
const BeforeAfterSlider = ({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none shadow-glass"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeSrc} alt={beforeLabel} className="h-full w-full object-cover" style={{ width: containerRef.current?.offsetWidth || '100%' }} />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <div className="h-9 w-9 rounded-full bg-white shadow-glass-lg flex items-center justify-center text-navy-900 text-xs font-bold -ml-4">
          ↔
        </div>
      </div>
      <span className="absolute top-3 left-3 bg-navy-950/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 bg-skyline-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        {afterLabel}
      </span>
    </div>
  );
};

export default BeforeAfterSlider;
