'use client';

import { ROUTE } from '@/lib/data';
import { getCheckIns } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [checkInCount, setCheckInCount] = useState(0);

  useEffect(() => {
    setCheckInCount(getCheckIns().length);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={ROUTE.heroImage}
          alt={ROUTE.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[var(--color-navy)]" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {ROUTE.name}
            </h1>
            <p className="text-[var(--color-gold)] text-lg italic mb-4">
              {ROUTE.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Route Info */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mb-6"
        >
          <div className="flex-1 bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-gold)]/20">
            <div className="text-[var(--color-gold)] text-sm font-medium mb-1">Duration</div>
            <div className="text-white font-semibold">{ROUTE.duration}</div>
          </div>
          <div className="flex-1 bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-gold)]/20">
            <div className="text-[var(--color-gold)] text-sm font-medium mb-1">Distance</div>
            <div className="text-white font-semibold">{ROUTE.distance}</div>
          </div>
          <div className="flex-1 bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-gold)]/20">
            <div className="text-[var(--color-gold)] text-sm font-medium mb-1">Theme</div>
            <div className="text-white font-semibold text-sm">{ROUTE.theme}</div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-[var(--color-ivory)]/90 leading-relaxed mb-6">
            Discover the heart of Kuala Lumpur through five carefully curated stops that blend heritage charm with contemporary culture. From specialty coffee in restored shophouses to street art alleys and Malaysia's iconic skyscraper, this route captures the spirit of old and new KL.
          </p>
        </motion.div>

        {/* Stamp Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-white mb-4">
            Collect Your Stamps
          </h2>
          <div className="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-gold)]/30">
            <div className="flex justify-between items-center mb-4">
              {ROUTE.stops.map((stop) => (
                <div
                  key={stop.id}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
                      checkInCount >= stop.id
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                        : 'border-[var(--color-ivory)]/20 bg-[var(--color-navy)]'
                    }`}
                  >
                    {checkInCount >= stop.id ? stop.stampIcon : '○'}
                  </div>
                  <div className="text-[10px] text-[var(--color-ivory)]/60 mt-2 text-center">
                    Stop {stop.id}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-[var(--color-gold)]">
              {checkInCount} of {ROUTE.stops.length} stops collected
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/map"
            className="block w-full bg-gradient-to-r from-[var(--color-gold)] to-[#d4b962] text-[var(--color-navy)] font-bold text-lg py-4 rounded-lg text-center shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Start Crawl →
          </Link>
        </motion.div>

        {/* Stops List Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-white mb-4">
            The Route
          </h2>
          <div className="space-y-4">
            {ROUTE.stops.map((stop) => (
              <Link
                key={stop.id}
                href={`/stop/${stop.id}`}
                className="block bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-gold)]/20 hover:border-[var(--color-gold)]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 border-2"
                    style={{ borderColor: stop.color }}
                  >
                    {stop.stampIcon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-white">{stop.name}</h3>
                      <span className="text-xs text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-1 rounded">
                        {stop.category}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-ivory)]/70 line-clamp-2">
                      {stop.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
