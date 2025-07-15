import React from 'react';
import type { ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Todo App</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            React Todo App - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 