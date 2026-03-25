'use client';

import { ROUTE } from '@/lib/data';
import { addCheckIn, isCheckedIn, getCheckIns } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CheckInPage() {
  const params = useParams();
  const stopId = parseInt(params.id as string);
  const stop = ROUTE.stops.find(s => s.id === stopId);
  const [wasAlreadyCheckedIn, setWasAlreadyCheckedIn] = useState(false);
  const [checkInComplete, setCheckInComplete] = useState(false);
  const [totalCheckedIn, setTotalCheckedIn] = useState(0);

  useEffect(() => {
    if (stop) {
      const alreadyChecked = isCheckedIn(stop.id);
      setWasAlreadyCheckedIn(alreadyChecked);

      if (!alreadyChecked) {
        // Get user location if available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              addCheckIn(stop.id, position.coords.latitude, position.coords.longitude);
              setCheckInComplete(true);
              setTotalCheckedIn(getCheckIns().length);
              triggerCelebration();
            },
            () => {
              // Location denied, check in without coordinates
              addCheckIn(stop.id);
              setCheckInComplete(true);
              setTotalCheckedIn(getCheckIns().length);
              triggerCelebration();
            }
          );
        } else {
          // No geolocation support
          addCheckIn(stop.id);
          setCheckInComplete(true);
          setTotalCheckedIn(getCheckIns().length);
          triggerCelebration();
        }
      } else {
        setTotalCheckedIn(getCheckIns().length);
      }
    }
  }, [stop]);

  const triggerCelebration = () => {
    // Fire confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#C9A84C', '#8B1A1A', '#F5F3ED']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#C9A84C', '#8B1A1A', '#F5F3ED']
      });
    }, 250);
  };

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

  const allComplete = totalCheckedIn === ROUTE.stops.length;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {wasAlreadyCheckedIn ? (
          <>
            <div className="text-6xl mb-6">✅</div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mb-4">
              Already Checked In
            </h1>
            <p className="text-[var(--color-ivory)]/80 mb-8">
              You've already visited {stop.name}
            </p>
          </>
        ) : checkInComplete ? (
          <>
            <motion.div
              initial={{ scale: 1.5, rotate: -5, opacity: 0.5 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="text-8xl mb-6 stamp-animation"
            >
              {stop.stampIcon}
            </motion.div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white mb-4">
              Checked In!
            </h1>
            <p className="text-[var(--color-ivory)]/80 mb-2 text-lg">
              {stop.name}
            </p>
            <div className="text-[var(--color-gold)] font-semibold mb-8">
              You're {totalCheckedIn} of {ROUTE.stops.length} stops done
            </div>

            {allComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[var(--color-gold)]/20 border-2 border-[var(--color-gold)] rounded-lg p-6 mb-8"
              >
                <div className="text-4xl mb-3">🎉</div>
                <div className="text-[var(--color-gold)] font-bold text-2xl mb-2">
                  Crawl Complete!
                </div>
                <div className="text-[var(--color-ivory)]/80">
                  You've visited all stops on the route!
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <div className="text-6xl mb-6 animate-pulse">⏳</div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mb-4">
              Checking you in...
            </h1>
          </>
        )}

        <div className="space-y-3">
          <Link
            href="/passport"
            className="block w-full bg-gradient-to-r from-[var(--color-gold)] to-[#d4b962] text-[var(--color-navy)] font-bold text-lg py-4 rounded-lg text-center shadow-lg hover:shadow-[var(--shadow-glow)] transition-all"
          >
            View Your Passport
          </Link>
          <Link
            href="/map"
            className="block w-full bg-[var(--color-surface)] border border-[var(--color-gold)]/30 text-white font-semibold py-3 rounded-lg text-center hover:border-[var(--color-gold)] transition-all"
          >
            Back to Map
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
