import Link from 'next/link';
import {
  Camera,
  Code2,
  Search,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
} from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import LiveMetrics from '@/components/LiveMetrics';
import TrustBadges from '@/components/TrustBadges';

// ─── Features ────────────────────────────────────────────────────────────────

const features = [
  {
    Icon: Code2,
    title: 'Automatic Metadata Embedding',
    description:
      'Every image you upload gets your copyright information baked in via EXIF/IPTC tags — automatically, every time.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    Icon: Search,
    title: 'Infringement Detection',
    description:
      'We scan the web continuously for unauthorized uses of your images and alert you the moment something is found.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    Icon: Globe,
    title: 'License Management',
    description:
      'Issue and track licenses directly from your dashboard. Know exactly who is using your images and on what terms.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    Icon: Zap,
    title: 'Instant Export',
    description:
      'Export full metadata reports as CSV at any time. Perfect for insurance claims, legal action, or portfolio audits.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    Icon: Camera,
    title: 'Bulk Processing',
    description:
      'Upload hundreds of images at once and apply your copyright profile to every file in a single click.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    Icon: CheckCircle2,
    title: 'Industry Standard',
    description:
      'Compatible with Lightroom, Photoshop, Capture One, and every major tool — your metadata travels with the file.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

// ─── Pricing ─────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For photographers just getting started.',
    features: [
      '50 images / month',
      'Metadata embedding',
      'Basic export (JPEG)',
      'Community support',
    ],
    cta: 'Get started free',
    href: '/settings',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Everything you need to protect your livelihood.',
    features: [
      'Unlimited images',
      'Infringement monitoring',
      'License management',
      'CSV export',
      'Priority support',
      'Batch processing',
    ],
    cta: 'Start free trial',
    href: '/settings',
    highlighted: true,
  },
  {
    name: 'Studio',
    price: '$39',
    period: 'per month',
    description: 'For agencies and multi-photographer studios.',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    href: '/settings',
    highlighted: false,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            PixelShield
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block transition"
            >
              Pricing
            </a>
            <Link
              href="/settings"
              className="text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-28 px-4 sm:px-6">
          {/* Background blobs */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-50 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-40 blur-3xl pointer-events-none"
          />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
              <Zap size={14} className="fill-indigo-600 text-indigo-600" />
              Automatic copyright protection for every image
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Your photos deserve{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                real protection
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              PixelShield automatically embeds your copyright metadata into every
              image you upload — and monitors the web for unauthorized use. Set
              it up once, protect your work forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 active:scale-[0.98] transition shadow-lg shadow-indigo-200"
              >
                Start protecting for free
                <ArrowRight size={18} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-base hover:bg-gray-50 transition"
              >
                See how it works
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              No credit card required &middot; 50 images free forever
            </p>
          </div>
        </section>

        {/* ── Live Metrics ── */}
        <section className="py-14 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
              Live platform metrics
            </p>
            <LiveMetrics />
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="py-20 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to protect your craft
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                From metadata embedding to infringement detection, we handle the
                technical side so you can focus on shooting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ Icon, title, description, color, bg }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
                    <Icon size={22} className={color} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Trusted by photographers worldwide
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Join thousands of photographers who have already made PixelShield
                part of their workflow.
              </p>
            </div>

            <TestimonialsCarousel />
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="py-20 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Simple, honest pricing
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Start free and upgrade when you need more. No hidden fees, no
                annual commitment required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 border ${
                    plan.highlighted
                      ? 'bg-indigo-600 border-indigo-600 shadow-2xl shadow-indigo-200 scale-105'
                      : 'bg-white border-gray-200 shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-wide">
                      Most popular
                    </div>
                  )}

                  <p
                    className={`text-sm font-semibold mb-2 ${
                      plan.highlighted ? 'text-indigo-200' : 'text-indigo-600'
                    }`}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.highlighted ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-indigo-200' : 'text-gray-400'
                      }`}
                    >
                      /{plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-6 ${
                      plan.highlighted ? 'text-indigo-200' : 'text-gray-500'
                    }`}
                  >
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2
                          size={16}
                          className={`mt-0.5 shrink-0 ${
                            plan.highlighted
                              ? 'text-indigo-300'
                              : 'text-indigo-600'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            plan.highlighted ? 'text-indigo-100' : 'text-gray-600'
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`block text-center px-6 py-3 rounded-xl font-semibold text-sm transition ${
                      plan.highlighted
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Badges ── */}
        <section className="py-16 px-4 sm:px-6 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
              Security &amp; compliance
            </p>
            <TrustBadges />
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-indigo-600 to-violet-700">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to protect your work?
            </h2>
            <p className="text-indigo-200 text-lg mb-8">
              Join photographers who trust PixelShield to keep their images safe.
              Start free — no credit card required.
            </p>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 active:scale-[0.98] transition shadow-xl"
            >
              Get started for free
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 sm:px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-bold text-white">PixelShield</span>
          <p>&copy; {new Date().getFullYear()} PixelShield. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
