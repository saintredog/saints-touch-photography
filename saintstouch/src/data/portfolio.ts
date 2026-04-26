export interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: 'portraits' | 'events' | 'fashion' | 'couples' | 'hospitality';
  featured: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  // Portraits
  { id: 'p-1', src: '/images/7E9A8458.jpg', alt: 'Portrait', category: 'portraits', featured: true },
  { id: 'p-2', src: '/images/7E9A8500.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-3', src: '/images/7E9A8507.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-4', src: '/images/7E9A8516-2.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-5', src: '/images/_E9A1350.jpg', alt: 'Portrait', category: 'portraits', featured: true },
  { id: 'p-6', src: '/images/_E9A1432.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-7', src: '/images/_E9A1623.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-8', src: '/images/_E9A1610.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-9', src: '/images/_E9A0029.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-10', src: '/images/_E9A0068.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-11', src: '/images/_E9A0158-2.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-12', src: '/images/_E9A0167.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-13', src: '/images/7E9A4069.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-14', src: '/images/7E9A4094.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-15', src: '/images/7E9A4146.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-16', src: '/images/7E9A4117.jpg', alt: 'Portrait', category: 'portraits', featured: true },
  { id: 'p-17', src: '/images/_E9A3687.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-18', src: '/images/_E9A3679.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-19', src: '/images/_E9A3622.jpg', alt: 'Portrait', category: 'portraits', featured: true },
  { id: 'p-20', src: '/images/_E9A3636.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-21', src: '/images/_E9A3563.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-22', src: '/images/_E9A3551.jpg', alt: 'Portrait', category: 'portraits', featured: false },

  // Events
  { id: 'e-1', src: '/images/_E9A0921.jpg', alt: 'Event', category: 'events', featured: true },
  { id: 'e-2', src: '/images/_E9A0928.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-3', src: '/images/_E9A0940.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-4', src: '/images/_E9A0963.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-5', src: '/images/_E9A0981.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-6', src: '/images/_E9A1006.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-7', src: '/images/_E9A1027.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-8', src: '/images/_E9A1032.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-9', src: '/images/events/7E9A9637.jpg', alt: 'Event', category: 'events', featured: true },
  { id: 'e-10', src: '/images/events/7E9A9646.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-11', src: '/images/events/7E9A9651.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-12', src: '/images/events/7E9A9652.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-13', src: '/images/events/7E9A9633.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-14', src: '/images/events/7E9A9665.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-15', src: '/images/events/7E9A9669.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-16', src: '/images/events/7E9A9672.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-17', src: '/images/events/7E9A9674.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-18', src: '/images/events/7E9A9676.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-19', src: '/images/events/7E9A9678.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-20', src: '/images/events/7E9A9680.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-21', src: '/images/events/7E9A9683.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-22', src: '/images/events/7E9A9685.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-23', src: '/images/events/7E9A9696.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-24', src: '/images/IMG_9423.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-25', src: '/images/IMG_9467.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-26', src: '/images/IMG_9474.jpg', alt: 'Event', category: 'events', featured: false },

  // Fashion
  { id: 'f-1', src: '/images/_MG_7856-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: true },
  { id: 'f-2', src: '/images/_MG_8207-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: true },
  { id: 'f-3', src: '/images/_MG_8305-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: false },
  { id: 'f-4', src: '/images/_MG_7992-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: false },
  { id: 'f-5', src: '/images/_MG_8286-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: false },
  { id: 'f-6', src: '/images/_MG_7667-Edit-2.jpg', alt: 'Fashion', category: 'fashion', featured: false },

  // Couples
  { id: 'c-1', src: '/images/couples1.jpeg', alt: 'Couples', category: 'couples', featured: true },
  { id: 'c-2', src: '/images/IMG_2337.jpg', alt: 'Couples', category: 'couples', featured: true },
  { id: 'c-3', src: '/images/IMG_2327.jpg', alt: 'Couples', category: 'couples', featured: false },
  { id: 'c-4', src: '/images/IMG_2256.jpg', alt: 'Couples', category: 'couples', featured: false },

  // Hospitality
  { id: 'h-1', src: '/images/7E9A6687.jpg', alt: 'Hospitality', category: 'hospitality', featured: true },
  { id: 'h-2', src: '/images/hospitality/7E9A5523.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-3', src: '/images/hospitality/7E9A5535.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-4', src: '/images/hospitality/7E9A5608.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-5', src: '/images/hospitality/7E9A5662.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-6', src: '/images/hospitality/7E9A5713.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-7', src: '/images/hospitality/7E9A5721.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-8', src: '/images/hospitality/7E9A6696.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-9', src: '/images/hospitality/7E9A6705.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-10', src: '/images/hospitality/7E9A6711.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-11', src: '/images/hospitality/7E9A9856.jpg', alt: 'Hospitality', category: 'hospitality', featured: true },
  { id: 'h-12', src: '/images/hospitality/7E9A9881.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-13', src: '/images/hospitality/7E9A9884.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-14', src: '/images/hospitality/7E9A9899.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-15', src: '/images/hospitality/7E9A9937.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-16', src: '/images/hospitality/7E9A9942.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-17', src: '/images/hospitality/7E9A9946.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-18', src: '/images/hospitality/7E9A9951.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
];

export interface ServiceTier {
  num: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  featured: boolean;
  badge: string | null;
  features: string[];
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  priceRange: string;
  description: string;
  tiers: ServiceTier[];
}

export const services: Service[] = [
  {
    id: 'portraits',
    icon: '◎',
    name: 'Portraits',
    priceRange: '$325 – $825+',
    description: 'Personal branding, headshots, creative portraits. Clean, cinematic, intentional — tailored to your vision.',
    tiers: [
      {
        num: '01', name: 'The Essential Session', tagline: 'The Gateway Package',
        price: '$325', priceSuffix: ' – 425', featured: false, badge: null,
        features: ['45 min – 1 hour session', '1 local Virginia Beach location', '1–2 outfit changes', '10–15 professionally edited photos', 'Private online gallery delivery'],
      },
      {
        num: '02', name: 'The Signature Experience', tagline: 'Most Popular',
        price: '$595', priceSuffix: '', featured: true, badge: 'Most Popular',
        features: ['2 hours of shooting', 'Up to 2 locations', '2–3 outfit changes', '20–25 fully edited images', 'Full gallery delivery', 'Cinematic Lightroom & Photoshop editing'],
      },
      {
        num: '03', name: 'The Editorial Session', tagline: 'The Premium Package',
        price: '$825', priceSuffix: '+', featured: false, badge: null,
        features: ['3–4 hours of shooting', 'Multiple locations — VA Beach to DC', 'Unlimited outfit changes', '40+ fully edited images', 'Priority turnaround', 'Editorial-level post-production'],
      },
    ],
  },
  {
    id: 'maternity',
    icon: '✦',
    name: 'Maternity & Motherhood',
    priceRange: '$425 – $925+',
    description: 'Celebrating the beauty of new life. Timeless, emotional sessions — from intimate announcements to full editorial maternity shoots.',
    tiers: [
      {
        num: '01', name: 'The Essential Maternity', tagline: 'The Gateway Package',
        price: '$425', priceSuffix: ' – 475', featured: false, badge: null,
        features: ['1 hour of shooting', '1 local location', '1 outfit', '15 edited photos', 'Private online gallery delivery'],
      },
      {
        num: '02', name: 'The Signature Maternity', tagline: 'Most Popular',
        price: '$650', priceSuffix: ' – 725', featured: true, badge: 'Most Popular',
        features: ['2 hours of shooting', '2 locations', '2–3 outfit changes', 'Partner & family welcome', '25–30 edited photos', 'Full gallery delivery'],
      },
      {
        num: '03', name: 'The Heirloom Maternity', tagline: 'Editorial Experience',
        price: '$925', priceSuffix: '+', featured: false, badge: null,
        features: ['3–4 hours of shooting', 'Multiple locations — can include Richmond or DC', 'Unlimited outfits', '40+ edited images', 'Priority editing turnaround', 'Magazine-style editorial direction'],
      },
    ],
  },
  {
    id: 'couples',
    icon: '◈',
    name: 'Couples & Engagements',
    priceRange: '$325 – $895+',
    description: 'Tell your love story with intention. Pre-wedding, engagement, anniversary — your moments, cinematic.',
    tiers: [
      {
        num: '01', name: 'The Essential Couple', tagline: 'The Gateway Package',
        price: '$325', priceSuffix: ' – 425', featured: false, badge: null,
        features: ['45 min – 1 hour', '1 location', '1 outfit', '15 edited photos', 'Private online gallery delivery'],
      },
      {
        num: '02', name: 'The Signature Romance', tagline: 'Most Popular',
        price: '$550', priceSuffix: ' – 600', featured: true, badge: 'Most Popular',
        features: ['2 hours of shooting', '2 locations', '2 outfits', '25–30 edited photos', 'Full gallery delivery', 'Cinematic editing'],
      },
      {
        num: '03', name: 'The Adventure Session', tagline: 'Go Epic',
        price: '$895', priceSuffix: '+', featured: false, badge: null,
        features: ['3+ hours of shooting', 'Travel to epic locations (DC, Shenandoah, etc.)', 'Multiple outfits', '40+ edited photos', 'Priority turnaround', 'Destination-style direction'],
      },
    ],
  },
  {
    id: 'commercial',
    icon: '⬡',
    name: 'Commercial & Brand',
    priceRange: '$625 – $3,050+',
    description: 'Hotels, restaurants, brands. Professional visual storytelling built around licensing and commercial use — priced to reflect your ROI.',
    tiers: [
      {
        num: '01', name: 'The Brand Refresh', tagline: 'Quick-Turn Commercial',
        price: '$625', priceSuffix: ' – 895', featured: false, badge: null,
        features: ['2 hours at 1 location', '15–20 polished images', 'Standard commercial usage rights', 'Social media & website use', 'Perfect for Airbnbs & local businesses'],
      },
      {
        num: '02', name: 'The Commercial Campaign', tagline: 'Most Popular',
        price: '$1,400', priceSuffix: ' – 1,750', featured: true, badge: 'Most Popular',
        features: ['Half-day shoot (up to 4 hours)', 'Multiple setups — rooms, exterior, lifestyle', 'Models or staff included', '40+ fully retouched images', 'Broad commercial usage rights'],
      },
      {
        num: '03', name: 'The Enterprise Shoot', tagline: 'Full Production',
        price: '$3,050', priceSuffix: '+', featured: false, badge: null,
        features: ['Full-day shoot (8 hours)', 'Extensive coverage — interiors, exterior, lifestyle', 'Advanced Photoshop retouching', 'Unlimited commercial licensing (print, billboards, global)', 'Travel included'],
      },
    ],
  },
  {
    id: 'boudoir',
    icon: '◇',
    name: 'Boudoir',
    priceRange: 'Starting at $995',
    description: 'Intimate, empowering, and tastefully luxurious. A safe space to celebrate your authentic self.',
    tiers: [],
  },
  {
    id: 'fashion',
    icon: '◉',
    name: 'Fashion & Editorial',
    priceRange: 'Starting at $895',
    description: 'Editorial and commercial fashion. Bold lighting, editorial direction, and cinematic post-production.',
    tiers: [],
  },
  {
    id: 'weddings',
    icon: '◉',
    name: 'Weddings',
    priceRange: 'Starting at $2,995',
    description: 'Your story, told beautifully. Full-day coverage with the cinematic depth your love deserves.',
    tiers: [],
  },
  {
    id: 'travel',
    icon: '✈',
    name: 'International Travel',
    priceRange: 'Travel + $1,795/day',
    description: 'Destination sessions anywhere in the world. Bring your vision — I\'ll bring the camera and the craft.',
    tiers: [],
  },
];

export const processSteps = [
  {
    step: 1,
    title: 'Consultation',
    description: 'We start with you. Your vision, your story, your goals. Through WhatsApp or a call, we design the perfect session.'
  },
  {
    step: 2,
    title: 'Session',
    description: 'Professional direction, premium gear, and cinematic lighting. You relax — we handle the artistry.'
  },
  {
    step: 3,
    title: 'Editing',
    description: 'Meticulous post-production. Color grading, retouching, and artistic direction — pure cinema.'
  },
  {
    step: 4,
    title: 'Delivery',
    description: 'Full-resolution images, prints, or digital files. Your photos, ready for the world.'
  },
];
