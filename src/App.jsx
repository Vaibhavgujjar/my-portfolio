import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  User, Mail, Phone, MapPin, Linkedin, Github, 
  ExternalLink, Award, BookOpen, Briefcase, 
  Code, Cpu, Terminal, ChevronDown, Download,
  Send, Menu, X, ArrowUpRight, CheckCircle,
  Smartphone, Database, Layout, Search,
  Music, Plane, Zap, Globe
} from 'lucide-react';
import "./App.css";

/**
 * COLOR SYSTEM & CONSTANTS
 * Derived from profession: Tech / Engineering
 */
const COLORS = {
  primary: '#1a237e', // Deep Indigo
  accent: '#00bcd4',  // Electric Cyan
  silver: '#e0e0e0',
  bgDark: '#0a0e2e',
  bgLight: '#f8faff',
  surface: 'rgba(255, 255, 255, 0.05)',
  textMain: '#ffffff',
  textMuted: '#b0bec5',
  cardBg: '#ffffff',
  cardText: '#263238'
};

// Data extracted from the provided resume
const RESUME_DATA = {
  name: "VAIBHAV SINGH PANWAR",
  titles: ["Computer Science Engineer", "Software Developer", "Java Specialist", "UI/UX Enthusiast"],
  contact: {
    phone: "+91 6397003303",
    email: "vaibhavsinghpanwar1212@gmail.com",
    address: "Village: Ospur, Post: Raisi, Laksar, Dist.: Haridwar (U.K) - 247663",
    linkedin: "linkedin.com/in/vaibhav-singh-panwar-8b76581aa",
    github: "github.com/vaibhav-singh-panwar" // Estimated
  },
  summary: "To obtain a challenging role in the field of Computer Science and Engineering where I can apply my knowledge of machine learning and software development to contribute to organizational growth while continuously learning and enhancing my skills.",
  education: [
    {
      institution: "COER University, Roorkee",
      degree: "B.Tech in Computer Science and Engineering",
      year: "Expected June 2026",
      status: "Currently Pursuing"
    },
    {
      institution: "Govt. Polytechnic Dehradun (UBTER)",
      degree: "Diploma in Computer Science and Engineering",
      year: "2023",
      gpa: "8.0 CGPA"
    }
  ],
  skills: {
    programming: ["C", "Java", "Python", "HTML", "CSS"],
    databases: ["MySQL"],
    tools: ["VS Code", "PyCharm", "MySQL Workbench", "Anaconda Navigator", "Android Studio", "MS Office"],
    soft: ["Communication", "Teamwork", "Problem Solving"],
    other: ["English Typing (35 WPM)"]
  },
  projects: [
    {
      title: "Food Waste Management System",
      tech: "Java, Java Swing (JFrame)",
      desc: "Developed a desktop application to track and manage food waste from restaurants and households. Facilitates redistribution of excess food to reduce wastage.",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Restaurant Billing System",
      tech: "Java, Java Swing (JFrame)",
      desc: "Created billing software for small to mid-sized restaurants to manage customer orders and sales reports with a user-friendly GUI.",
      icon: <Layout className="w-6 h-6" />
    },
    {
      title: "Fake Product Detection Using Barcode",
      tech: "Flutter, Dart, Firebase",
      desc: "Mobile application to scan product barcodes and verify authenticity using a cloud database to reduce counterfeit circulation.",
      icon: <Search className="w-6 h-6" />
    }
  ],
  certifications: [
    { name: "PHP Programming", issuer: "SARA Academy (Udemy)", duration: "3.5 Hours" },
    { name: "Python Programming", issuer: "GICT, Dehradun", duration: "6 Weeks" },
    { name: "Java Programming", issuer: "CETPA INFOTECH, Roorkee", duration: "6 Weeks" },
    { name: "C Programming", issuer: "CETPA INFOTECH, Roorkee", duration: "4 Weeks" },
    { name: "English Typing (35 WPM)", issuer: "Academy of Computer Studies", duration: "6 Weeks" }
  ],
  hobbies: ["Learning about new technologies", "Innovation", "Listening to songs", "Travelling"],
  languages: ["Hindi", "English"]
};

// --- Custom Hooks ---

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (options.triggerOnce) observer.unobserve(entry.target);
      }
    }, options);

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting];
};

// --- Component: Intro Sequence ---

