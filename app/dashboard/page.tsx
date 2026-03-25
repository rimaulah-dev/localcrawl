'use client';

import { ROUTE } from '@/lib/data';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Demo analytics data
const DEMO_DATA = {
  totalCheckIns: 247,
  uniqueWalkers: 89,
  completionRate: 67,
  popularStop: 'REXKL',
  popularStopVisits: 94,
};

const visitsPerStop = [
  { name: 'Yellow Brick', visits: 89, color: '#C9A84C' },
  { name: 'Kwai Chai Hong', visits: 82, color: '#8B1A1A' },
  { name: 'REXKL', visits: 94, color: '#2D5A8B' },
  { name: 'Bang Bang', visits: 76, color: '#5B3A7E' },
  { name: 'Merdeka 118', visits: 85, color: '#1A7A4A' },
];

const popularHours = [
  { hour: '8am', activity: 12 },
  { hour: '9am', activity: 24 },
  { hour: '10am', activity: 45 },
  { hour: '11am', activity: 38 },
  { hour: '12pm', activity: 28 },
  { hour: '1pm', activity: 22 },
  { hour: '2pm', activity: 48 },
  { hour: '3pm', activity: 42 },
  { hour: '4pm', activity: 35 },
  { hour: '5pm', activity: 52 },
  { hour: '6pm', activity: 38 },
];

const stopByStopBreakdown = [
  { stop: 'Yellow Brick Road', visits: 89, continued: 92 },
  { stop: 'Kwai Chai Hong', visits: 82, continued: 95 },
  { stop: 'REXKL', visits: 94, continued: 81 },
  { stop: 'Bang Bang Vintage', visits: 76, continued: 89 },
  { stop: 'Merdeka 118', visits: 85, continued: 100 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mb-2">
          Route Analytics
        </h1>
        <p className="text-[var(--color-ivory)]/70 text-sm">
          {ROUTE.name} • Live Performance Data
        </p>
        <div className="mt-4 inline-block">
          <button className="text-xs bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)] px-3 py-1.5 rounded hover:bg-[var(--color-gold)]/20 transition-all">
            Business Login →
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-[var(--color-surface)] rounded-lg p-5 border border-[var(--color-gold)]/20">
          <div className="text-[var(--color-ivory)]/60 text-xs uppercase tracking-wide mb-2">
            Total Check-ins
          </div>
          <div className="text-[var(--color-gold)] text-3xl font-bold">
            {DEMO_DATA.totalCheckIns}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-lg p-5 border border-[var(--color-gold)]/20">
          <div className="text-[var(--color-ivory)]/60 text-xs uppercase tracking-wide mb-2">
            Unique Walkers
          </div>
          <div className="text-[var(--color-gold)] text-3xl font-bold">
            {DEMO_DATA.uniqueWalkers}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-lg p-5 border border-[var(--color-gold)]/20">
          <div className="text-[var(--color-ivory)]/60 text-xs uppercase tracking-wide mb-2">
            Completion Rate
          </div>
          <div className="text-[var(--color-gold)] text-3xl font-bold">
            {DEMO_DATA.completionRate}%
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-lg p-5 border border-[var(--color-gold)]/20">
          <div className="text-[var(--color-ivory)]/60 text-xs uppercase tracking-wide mb-2">
            Most Popular
          </div>
          <div className="text-white text-lg font-bold leading-tight">
            {DEMO_DATA.popularStop}
          </div>
          <div className="text-[var(--color-gold)] text-sm">
            {DEMO_DATA.popularStopVisits} visits
          </div>
        </div>
      </motion.div>

      {/* Visits Per Stop Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-gold)]/20 mb-8"
      >
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white mb-4">
          Visits Per Stop
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={visitsPerStop}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1D2E" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#F5F3ED', fontSize: 11 }}
              axisLine={{ stroke: '#1A1D2E' }}
            />
            <YAxis
              tick={{ fill: '#F5F3ED', fontSize: 11 }}
              axisLine={{ stroke: '#1A1D2E' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1D2E',
                border: '1px solid #C9A84C',
                borderRadius: '8px',
                color: '#F5F3ED',
              }}
            />
            <Bar dataKey="visits" radius={[8, 8, 0, 0]}>
              {visitsPerStop.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Popular Hours Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-gold)]/20 mb-8"
      >
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white mb-4">
          Popular Hours
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={popularHours}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1D2E" />
            <XAxis
              dataKey="hour"
              tick={{ fill: '#F5F3ED', fontSize: 10 }}
              axisLine={{ stroke: '#1A1D2E' }}
            />
            <YAxis
              tick={{ fill: '#F5F3ED', fontSize: 11 }}
              axisLine={{ stroke: '#1A1D2E' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1D2E',
                border: '1px solid #C9A84C',
                borderRadius: '8px',
                color: '#F5F3ED',
              }}
            />
            <Bar dataKey="activity" fill="#C9A84C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-[var(--color-ivory)]/60 mt-3 text-center">
          Peak hours: 10am, 2pm, and 5pm
        </p>
      </motion.div>

      {/* Stop-by-Stop Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-gold)]/20 mb-8"
      >
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white mb-4">
          Stop-by-Stop Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-gold)]/20">
                <th className="text-left py-3 px-2 text-[var(--color-ivory)]/60 font-medium">
                  Stop
                </th>
                <th className="text-right py-3 px-2 text-[var(--color-ivory)]/60 font-medium">
                  Visits
                </th>
                <th className="text-right py-3 px-2 text-[var(--color-ivory)]/60 font-medium">
                  Continued
                </th>
              </tr>
            </thead>
            <tbody>
              {stopByStopBreakdown.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[var(--color-gold)]/10 hover:bg-[var(--color-navy)]/50 transition-colors"
                >
                  <td className="py-3 px-2 text-white">{item.stop}</td>
                  <td className="py-3 px-2 text-right text-[var(--color-gold)] font-semibold">
                    {item.visits}
                  </td>
                  <td className="py-3 px-2 text-right text-[var(--color-ivory)]/70">
                    {item.continued}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Demo Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-[var(--color-navy)] border-l-4 border-[var(--color-gold)] rounded p-4"
      >
        <div className="text-[var(--color-gold)] text-sm font-semibold mb-1">
          📊 Demo Data
        </div>
        <p className="text-[var(--color-ivory)]/70 text-xs leading-relaxed">
          This dashboard displays simulated analytics data. Connect your QR check-in points to see live route performance, walker behavior, and engagement metrics for the {ROUTE.name} crawl.
        </p>
      </motion.div>
    </div>
  );
}
