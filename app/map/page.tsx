'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ROUTE } from '@/lib/data';
import { Stop } from '@/lib/types';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { isCheckedIn, getDirectionsUrl } from '@/lib/utils';

// Load MapView with SSR disabled (Leaflet requires browser APIs)
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--color-navy)]">
      <div className="text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <div className="text-[var(--color-ivory)]/60">Loading map...</div>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  const handleStopSelect = (stop: Stop | null) => {
    setSelectedStop(stop);
    if (stop) {
      setIsSheetExpanded(true);
    }
  };

  return (
    <div className="fixed inset-0 top-0 pb-20">
      {/* Map Container */}
      <div className="absolute inset-0">
        <MapView
          selectedStopId={selectedStop?.id}
          onStopSelect={handleStopSelect}
        />
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={false}
        animate={{
          y: isSheetExpanded && selectedStop ? 0 : selectedStop ? '60%' : '85%'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 bg-[var(--color-surface)] rounded-t-3xl shadow-2xl z-[1000] max-h-[80vh] flex flex-col"
      >
        {/* Handle */}
        <button
          onClick={() => selectedStop && setIsSheetExpanded(!isSheetExpanded)}
          className="w-full py-4 flex justify-center cursor-pointer"
        >
          <div className="w-12 h-1 bg-[var(--color-ivory)]/30 rounded-full" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {selectedStop ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Selected Stop Detail */}
                <div className="mb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 flex-shrink-0"
                      style={{ borderColor: selectedStop.color }}
                    >
                      {selectedStop.stampIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
                          {selectedStop.name}
                        </h2>
                        {isCheckedIn(selectedStop.id) && (
                          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded flex-shrink-0">
                            ✓ Visited
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--color-ivory)]/70 text-sm mb-2">
                        {selectedStop.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-ivory)]/60">
                        <span>📍</span>
                        <span>{selectedStop.address}</span>
                      </div>
                    </div>
                  </div>

                  {isSheetExpanded && (
                    <>
                      <p className="text-[var(--color-ivory)]/80 text-sm leading-relaxed mb-4">
                        {selectedStop.description}
                      </p>

                      <div className="bg-[var(--color-gold)]/10 border-l-4 border-[var(--color-gold)] p-3 rounded mb-4">
                        <div className="text-[var(--color-gold)] font-semibold text-xs mb-1">
                          💡 Insider Tip
                        </div>
                        <p className="text-[var(--color-ivory)]/80 text-xs italic">
                          {selectedStop.tip}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3">
                    <Link
                      href={`/stop/${selectedStop.id}`}
                      className="flex-1 bg-gradient-to-r from-[var(--color-gold)] to-[#d4b962] text-[var(--color-navy)] font-bold py-3 rounded-lg text-center text-sm"
                    >
                      View Details
                    </Link>
                    <a
                      href={getDirectionsUrl(selectedStop)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[var(--color-navy)] border border-[var(--color-gold)]/30 text-white font-semibold py-3 rounded-lg text-center text-sm"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              {/* All Stops List */}
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-4">
                Route Stops
              </h2>
              <div className="space-y-3">
                {ROUTE.stops.map((stop) => {
                  const checked = isCheckedIn(stop.id);
                  return (
                    <button
                      key={stop.id}
                      onClick={() => handleStopSelect(stop)}
                      className="w-full bg-[var(--color-navy)] border border-[var(--color-gold)]/20 rounded-lg p-4 hover:border-[var(--color-gold)]/50 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 flex-shrink-0"
                          style={{ borderColor: stop.color }}
                        >
                          {checked ? stop.stampIcon : stop.id}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-white text-sm">
                              {stop.name}
                            </h3>
                            {checked && (
                              <span className="text-xs text-green-400">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-[var(--color-ivory)]/60">
                            {stop.category}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
