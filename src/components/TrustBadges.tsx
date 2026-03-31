import { Lock, Shield, Globe, Eye } from 'lucide-react';

const badges = [
  {
    Icon: Lock,
    title: 'SSL Encrypted',
    description: 'All data in transit secured with TLS 1.3',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    Icon: Shield,
    title: 'SOC 2 Ready',
    description: 'Security controls built to SOC 2 Type II standards',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    Icon: Globe,
    title: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    Icon: Eye,
    title: 'Privacy First',
    description: 'Your images are never shared or sold — ever',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map(({ Icon, title, description, color, bg, border }) => (
        <div
          key={title}
          className={`flex flex-col items-center text-center p-5 rounded-2xl border ${border} ${bg} hover:shadow-md transition-shadow duration-200`}
        >
          <div
            className={`inline-flex p-3 rounded-xl bg-white shadow-sm mb-3`}
          >
            <Icon size={22} className={color} />
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
          <p className="text-xs text-gray-500 leading-snug">{description}</p>
        </div>
      ))}
    </div>
  );
}
