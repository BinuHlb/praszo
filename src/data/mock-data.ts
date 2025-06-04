import type { Product, CaseStudy, Testimonial } from '@/lib/types';
import { LayoutDashboard, BarChart3, Users, Settings, Zap, Briefcase, MessageCircle } from 'lucide-react';

export const products: Product[] = [
  {
    id: 'pm-app',
    name: 'NexusFlow PM',
    tagline: 'Streamline Your Workflow, Amplify Results.',
    description: 'Our flagship project management application designed for modern teams. Intuitive, powerful, and fully customizable to fit your unique processes.',
    longDescription: 'NexusFlow PM is more than just a task manager; it\'s a comprehensive platform that brings clarity, collaboration, and efficiency to your projects. From initial planning to final delivery, NexusFlow PM empowers your team to achieve more with less stress. Features include advanced task management, real-time collaboration, resource allocation, progress tracking, and insightful reporting.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'software interface',
    type: 'app',
    slug: 'project-management-app',
    features: [
      { title: 'Intuitive Dashboard', description: 'Get a clear overview of all your projects at a glance.', icon: LayoutDashboard },
      { title: 'Advanced Task Management', description: 'Create, assign, and track tasks with ease, including subtasks and dependencies.', icon: BarChart3 },
      { title: 'Real-time Collaboration', description: 'Communicate with your team, share files, and get instant updates.', icon: Users },
      { title: 'Resource Allocation', description: 'Efficiently manage team workloads and project resources.', icon: Settings },
    ],
    interactiveDemo: {
      title: "Explore NexusFlow PM",
      description: "See how NexusFlow PM can transform your project management. Visualize workflows and feature integrations.",
      imageUrl: "https://placehold.co/500x300.png",
      dataAiHint: 'dashboard analytics',
      link: "/project-management-app#demo"
    },
    testimonials: [
      { id: 't1', quote: "NexusFlow PM revolutionized how we manage projects. It's a game changer!", author: "Jane Doe", company: "Innovatech Ltd.", authorImage: "https://placehold.co/100x100.png", dataAiHint: "profile woman" },
      { id: 't2', quote: "The best PM tool we've ever used. Highly recommended.", author: "John Smith", company: "Tech Solutions Inc.", authorImage: "https://placehold.co/100x100.png", dataAiHint: "profile man" },
    ],
  },
  {
    id: 'web-dev',
    name: 'Bespoke Web Solutions',
    tagline: 'Crafting Digital Experiences That Convert.',
    description: 'Custom web design and development services tailored to your brand. We build fast, responsive, and scalable websites that drive growth.',
    longDescription: 'Our web development services focus on creating unique digital platforms that not only look stunning but also perform exceptionally. We work with the latest technologies to build secure, SEO-friendly, and user-centric websites. Whether you need an e-commerce platform, a corporate website, or a complex web application, our team has the expertise to deliver.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'website design',
    type: 'service',
    slug: 'web-development',
    features: [
      { title: 'Custom Design', description: 'Unique designs that reflect your brand identity.', icon: Zap },
      { title: 'Responsive & Mobile-First', description: 'Flawless experience across all devices.', icon: Briefcase },
      { title: 'SEO Optimized', description: 'Built for visibility and higher search rankings.', icon: BarChart3 },
      { title: 'Scalable Architecture', description: 'Solutions that grow with your business.', icon: Settings },
    ],
    caseStudies: [
      { id: 'cs1', title: 'E-commerce Platform for Aura Boutique', clientName: 'Aura Boutique', problem: 'Low online sales and outdated website.', solution: 'Developed a modern, responsive e-commerce site with improved UX.', results: '50% increase in online sales within 3 months.', image: 'https://placehold.co/400x300.png', dataAiHint: 'fashion website' },
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Strategic Digital Marketing',
    tagline: 'Amplify Your Reach, Maximize Your Impact.',
    description: 'Data-driven digital marketing strategies to boost your online presence. From SEO to social media, we cover all your marketing needs.',
    longDescription: 'Our digital marketing services are designed to help your business connect with its target audience and achieve measurable results. We offer a full suite of services including Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, content marketing, social media management, and email marketing. Let us help you build a powerful online presence that drives engagement and conversions.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'marketing campaign',
    type: 'service',
    slug: 'digital-marketing',
    features: [
      { title: 'Comprehensive SEO', description: 'Improve organic search rankings and drive targeted traffic.', icon: BarChart3 },
      { title: 'PPC Campaign Management', description: 'Maximize ROI with effective paid advertising strategies.', icon: Users },
      { title: 'Content Strategy', description: 'Engaging content that resonates with your audience.', icon: MessageCircle },
      { title: 'Social Media Engagement', description: 'Build and nurture your online community.', icon: Zap },
    ],
    testimonials: [
      { id: 't3', quote: "Apex Digital's marketing strategies took our brand to the next level.", author: "Mike Chan", company: "Growth Co.", authorImage: "https://placehold.co/100x100.png", dataAiHint: "profile asian man" },
    ]
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
