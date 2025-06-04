
import type { Product, CaseStudy, Testimonial } from '@/lib/types';
import { LayoutDashboard, BarChart3, Users, Settings, Zap, Briefcase, MessageCircle, CheckSquare, Edit3, BookOpen } from 'lucide-react';

export const products: Product[] = [
  {
    id: 'practice-app', 
    name: 'Practice', 
    tagline: 'Streamline Your Workflow, Amplify Results with Practice.', 
    description: 'Our flagship project management application, Practice, is designed for modern teams. Intuitive, powerful, and fully customizable to fit your unique processes.', 
    longDescription: 'Practice is more than just a task manager; it\'s a comprehensive platform that brings clarity, collaboration, and efficiency to your projects. From initial planning to final delivery, Practice empowers your team to achieve more with less stress. Features include advanced task management, real-time collaboration, resource allocation, progress tracking, and insightful reporting.', 
    image: '/assets/images/hero-banner.png', 
    dataAiHint: 'software interface',
    type: 'app',
    slug: 'practice', 
    features: [
      { title: 'Intuitive Dashboard', description: 'Get a clear overview of all your projects at a glance.', icon: LayoutDashboard },
      { title: 'Advanced Task Management', description: 'Create, assign, and track tasks with ease, including subtasks and dependencies.', icon: BarChart3 },
      { title: 'Real-time Collaboration', description: 'Communicate with your team, share files, and get instant updates.', icon: Users },
      { title: 'Resource Allocation', description: 'Efficiently manage team workloads and project resources.', icon: Settings },
    ],
    interactiveDemo: {
      title: "Explore Practice", 
      description: "See how Practice can transform your project management. Visualize workflows and feature integrations.", 
      imageUrl: "https://placehold.co/1200x675.png", 
      dataAiHint: 'dashboard analytics',
      link: "/products/practice#demo",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
    },
    testimonials: [
      { id: 't1', quote: "Practice revolutionized how we manage projects. It's a game changer!", author: "Jane Doe", company: "Innovatech Ltd.", authorImage: "https://placehold.co/100x100.png", dataAiHint: "profile woman" }, 
      { id: 't2', quote: "The best PM tool we've ever used. Highly recommended for Practice.", author: "John Smith", company: "Tech Solutions Inc.", authorImage: "https://placehold.co/100x100.png", dataAiHint: "profile man" }, 
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
      { id: 't3', quote: "Praszo's marketing strategies took our brand to the next level.", author: "Mike Chan", company: "Growth Co.", authorImage: "https://placehold.co/100x100.png", dataAiHint: "profile asian man" },
    ]
  },
  {
    id: 'verify-serv',
    name: 'Verify',
    tagline: 'Ensure Quality and Accuracy.',
    description: 'Comprehensive verification services to ensure your digital assets meet the highest standards.',
    longDescription: 'Our Verify service offers meticulous testing and quality assurance for software, websites, and digital campaigns. We help you identify issues before they impact your users or your bottom line.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'quality check',
    type: 'service',
    slug: 'verify',
    features: [
      { title: 'Rigorous Testing', description: 'In-depth testing methodologies to uncover potential issues.', icon: CheckSquare },
      { title: 'Quality Assurance', description: 'Ensuring your product meets quality benchmarks.', icon: Zap },
      { title: 'User Acceptance Testing', description: 'Validating functionality from the end-user perspective.', icon: Users },
    ],
  },
  {
    id: 'modify-serv',
    name: 'Modify',
    tagline: 'Adapt and Evolve Your Solutions.',
    description: 'Flexible modification services to update, enhance, or refactor your existing digital products.',
    longDescription: 'The digital landscape is always changing. Our Modify service helps you adapt your existing applications, websites, and systems to new requirements, technologies, or user feedback, ensuring longevity and relevance.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'code editing',
    type: 'service',
    slug: 'modify',
    features: [
      { title: 'Feature Enhancements', description: 'Adding new capabilities to your existing software.', icon: Edit3 },
      { title: 'System Upgrades', description: 'Modernizing your tech stack for better performance.', icon: Settings },
      { title: 'Refactoring', description: 'Improving code quality and maintainability.', icon: Zap },
    ],
  },
  {
    id: 'docs-serv',
    name: 'Docs',
    tagline: 'Clear, Concise, Comprehensive Documentation.',
    description: 'Professional documentation services for your products, APIs, and internal processes.',
    longDescription: 'Effective documentation is key to user adoption, developer productivity, and knowledge retention. Our Docs service provides expert technical writing and information design to create clear, user-friendly documentation that empowers your users and team.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'technical writing',
    type: 'service',
    slug: 'docs',
    features: [
      { title: 'User Manuals', description: 'Creating comprehensive guides for end-users.', icon: BookOpen },
      { title: 'API Documentation', description: 'Clear and precise documentation for developers.', icon: Settings },
      { title: 'Knowledge Bases', description: 'Building internal wikis and process documentation.', icon: Users },
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
