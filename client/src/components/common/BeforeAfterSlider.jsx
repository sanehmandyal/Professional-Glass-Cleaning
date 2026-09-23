import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Cleaning / Repair',
  afterLabel = 'After Professional Finish',
  title = 'Interactive Before & After Comparison',
  isDemo = true,
  className = '',
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // High quality realistic images for the comparison if not provided
  const fallbackBefore = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'; // Dusty window pane
  const fallbackAfter = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80'; // Sparkling squeegee clean window

  const currentBefore = beforeImage || fallbackBefore;
  const currentAfter = afterImage || fallbackAfter;

  return (
    <div className={`glass-panel p-4 sm:p-6 rounded-2xl ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-lg text-navy-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Drag slider left or right to inspect the visual transformation.
          </p>
        </div>
        {isDemo && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Sample Visualization
          </span>
        )}
      </div>

      {/* Comparison Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-200 shadow-inner"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Full background) */}
        <img
          src={currentAfter}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-lg text-xs font-bold bg-navy-900/80 text-white backdrop-blur-md shadow-sm pointer-events-none">
          {afterLabel}
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={currentBefore}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            loading="lazy"
          />
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md shadow-sm pointer-events-none">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Divider Line & Thumb */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-white text-navy-900 shadow-glass-lg border-2 border-brand-500 flex items-center justify-center cursor-ew-resize transition-transform hover:scale-110 active:scale-95">
            <ArrowLeftRight className="w-4 h-4 text-brand-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
