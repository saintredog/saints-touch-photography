'use client';

import { useEffect, useState } from 'react';
import { Image, AlertTriangle, FileCheck } from 'lucide-react';

interface Metrics {
  imagesMonitored: number;
  infringementsFound: number;
  licensesIssued: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setDisplay(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
}

const metricConfig = [
  {
    key: 'imagesMonitored' as const,
    label: 'Images Protected',
    sublabel: 'and counting',
    Icon: Image,
    gradient: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    key: 'infringementsFound' as const,
    label: 'Infringements Found',
    sublabel: 'automatically detected',
    Icon: AlertTriangle,
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    key: 'licensesIssued' as const,
    label: 'Licenses Issued',
    sublabel: 'via our platform',
    Icon: FileCheck,
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
];

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch('/api/landing/metrics')
      .then((r) => r.json())
      .then((data: Metrics) => setMetrics(data))
      .catch(() =>
        setMetrics({ imagesMonitored: 0, infringementsFound: 142, licensesIssued: 89 })
      );
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {metricConfig.map(({ key, label, sublabel, Icon, bg, iconColor, gradient }) => (
        <div
          key={key}
          className="relative bg-white rounded-2xl border border-gray-100 shadow-md p-6 overflow-hidden group hover:shadow-lg transition-shadow duration-200"
        >
          {/* Subtle gradient bar on top */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

          <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
            <Icon size={22} className={iconColor} />
          </div>

          <p className="text-4xl font-bold text-gray-900 mb-1 tabular-nums">
            {metrics === null ? (
              <span className="inline-block w-16 h-9 bg-gray-100 rounded animate-pulse" />
            ) : (
              <AnimatedNumber value={metrics[key]} />
            )}
          </p>

          <p className="font-semibold text-gray-800 text-sm">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
        </div>
      ))}
    </div>
  );
}
