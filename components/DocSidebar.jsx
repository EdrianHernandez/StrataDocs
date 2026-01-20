import React from 'react';
import { ChevronRight, Box } from 'lucide-react';

const DocSidebar = ({ 
  navItems, 
  currentPath, 
  onNavigate,
  isOpenMobile,
  closeMobile
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:bg-transparent lg:border-r-0 lg:w-64 lg:block shrink-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto px-6 py-6 custom-scrollbar">
          
          {/* Mobile Logo area */}
          <div className="lg:hidden flex items-center mb-8">
             <div className="bg-primary-600 text-white p-1.5 rounded-lg mr-2.5">
               <Box size={20} />
             </div>
             <span className="font-bold text-lg text-slate-900 dark:text-white">Strata</span>
          </div>

          <nav className="space-y-8">
            {navItems.map((group, groupIndex) => (
              <div key={groupIndex} className="sidebar-group">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
                  {group.title}
                </h3>
                <ul className="space-y-1">
                  {group.items?.map((item, itemIndex) => {
                    const isActive = currentPath === item.href;
                    return (
                      <li key={itemIndex}>
                        <button
                          onClick={() => {
                            onNavigate(item.href);
                            closeMobile();
                          }}
                          className={`sidebar-nav-item w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 group ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          {item.title}
                          {isActive && <ChevronRight size={14} className="text-primary-500" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
          
          <div className="mt-10 p-4 bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl border border-primary-100/50 dark:border-slate-700">
             <h4 className="text-sm font-semibold text-primary-900 dark:text-slate-200 mb-1">Need help?</h4>
             <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Contact our support team for specialized assistance.</p>
             <button className="text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 py-1.5 px-3 rounded-md transition-colors w-full">
               Contact Support
             </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DocSidebar;
