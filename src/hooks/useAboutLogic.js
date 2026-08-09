import { 
  Zap, 
  ShieldCheck, 
  Headphones, 
  TrendingUp, 
  Users, 
  Cpu,
  Truck,
  HeartHandshake
} from 'lucide-react';

const stats = [
  { label: 'Happy Customers', value: '50,000+', icon: Users, color: 'text-red-500' },
  { label: 'Products Shipped', value: '120,000+', icon: TrendingUp, color: 'text-amber-500' },
  { label: 'Customer Satisfaction', value: '99.2%', icon: HeartHandshake, color: 'text-emerald-500' },
  { label: 'Global Tech Brands', value: '150+', icon: Cpu, color: 'text-blue-500' },
];

const values = [
  {
    icon: Zap,
    title: 'Cutting-Edge Innovation',
    description: 'We curate only the latest and highest-performing gadgets, ensuring you stay ahead of the technology curve.',
    gradient: 'from-red-500/10 to-pink-500/10 border-red-500/20'
  },
  {
    icon: ShieldCheck,
    title: '100% Genuine Guarantee',
    description: 'Every product in our store is sourced directly from authorized manufacturers with full official warranty.',
    gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20'
  },
  {
    icon: Headphones,
    title: 'Dedicated 24/7 Support',
    description: 'Our tech-expert support team is available round the clock to help with setup, queries, and assistance.',
    gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20'
  },
  {
    icon: Truck,
    title: 'Lightning-Fast Delivery',
    description: 'With express logistics partners worldwide, your favorite tech gear arrives safely in record time.',
    gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
  }
];

const milestones = [
  { year: '2021', title: 'The Spark', desc: 'Volt Vibe was founded with a mission to bring premium electronics to tech enthusiasts at fair prices.' },
  { year: '2023', title: 'Rapid Growth', desc: 'Expanded our catalog to over 1,000+ premium audio gear, wearables, smart devices, and accessories.' },
  { year: '2024', title: 'Global Reach', desc: 'Crossed 25,000+ satisfied orders with 24/7 priority customer support and hassle-free returns.' },
  { year: '2026', title: 'Next-Gen Experience', desc: 'Over 50,000+ active customers and introduction of instant warranty protection and smart recommendations.' }
];

const team = [
  {
    name: 'Jia Lofie',
    role: 'Founder & CEO',
    bio: 'Tech visionary with 12+ years experience in consumer electronics and e-commerce innovations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/IMG-20260803-WA0005_Eva_Elfie.jpg/1280px-IMG-20260803-WA0005_Eva_Elfie.jpg?utm_source=de.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
    tag: 'Visionary'
  },
  {
    name: 'Sophia Chen',
    role: 'Head of Product Curation',
    bio: 'Audio engineer and hardware enthusiast obsessed with testing and selecting top-tier tech gadgets.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    tag: 'Tech Curator'
  },
  {
    name: 'Marcus Miller',
    role: 'Director of Customer Experience',
    bio: 'Dedicated to creating seamless shopping experiences and building lasting relationships with our community.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    tag: 'Customer First'
  }
];

const useAboutLogic = () => {
  return {
    stats,
    values,
    milestones,
    team
  };
};

export default useAboutLogic;
