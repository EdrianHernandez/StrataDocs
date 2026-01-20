import React, { useEffect, useState, useRef } from 'react';
import { Search, X, FileText, Hash, ArrowRight } from 'lucide-react';

const MOCK_RESULTS = [
  { id: '1', title: 'Installation', category: 'Getting Started', href: '#installation' },
  { id: '2', title: 'Authentication', category: 'API Reference', href: '#authentication' },
  { id: '3', title: 'API Keys', category: 'Core Concepts', href: '#api-keys' },
  { id: '4', title: 'Rate Limiting', category: 'Core Concepts', href: '#rate-limiting' },
  { id: '5', title: 'Webhooks', category: 'Advanced', href: '#webhooks' },
  { id: '6', title: 'SDK Support', category: 'Resources', href: '#sdks' },
];

const SearchOverlay = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_RESULTS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = MOCK_RESULTS.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          onNavigate(results[selectedIndex].href);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onNavigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transform transition-all animate-in fade-in zoom-in-95 duration-200 border dark:border-slate-800">
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-4 py-3">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 text-lg h-10"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <div className="text-xs font-medium border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">ESC</div>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    onNavigate(result.href);
                    onClose();
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors group ${
                    index === selectedIndex ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className={`mr-4 p-2 rounded-md ${
                    index === selectedIndex ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm'
                  }`}>
                    {result.href.startsWith('#') ? <Hash size={18} /> : <FileText size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${index === selectedIndex ? 'text-primary-900 dark:text-primary-100' : 'text-slate-900 dark:text-slate-200'}`}>
                      {result.title}
                    </div>
                    <div className={`text-xs ${index === selectedIndex ? 'text-primary-600 dark:text-primary-300' : 'text-slate-400 dark:text-slate-500'}`}>
                      {result.category}
                    </div>
                  </div>
                  {index === selectedIndex && (
                    <ArrowRight size={16} className="text-primary-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <div className="flex gap-4">
            <span className="flex items-center"><span className="font-semibold mr-1">↑↓</span> to navigate</span>
            <span className="flex items-center"><span className="font-semibold mr-1">↵</span> to select</span>
          </div>
          <div className="flex items-center">
             <span className="mr-2">Strata Docs v2.4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
