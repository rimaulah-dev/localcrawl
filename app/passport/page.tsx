'use client';

import { ROUTE } from '@/lib/data';
import { getCheckIns, getCheckInForStop, formatCheckInTime } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function PassportPage() {
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  useEffect(() => {
    setCheckIns(getCheckIns());
  }, []);

  const completionPercentage = Math.round((checkIns.length / ROUTE.stops.length) * 100);
  const isComplete = checkIns.length === ROUTE.stops.length;

  useEffect(() => {
    if (isComplete) {
      // Subtle celebration for viewing completed passport
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#8B1A1A', '#F5F3ED']
      });
    }
  }, [isComplete]);

  const handleShare = async () => {
    const shareText = `I just completed the "${ROUTE.name}" walking tour in Kuala Lumpur! ${checkIns.length}/${ROUTE.stops.length} stops visited. 🎉 #LocalCrawl #KualaLumpur`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LocalCrawl - My Journey',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white mb-2">
          Your Journey
        </h1>
        <p className="text-[var(--color-ivory)]/70">
          {ROUTE.name} • Kuala Lumpur
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-gold)]/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[var(--color-ivory)]/60 text-sm mb-1">Progress</div>
              <div className="text-3xl font-bold text-white">
                {checkIns.length} / {ROUTE.stops.length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[var(--color-gold)] text-4xl font-bold">
                {completionPercentage}%
              </div>
              <div className="text-[var(--color-ivory)]/60 text-sm">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[var(--color-navy)] rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[var(--color-gold)] to-[#d4b962] rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Completion Badge */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-crimson)]/20 border-2 border-[var(--color-gold)] rounded-lg p-6 text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mb-2">
            Crawl Complete!
          </h2>
          <p className="text-[var(--color-ivory)]/80 mb-6">
            You've visited all stops on the Old Soul, New City route
          </p>
          <button
            onClick={handleShare}
            className="bg-[var(--color-gold)] text-[var(--color-navy)] font-bold px-6 py-3 rounded-lg hover:shadow-[var(--shadow-glow)] transition-all"
          >
            Share Your Achievement
          </button>
          {showShareSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm mt-2"
            >
              ✓ Copied to clipboard!
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Stamps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-white mb-4">
          Your Stamps
        </h2>
        <div className="space-y-4">
          {ROUTE.stops.map((stop, index) => {
            const checkIn = getCheckInForStop(stop.id);
            const isChecked = !!checkIn;

            return (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={`/stop/${stop.id}`}
                  className={`block rounded-lg p-5 border-2 transition-all ${
                    isChecked
                      ? 'bg-[var(--color-surface)] border-[var(--color-gold)] hover:border-[var(--color-gold)]/70'
                      : 'bg-[var(--color-navy)] border-[var(--color-ivory)]/10 hover:border-[var(--color-ivory)]/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 flex-shrink-0 transition-all ${
                        isChecked
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 stamp-animation'
                          : 'border-[var(--color-ivory)]/20 bg-[var(--color-navy)]'
                      }`}
                      style={isChecked ? {} : { filter: 'grayscale(100%) opacity(0.3)' }}
                    >
                      {isChecked ? stop.stampIcon : '○'}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold ${isChecked ? 'text-white' : 'text-[var(--color-ivory)]/40'}`}>
                          {stop.name}
                        </h3>
                        {isChecked && (
                          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded flex-shrink-0">
                            ✓ Visited
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mb-1 ${isChecked ? 'text-[var(--color-ivory)]/70' : 'text-[var(--color-ivory)]/30'}`}>
                        {stop.category}
                      </p>
                      {checkIn && (
                        <p className="text-xs text-[var(--color-gold)]">
                          {formatCheckInTime(checkIn.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <Link
            href="/map"
            className="block w-full bg-gradient-to-r from-[var(--color-gold)] to-[#d4b962] text-[var(--color-navy)] font-bold text-lg py-4 rounded-lg text-center shadow-lg hover:shadow-[var(--shadow-glow)] transition-all"
          >
            Continue Your Journey →
          </Link>
        </motion.div>
      )}
    </div>
  );
}
