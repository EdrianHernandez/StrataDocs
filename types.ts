import React from 'react';

export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  href: string;
}