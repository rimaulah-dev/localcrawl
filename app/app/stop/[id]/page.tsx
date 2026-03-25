'use client';

import { ROUTE } from '@/lib/data';
import { getDirectionsUrl, isStopOpen, isCheckedIn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function StopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const stopId = parseInt(params.id as string);
  const stop = ROUTE.stops.find(s => s.id === stopId);

  const [checked, setChecked] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (stop) {
      setChecked(isCheckedIn(stop.id));
    }
  }, [stop]);

  if (!stop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Stop not found</h1>
          <Link href="/" className="text-[var(--color-gold)] hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const prevStop = ROUTE.stops.find(s => s.id === stop.id - 1);
  const nextStop = ROUTE.stops.find(s => s.id === stop.id + 1);
  const isOpen = isStopOpen(stop.hours);
  const checkInUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/checkin/${stop.id}`
    : '';

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-gold)]/20 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="text-[var(--color-gold)] hover:text-[var(--color-ivory)] transition-colors"
          >
            ← Back
          </button>
          <div className="text-sm text-[var(--color-ivory)]/60">
            Stop {stop.id} of {ROUTE.stops.length}
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Stop Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4"
            style={{ borderColor: stop.color, backgroundColor: `${stop.color}20` }}
          >
            {stop.stampIcon}
          </div>
        </motion.div>

        {/* Stop Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between mb-2">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
              {stop.name}
            </h1>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: `${stop.color}20`, color: stop.color }}
            >
              {stop.category}
            </span>
          </div>
          <p className="text-[var(--color-ivory)]/80 text-lg mb-4">
            {stop.subtitle}
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--color-ivory)]/60">
            <span>📍</span>
            <span>{stop.address}</span>
          </div>
        </motion.div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[var(--color-surface)] rounded-lg p-4 mb-6 border border-[var(--color-gold)]/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[var(--color-ivory)]/60 text-sm mb-1">Hours</div>
              <div className="text-white font-medium">{stop.hours}</div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isOpen
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {isOpen ? 'Open Now' : 'Closed'}
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white mb-3">
            About This Stop
          </h2>
          <p className="text-[var(--color-ivory)]/90 leading-relaxed mb-4">
            {stop.description}
          </p>
          <div className="bg-[var(--color-gold)]/10 border-l-4 border-[var(--color-gold)] p-4 rounded">
            <div className="text-[var(--color-gold)] font-semibold text-sm mb-1">
              💡 Insider Tip
            </div>
            <p className="text-[var(--color-ivory)]/80 italic">
              {stop.tip}
            </p>
          </div>
        </motion.div>

        {/* Check-in Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          {checked ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <div className="text-green-400 font-semibold text-lg mb-2">
                Checked In!
              </div>
              <div className="text-[var(--color-ivory)]/70 text-sm">
                You've visited this stop
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-gold)] text-[var(--color-gold)] font-bold py-4 rounded-lg hover:bg-[var(--color-gold)]/10 transition-all"
              >
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </button>

              {showQR && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-lg flex flex-col items-center"
                >
                  <QRCodeSVG value={checkInUrl} size={200} />
                  <p className="text-[var(--color-navy)] text-sm mt-4 text-center">
                    Scan this QR code to check in at this stop
                  </p>
                </motion.div>
              )}

              <Link
                href={`/checkin/${stop.id}`}
                className="block w-full bg-gradient-to-r from-[var(--color-gold)] to-[#d4b962] text-[var(--color-navy)] font-bold text-lg py-4 rounded-lg text-center shadow-lg hover:shadow-[var(--shadow-glow)] transition-all"
              >
                I'm Here — Check In
              </Link>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-3"
        >
          <a
            href={getDirectionsUrl(stop)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--color-surface)] border border-[var(--color-gold)]/30 text-white font-semibold py-3 rounded-lg text-center hover:border-[var(--color-gold)] transition-all"
          >
            🧭 Get Directions
          </a>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex gap-4 mt-8 pt-8 border-t border-[var(--color-gold)]/20"
        >
          {prevStop ? (
            <Link
              href={`/stop/${prevStop.id}`}
              className="flex-1 bg-[var(--color-surface)] border border-[var(--color-gold)]/20 rounded-lg p-4 hover:border-[var(--color-gold)]/50 transition-all"
            >
              <div className="text-[var(--color-ivory)]/60 text-xs mb-1">← Previous</div>
              <div className="text-white font-semibold text-sm">{prevStop.name}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextStop ? (
            <Link
              href={`/stop/${nextStop.id}`}
              className="flex-1 bg-[var(--color-surface)] border border-[var(--color-gold)]/20 rounded-lg p-4 hover:border-[var(--color-gold)]/50 transition-all text-right"
            >
              <div className="text-[var(--color-ivory)]/60 text-xs mb-1">Next →</div>
              <div className="text-white font-semibold text-sm">{nextStop.name}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
