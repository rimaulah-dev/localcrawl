import { CheckIn, Stop } from './types';

const STORAGE_KEY = 'localcrawl_checkins';

export function getCheckIns(): CheckIn[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addCheckIn(stopId: number, lat?: number, lng?: number): CheckIn {
  const checkIn: CheckIn = {
    stopId,
    timestamp: new Date().toISOString(),
    lat,
    lng,
  };

  const checkIns = getCheckIns();
  // Remove any existing check-in for this stop
  const filtered = checkIns.filter(c => c.stopId !== stopId);
  filtered.push(checkIn);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  return checkIn;
}

export function isCheckedIn(stopId: number): boolean {
  return getCheckIns().some(c => c.stopId === stopId);
}

export function getCheckInForStop(stopId: number): CheckIn | undefined {
  return getCheckIns().find(c => c.stopId === stopId);
}

export function getCompletionPercentage(totalStops: number): number {
  const checkIns = getCheckIns();
  return Math.round((checkIns.length / totalStops) * 100);
}

export function isStopOpen(hours: string): boolean {
  // Simple check for "Open access" or 24/7 style
  if (hours.toLowerCase().includes('open access')) return true;

  // Parse hours like "8am – 6pm daily" or "11am – 8pm (Tue–Sun)"
  // This is a simplified version - assumes MYT timezone (UTC+8)
  const now = new Date();
  const currentHour = now.getUTCHours() + 8; // Convert to MYT
  const currentDay = now.getUTCDay();

  // Check for day restrictions
  if (hours.includes('Tue–Sun') || hours.includes('Tue-Sun')) {
    if (currentDay === 1) return false; // Monday
  }

  // Extract hours (simple pattern matching)
  const match = hours.match(/(\d+)(am|pm)\s*[–-]\s*(\d+)(am|pm)/i);
  if (!match) return true; // If we can't parse, assume open

  let openHour = parseInt(match[1]);
  const openPeriod = match[2].toLowerCase();
  let closeHour = parseInt(match[3]);
  const closePeriod = match[4].toLowerCase();

  // Convert to 24-hour
  if (openPeriod === 'pm' && openHour !== 12) openHour += 12;
  if (openPeriod === 'am' && openHour === 12) openHour = 0;
  if (closePeriod === 'pm' && closeHour !== 12) closeHour += 12;
  if (closePeriod === 'am' && closeHour === 12) closeHour = 0;

  const adjustedCurrentHour = currentHour >= 24 ? currentHour - 24 : currentHour;

  return adjustedCurrentHour >= openHour && adjustedCurrentHour < closeHour;
}

export function formatCheckInTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function getDirectionsUrl(stop: Stop): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}&travelmode=walking`;
}