const Intro = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const fullText = RESUME_DATA.name;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0e2e] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="radial-burst" />
      </div>
      
      <button 
        onClick={onComplete}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs z-10"
      >
        Skip Intro
      </button>

      <h1 className="text-white text-5xl md:text-7xl font-serif text-center mb-4 tracking-tight animate-fade-in">
        {text}<span className="animate-pulse">|</span>
      </h1>
      <div className="text-cyan-400 font-mono tracking-widest text-sm md:text-lg animate-slide-up opacity-0 [animation-delay:1.5s]">
        {RESUME_DATA.titles[0]}
      </div>

      <div className="curtain left-curtain" />
      <div className="curtain right-curtain" />

      <style>{`
        .radial-burst {
          background: radial-gradient(circle, rgba(0,188,212,0.2) 0%, transparent 70%);
          width: 100%;
          height: 100%;
          animation: burst 4s ease-out forwards;
        }
        @keyframes burst {
          0% { transform: scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .curtain {
          position: absolute;
          top: 0; width: 50%; height: 100%;
          background: #0a0e2e;
          z-index: 5;
          transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1);
          animation: slide-away 1s cubic-bezier(0.77, 0, 0.175, 1) 3.5s forwards;
        }
        .left-curtain { left: 0; }
        .right-curtain { right: 0; }
        @keyframes slide-away {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(var(--dir, 1) * 100%)); }
        }
        .left-curtain { --dir: -1; }
        .right-curtain { --dir: 1; }
      `}</style>
    </div>
  );
};

