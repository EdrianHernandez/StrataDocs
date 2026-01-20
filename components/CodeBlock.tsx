import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'bash', 
  filename,
  showLineNumbers = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighting simulation (splitting by keywords for demo visuals)
  const highlightCode = (input: string) => {
    return input.split('\n').map((line, i) => (
      <div key={i} className="table-row">
        {showLineNumbers && (
          <span className="table-cell text-right pr-4 text-slate-500 select-none text-xs w-8">
            {i + 1}
          </span>
        )}
        <span className="table-cell whitespace-pre">
          {line.split(' ').map((word, j) => {
            if (word.startsWith('//') || word.startsWith('#')) return <span key={j} className="text-slate-500">{word} </span>;
            if (['const', 'let', 'var', 'import', 'from', 'function', 'return', 'if', 'else'].includes(word)) return <span key={j} className="text-purple-400">{word} </span>;
            if (['string', 'number', 'boolean', 'void', 'React'].includes(word)) return <span key={j} className="text-yellow-300">{word} </span>;
            if (word.includes('(') || word.includes(')')) return <span key={j} className="text-blue-300">{word} </span>;
             if (word.startsWith('"') || word.startsWith("'")) return <span key={j} className="text-green-300">{word} </span>;
            return <span key={j} className="text-slate-200">{word} </span>;
          })}
        </span>
      </div>
    ));
  };

  return (
    <div className="code-snippet-box my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 dark:border-slate-700 shadow-lg group">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            {filename && (
              <span className="ml-4 text-xs font-mono text-slate-400 flex items-center">
                <Terminal size={12} className="mr-1.5" />
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{language}</span>
            <button
              onClick={handleCopy}
              className="ml-2 p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Copy code"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
      
      {!filename && !language && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <button
              onClick={handleCopy}
              className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors shadow-md"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
        </div>
      )}

      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed custom-scrollbar">
        <div className="table w-full border-collapse">
          {highlightCode(code)}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;