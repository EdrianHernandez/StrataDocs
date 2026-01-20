import React, { useEffect, useState } from 'react';

const TableOfContents = ({ items }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="toc-container hidden xl:block w-64 shrink-0 order-2 sticky top-24 self-start pl-8 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-4 tracking-tight">On this page</h5>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(item.id);
              }}
              className={`toc-link block transition-colors duration-200 border-l-2 pl-3 -ml-px ${
                activeId === item.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
        <a href="#" className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          Suggest an edit
        </a>
        <a href="#" className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-2">
          Report an issue
        </a>
      </div>
    </nav>
  );
};

export default TableOfContents;