// --- Component: Particle Canvas ---

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(0, 188, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// --- Component: Section Header ---

const SectionHeader = ({ title, subtitle }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a237e] mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400 transform origin-left transition-transform duration-1000 scale-x-50"></span>
      </h2>
      {subtitle && <p className="text-slate-500 mt-4 max-w-2xl mx-auto uppercase tracking-widest text-sm">{subtitle}</p>}
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % RESUME_DATA.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (showIntro) return <Intro onComplete={() => setShowIntro(false)} />;

  return (
    <div className="min-h-screen bg-[#fcf9f5] font-sans text-slate-900 selection:bg-cyan-200 cursor-default">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-cyan-500 z-[60] transition-all duration-300" 
        style={{ width: `${(scrolled ? 100 : 0)}%` }}
      />

      {/* Custom Cursor (simplified for performance) */}
      <div className="hidden lg:block fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-[100] transition-transform duration-75 mix-blend-difference" id="custom-cursor" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#1a237e]/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-tight text-white">
            VP<span className="text-cyan-400">.</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-semibold text-white/80">
            {['About', 'Skills', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg">
            Resume
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0e2e]">
        <HeroCanvas />
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="animate-fade-up">
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              {RESUME_DATA.name.split(' ').map((word, i) => (
                <span key={i} className="inline-block hover:text-cyan-400 transition-colors duration-500 px-2">{word}</span>
              ))}
            </h1>
            <div className="h-12 flex items-center justify-center overflow-hidden mb-8">
              <span className="text-2xl md:text-3xl text-cyan-400 font-mono tracking-wider animate-slide-up-loop">
                {RESUME_DATA.titles[activeTitleIndex]}
              </span>
            </div>
            <p className="max-w-xl mx-auto text-slate-400 mb-10 text-lg leading-relaxed">
              {RESUME_DATA.summary}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="magnetic-btn bg-cyan-500 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl group">
                View My Work <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-cyan-400 w-8 h-8" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader title="About Me" subtitle="My Career Foundation" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="w-full aspect-square max-w-md mx-auto relative z-10 overflow-hidden rounded-3xl bg-slate-100 border-4 border-white shadow-2xl">
                {/* SVG Avatar Placeholder */}
                <svg viewBox="0 0 200 200" className="w-full h-full p-12">
                   <circle cx="100" cy="70" r="40" fill="#1a237e" />
                   <path d="M40 160 Q100 110 160 160" stroke="#1a237e" strokeWidth="15" fill="none" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-50 -z-1" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-1" />
            </div>
            
            <div>
              <p className="text-xl leading-relaxed text-slate-700 mb-8 italic">
                "Passionate about leveraging modern software architectures and machine learning to solve real-world problems."
              </p>
              
              <div className="space-y-8">
                <h4 className="font-serif text-2xl font-bold text-[#1a237e]">Education Timeline</h4>
                <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
                  {RESUME_DATA.education.map((edu, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[41px] top-0 w-5 h-5 bg-cyan-500 rounded-full ring-4 ring-white" />
                      <div className="text-sm font-bold text-cyan-600 mb-1">{edu.year}</div>
                      <h5 className="text-lg font-bold text-slate-900">{edu.degree}</h5>
                      <div className="text-slate-500">{edu.institution}</div>
                      {edu.gpa && <div className="mt-2 inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-bold">{edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-[#f8faff]">
        <div className="container mx-auto px-6">
          <SectionHeader title="Skills & Expertise" subtitle="Technical Prowess" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
            {[...RESUME_DATA.skills.programming, ...RESUME_DATA.skills.databases].map((skill, idx) => (
              <div 
                key={idx} 
                className="hex-tile group relative aspect-square flex items-center justify-center p-8 transition-all duration-500 hover:scale-110"
              >
                <div className="absolute inset-0 bg-white shadow-lg clip-hex transition-colors group-hover:bg-[#1a237e]" />
                <div className="relative z-10 text-center">
                  <span className="block text-sm font-mono uppercase tracking-widest font-bold group-hover:text-white transition-colors">{skill}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
              <h4 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3 text-[#1a237e]">
                <Cpu className="text-cyan-500" /> Tools & IDEs
              </h4>
              <div className="flex flex-wrap gap-3">
                {RESUME_DATA.skills.tools.map(tool => (
                  <span key={tool} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm border border-slate-100 hover:border-cyan-300 transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
              <h4 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3 text-[#1a237e]">
                <Zap className="text-cyan-500" /> Soft Skills
              </h4>
              <div className="space-y-4">
                {RESUME_DATA.skills.soft.map(skill => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{skill}</span>
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Featured Projects" subtitle="Building Real Solutions" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {RESUME_DATA.projects.map((proj, idx) => (
              <div key={idx} className="project-card group h-[400px] perspective-1000">
                <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-[#0a0e2e] rounded-3xl overflow-hidden p-8 flex flex-col justify-end">
                    <div className="absolute top-0 right-0 p-8 text-white/20 group-hover:text-cyan-400 transition-colors">
                      {proj.icon}
                    </div>
                    <div className="relative z-10">
                      <div className="text-cyan-400 text-xs font-mono mb-2">{proj.tech}</div>
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{proj.title}</h3>
                      <div className="w-12 h-1 bg-cyan-500 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-cyan-500 rounded-3xl p-8 flex flex-col justify-center text-white">
                    <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                    <p className="text-white/90 leading-relaxed mb-6">{proj.desc}</p>
                    <div className="flex gap-4">
                      <button className="flex-1 bg-white text-cyan-600 py-3 rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                        View Details <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <SectionHeader title="Recognition" subtitle="Learning & Mastery" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESUME_DATA.certifications.map((cert, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl flex items-start gap-4 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{cert.name}</h4>
                  <p className="text-sm text-slate-500">{cert.issuer}</p>
                  <p className="text-xs text-cyan-600 mt-2 font-mono">{cert.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a0e2e] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8">Let's <span className="text-cyan-400">Connect</span>.</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail />, label: 'Email', value: RESUME_DATA.contact.email, link: `mailto:${RESUME_DATA.contact.email}` },
                  { icon: <Phone />, label: 'Phone', value: RESUME_DATA.contact.phone, link: `tel:${RESUME_DATA.contact.phone}` },
                  { icon: <Linkedin />, label: 'LinkedIn', value: 'Vaibhav Panwar', link: `https://${RESUME_DATA.contact.linkedin}` },
                  { icon: <MapPin />, label: 'Location', value: 'Haridwar, Uttarakhand', link: '#' }
                ].map((item, idx) => (
                  <a key={idx} href={item.link} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{item.label}</div>
                      <div className="text-lg font-medium group-hover:text-cyan-400 transition-colors">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors resize-none" placeholder="How can I help you?" />
                </div>
                <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group">
                  Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0e2e] border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-serif font-bold text-white">
            VP<span className="text-cyan-400">.</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {RESUME_DATA.name} | Computer Science Engineering
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-all hover:-translate-y-1"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-all hover:-translate-y-1"><Github size={20} /></a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-all hover:-translate-y-1"><Globe size={20} /></a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 text-center">
            <p className="text-slate-600 text-xs italic">"Striving to turn ideas into digital reality through code and innovation."</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;800&family=JetBrains+Mono&display=swap');
        
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .clip-hex {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }

        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }

        .animate-fade-up { animation: fade-up 1s ease-out forwards; }
        .animate-slide-up { animation: fade-up 0.8s ease-out forwards; }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-up-loop {
          animation: slide-up-loop 3s infinite;
        }

        @keyframes slide-up-loop {
          0% { transform: translateY(100%); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0e2e; }
        ::-webkit-scrollbar-thumb { background: #00bcd4; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #008ba3; }

        .magnetic-btn {
          position: relative;
          transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
        }
      `}</style>
    </div>
  );
}