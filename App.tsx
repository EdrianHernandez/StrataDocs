import React, { useState, useEffect } from 'react';
import { Menu, Search, Box, Github, Moon, Sun, ChevronRight } from 'lucide-react';
import DocSidebar from './components/DocSidebar';
import CodeBlock from './components/CodeBlock';
import SearchOverlay from './components/SearchOverlay';
import TableOfContents from './components/TableOfContents';
import { NavItem, TocItem } from './types';

// --- Data Definitions ---

const NAV_ITEMS: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/getting-started',
    items: [
      { title: 'Introduction', href: '#introduction' },
      { title: 'Installation', href: '#installation' },
      { title: 'Quick Start', href: '#quick-start' },
    ]
  },
  {
    title: 'Core Concepts',
    href: '/core',
    items: [
      { title: 'Architecture', href: '#architecture' },
      { title: 'Authentication', href: '#authentication' },
      { title: 'Rate Limiting', href: '#rate-limiting' },
    ]
  },
  {
    title: 'API Reference',
    href: '/api',
    items: [
      { title: 'Users', href: '#api-users' },
      { title: 'Projects', href: '#api-projects' },
      { title: 'Webhooks', href: '#webhooks' },
    ]
  }
];

const TOC_ITEMS: TocItem[] = [
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'installation', text: 'Installation', level: 2 },
  { id: 'configuration', text: 'Configuration', level: 3 },
  { id: 'quick-start', text: 'Quick Start', level: 2 },
  { id: 'first-request', text: 'Making your first request', level: 3 },
  { id: 'authentication', text: 'Authentication', level: 2 },
];

// --- Mock Content Components ---

const HeroSection = () => (
  <div className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-10">
    <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
      <span>Docs</span>
      <ChevronRight size={14} />
      <span>Getting Started</span>
    </div>
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
      Introduction to Strata
    </h1>
    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
      Strata is a developer-first platform designed to streamline your SaaS infrastructure. 
      Build, deploy, and scale your applications with our high-performance API and intuitive dashboard.
    </p>
    <div className="flex gap-4 mt-8">
        <button className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
            Start Building
        </button>
        <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors">
            View API Reference
        </button>
    </div>
  </div>
);

const ContentSection = () => (
  <div className="space-y-12">
    {/* Introduction */}
    <section id="introduction" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Strata?</h2>
      <p className="text-slate-600 dark:text-slate-400 leading-7 mb-4">
        Modern applications require robust infrastructure. Strata abstracts away the complexity of 
        managing distributed systems, allowing you to focus on your core product logic. We provide 
        enterprise-grade reliability with the simplicity of a startup-friendly toolset.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">High Performance</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sub-millisecond latency for real-time applications.</p>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Global Scale</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Deployed across 35 regions worldwide automatically.</p>
          </div>
      </div>
    </section>

    {/* Installation */}
    <section id="installation" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
      <p className="text-slate-600 dark:text-slate-400 leading-7 mb-6">
        To get started with Strata, install our CLI tool using npm or yarn. This will allow you to 
        authenticate with the platform and initialize your local environment.
      </p>
      
      <CodeBlock 
        filename="Terminal"
        code="npm install -g @strata/cli" 
        language="bash" 
      />

      <h3 id="configuration" className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4 scroll-mt-24">Configuration</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-7 mb-4">
        Once installed, create a configuration file in the root of your project.
      </p>
      <CodeBlock 
        filename="strata.config.js"
        code={`module.exports = {
  project: 'my-awesome-app',
  region: 'us-east-1',
  features: {
    realtime: true,
    analytics: true
  }
};`} 
        language="javascript" 
        showLineNumbers
      />
    </section>

    {/* Quick Start */}
    <section id="quick-start" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Start</h2>
      <p className="text-slate-600 dark:text-slate-400 leading-7 mb-4">
        Let's initialize a new project and make your first API call.
      </p>
      <CodeBlock 
        code="strata init" 
        language="bash" 
      />
      
      <h3 id="first-request" className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4 scroll-mt-24">Making your first request</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-7 mb-4">
        Use the SDK to interact with your data. Here is an example of fetching user data.
      </p>
      <CodeBlock 
        filename="app.ts"
        code={`import { Strata } from '@strata/sdk';

const client = new Strata(process.env.STRATA_API_KEY);

async function getUser(id: string) {
  try {
    const user = await client.users.retrieve(id);
    console.log('User found:', user.email);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

getUser('usr_12345678');`} 
        language="typescript" 
        showLineNumbers
      />
    </section>

    {/* Authentication */}
    <section id="authentication" className="scroll-mt-24">
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Authentication</h2>
       <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-200 text-sm">
             <strong>Warning:</strong> Never expose your secret API keys in client-side code.
          </p>
       </div>
       <p className="text-slate-600 dark:text-slate-400 leading-7 mb-4">
          Strata uses API keys for authentication. You can manage your keys in the dashboard under Settings > API Keys.
          Pass the key in the Authorization header.
       </p>
       <CodeBlock 
         code={`curl https://api.strata.dev/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json"`}
         language="bash"
       />
    </section>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('#introduction');
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Apply theme to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (path.startsWith('#')) {
      document.getElementById(path.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
        <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="mr-4 lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <a href="#" className="flex items-center gap-2 mr-8">
              <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                <Box size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white hidden sm:inline-block">Strata</span>
            </a>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-400">
               <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Guides</a>
               <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Components</a>
               <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</a>
               <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Changelog</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center w-64 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-lg transition-colors group"
            >
              <Search size={16} className="mr-2 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
              <span className="text-sm font-medium mr-auto group-hover:text-slate-700 dark:group-hover:text-slate-200">Search docs...</span>
              <div className="flex items-center gap-0.5">
                  <span className="text-xs bg-white dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">⌘</span>
                  <span className="text-xs bg-white dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">K</span>
              </div>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              <Search size={20} />
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>
            
            <div className="flex items-center space-x-2">
                <a href="#" className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                 {/* Theme Toggle */}
                 <button 
                   onClick={toggleTheme}
                   className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                   aria-label="Toggle dark mode"
                 >
                  {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-screen-2xl mx-auto w-full flex items-start">
        
        {/* Left Sidebar */}
        <DocSidebar 
          navItems={NAV_ITEMS} 
          currentPath={currentPath} 
          onNavigate={handleNavigate}
          isOpenMobile={isMobileMenuOpen}
          closeMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 py-10 px-4 sm:px-6 lg:px-8 xl:px-12">
            <HeroSection />
            <ContentSection />
            
            <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 flex justify-between items-center">
                <p>&copy; 2024 Strata Inc. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white">Terms</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white">Twitter</a>
                </div>
            </footer>
        </main>

        {/* Right Sidebar (Table of Contents) */}
        <TableOfContents items={TOC_ITEMS} />

      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;