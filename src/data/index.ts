import { Briefcase, Clock, Code2, Database, Layers, Layout, Rocket, Users} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


interface Benefit {
  id: number;
  title: string;
  description: string;
  Icon: LucideIcon; // Component reference
}

interface Module {
  id: number;
  phase: string;
  title: string;
  description: string;
  topics: Array<string>;
  Icon: LucideIcon;
}

export interface FAQItem {
  index?: number;
  question: string;
  answer: string;
}

export const LEARNIFY_FAQS: Array<FAQItem> = [
  {
    index: 1,
    question: "Do I need prior coding experience?",
    answer:
      "Not at all! Learnifydev is designed to take you from your very first line of HTML to deploying full-stack applications. We start with the absolute basics and build up from there.",
  },
  {
    index: 2,
    question: "How long does it take to complete the roadmap?",
    answer:
      "Most students complete the core curriculum in 3 to 6 months. However, the platform offers lifetime access, allowing you to learn at your own pace whenever you have free time.",
  },
  {
    index: 3,
    question: "Will I get a certificate upon completion?",
    answer:
      "Yes! Once you complete the projects in the final phase and they pass our review process, you will receive a digital certificate of completion to showcase on your LinkedIn or portfolio.",
  },
  {
    index: 4,
    question: "Is there a community for support?",
    answer:
      "Absolutely. You'll get access to our private Discord community where you can ask questions, collaborate on projects, and network with other developers and mentors.",
  },
  {
    index: 5,
    question: "Is the content kept up-to-date?",
    answer:
      "The tech world moves fast, and so do we. We regularly update our tutorials to reflect the latest versions of React, Next.js, and modern industry best practices.",
  },
];

export const COURSE_ROADMAP: Array<Module> = [
  {
    id: 1,
    phase: "Phase 01",
    title: "Frontend Foundations",
    description: "Master the art of crafting beautiful, responsive user interfaces from scratch.",
    topics: ["HTML5 & Semantic Web", "Modern CSS & Tailwind", "Responsive Design", "JavaScript ES6+"],
    Icon: Layout
  },
  {
    id: 2,
    phase: "Phase 02",
    title: "Dynamic Web Apps",
    description: "Dive deep into modern frameworks and learn how to manage complex application states.",
    topics: ["React Hooks & Context", "Next.js 14 Framework", "State Management", "API Integration"],
    Icon: Code2
  },
  {
    id: 3,
    phase: "Phase 03",
    title: "Backend & Architecture",
    description: "Build the brains of your application. Learn to handle data, auth, and logic.",
    topics: ["Node.js & Express", "MongoDB & PostGreSQL", "JWT Authentication", "Serverless Functions"],
    Icon: Database
  },
  {
    id: 4,
    phase: "Phase 04",
    title: "Deployment & Beyond",
    description: "Move from local development to a production-ready environment.",
    topics: ["CI/CD Pipelines", "Docker Basics", "Vercel & AWS", "Performance Optimization"],
    Icon: Rocket
  }
];

export const bootcampFeatures: Array<string> = ["Live Classes", "Flexible 3-4 months", "On site or Online"];

export const LEARNIFY_BENEFITS: Array<Benefit> = [
  {
    id: 1,
    title: "Build a Real Portfolio",
    description: "Every tutorial is centered around building real-world projects that look great on a resume.",
    Icon: Briefcase
  },
  {
    id: 2,
    title: "Master Tech Stacks",
    description: "Deep dives into the MERN stack and the latest CSS frameworks to keep you ahead.",
    Icon: Layers
  },
  {
    id: 3,
    title: "Expert-Approved",
    description: "Complex concepts like State Management explained in simple, patient language.",
    Icon: Users
  },
  {
    id: 4,
    title: "Learn at Your Pace",
    description: "Lifetime access means you can revisit tricky concepts whenever you need a refresher.",
    Icon: Clock
  }
];