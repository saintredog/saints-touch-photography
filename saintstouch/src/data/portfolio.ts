export interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: 'portraits' | 'events' | 'fashion' | 'couples' | 'hospitality';
  featured: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  // Portraits
  { id: 'p-1', src: 'images/7E9A8458.jpg', alt: 'Portrait', category: 'portraits', featured: true },
  { id: 'p-2', src: 'images/7E9A8500.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-3', src: 'images/7E9A8507.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-4', src: 'images/7E9A8516-2.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-5', src: 'images/_E9A1350.jpg', alt: 'Portrait', category: 'portraits', featured: true },
  { id: 'p-6', src: 'images/_E9A1432.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-7', src: 'images/_E9A1623.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-8', src: 'images/_E9A1610.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-9', src: 'images/_E9A0029.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-10', src: 'images/_E9A0068.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-11', src: 'images/_E9A0158-2.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-12', src: 'images/_E9A0167.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-13', src: 'images/7E9A4069.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-14', src: 'images/7E9A4094.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-15', src: 'images/7E9A4146.jpg', alt: 'Portrait', category: 'portraits', featured: false },
  { id: 'p-16', src: 'images/7E9A4117.jpg', alt: 'Portrait', category: 'portraits', featured: true },

  // Events
  { id: 'e-1', src: 'images/_E9A0921.jpg', alt: 'Event', category: 'events', featured: true },
  { id: 'e-2', src: 'images/_E9A0928.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-3', src: 'images/_E9A0940.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-4', src: 'images/_E9A0963.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-5', src: 'images/_E9A0981.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-6', src: 'images/_E9A1006.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-7', src: 'images/_E9A1027.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-8', src: 'images/_E9A1032.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-9', src: 'images/events/7E9A9637.jpg', alt: 'Event', category: 'events', featured: true },
  { id: 'e-10', src: 'images/events/7E9A9646.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-11', src: 'images/events/7E9A9651.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-12', src: 'images/events/7E9A9652.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-13', src: 'images/events/7E9A9633.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-14', src: 'images/events/7E9A9665.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-15', src: 'images/events/7E9A9669.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-16', src: 'images/events/7E9A9672.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-17', src: 'images/events/7E9A9674.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-18', src: 'images/events/7E9A9676.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-19', src: 'images/events/7E9A9678.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-20', src: 'images/events/7E9A9680.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-21', src: 'images/events/7E9A9683.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-22', src: 'images/events/7E9A9685.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-23', src: 'images/events/7E9A9696.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-24', src: 'images/IMG_9423.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-25', src: 'images/IMG_9467.jpg', alt: 'Event', category: 'events', featured: false },
  { id: 'e-26', src: 'images/IMG_9474.jpg', alt: 'Event', category: 'events', featured: false },

  // Fashion
  { id: 'f-1', src: 'images/_MG_7856-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: true },
  { id: 'f-2', src: 'images/_MG_8207-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: true },
  { id: 'f-3', src: 'images/_MG_8305-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: false },
  { id: 'f-4', src: 'images/_MG_7992-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: false },
  { id: 'f-5', src: 'images/_MG_8286-Edit.jpg', alt: 'Fashion', category: 'fashion', featured: false },
  { id: 'f-6', src: 'images/_MG_7667-Edit-2.jpg', alt: 'Fashion', category: 'fashion', featured: false },

  // Couples
  { id: 'c-1', src: 'images/couples1.jpeg', alt: 'Couples', category: 'couples', featured: true },
  { id: 'c-2', src: 'images/IMG_2337.jpg', alt: 'Couples', category: 'couples', featured: true },
  { id: 'c-3', src: 'images/IMG_2327.jpg', alt: 'Couples', category: 'couples', featured: false },
  { id: 'c-4', src: 'images/IMG_2256.jpg', alt: 'Couples', category: 'couples', featured: false },

  // Hospitality
  { id: 'h-1', src: 'images/7E9A6687.jpg', alt: 'Hospitality', category: 'hospitality', featured: true },
  { id: 'h-2', src: 'images/hospitality/7E9A5523.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-3', src: 'images/hospitality/7E9A5535.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-4', src: 'images/hospitality/7E9A5608.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-5', src: 'images/hospitality/7E9A5662.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-6', src: 'images/hospitality/7E9A5713.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-7', src: 'images/hospitality/7E9A5721.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-8', src: 'images/hospitality/7E9A6696.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-9', src: 'images/hospitality/7E9A6705.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-10', src: 'images/hospitality/7E9A6711.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-11', src: 'images/hospitality/7E9A9856.jpg', alt: 'Hospitality', category: 'hospitality', featured: true },
  { id: 'h-12', src: 'images/hospitality/7E9A9881.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-13', src: 'images/hospitality/7E9A9884.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-14', src: 'images/hospitality/7E9A9899.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-15', src: 'images/hospitality/7E9A9937.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-16', src: 'images/hospitality/7E9A9942.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-17', src: 'images/hospitality/7E9A9946.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
  { id: 'h-18', src: 'images/hospitality/7E9A9951.jpg', alt: 'Hospitality', category: 'hospitality', featured: false },
];

export const services = [
  {
    icon: '◎',
    name: 'Portraits',
    price: 'Starting at $475',
    description: 'Personal branding, headshots, creative portraits. Clean, cinematic, intentional — tailored to your vision.'
  },
  {
    icon: '✦',
    name: 'Maternity',
    price: '$550–$800',
    description: 'Celebrating the beauty of new life. Timeless and emotional sessions that you will treasure forever.'
  },
  {
    icon: '◆',
    name: 'Fashion',
    price: 'Starting at $550',
    description: 'Fashion and editorial work. From lookbooks to campaign shoots, we bring your aesthetic to life.'
  },
  {
    icon: '⬢',
    name: 'Couples & Engagements',
    price: '$650–$1,200',
    description: 'Tell your love story with intention. Pre-wedding, elopement, or anniversary — your moments, cinematic.'
  },
  {
    icon: '⬠',
    name: 'Events',
    price: '$800+',
    description: 'Weddings, celebrations, corporate events. Full coverage or highlights — we capture what matters.'
  },
  {
    icon: '∞',
    name: 'Hospitality & Commercial',
    price: 'Custom Quote',
    description: 'Hotels, restaurants, brands. Professional visual storytelling that sells and inspires.'
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
