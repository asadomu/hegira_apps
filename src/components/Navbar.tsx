/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';
import { Search, Star, Ticket, PlusCircle, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  setCurrentPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const changeLanguage = (lang: 'en' | 'id') => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const navButtonClass = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";
  const mobileNavButtonClass = "block w-full text-left " + navButtonClass;

  // It's highly recommended to download the logo and place it in your public folder (e.g., /logo.png)
  // and use a local path like "/logo.png" for better performance and reliability.
  const logoUrl = "https://drive.google.com/uc?export=view&id=1f2Es3t8i01xzjWLDgkFesPXWq3AqPXDG";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and Search */}
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="flex-shrink-0">
              <img 
                src={logoUrl} 
                alt={t('appName')} 
                className="h-9 w-auto" // Adjusted height, e.g., 36px. w-auto maintains aspect ratio.
              />
            </button>
            <div className="hidden md:ml-6 md:flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder={t('navbar.searchPlaceholder')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right side: Buttons and Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={() => setCurrentPage('favorite-events')} className={navButtonClass}>
              <Star size={18} /><span>{t('navbar.myFavorite')}</span>
            </button>
            <button onClick={() => setCurrentPage('my-ticket')} className={navButtonClass}>
              <Ticket size={18} /><span>{t('navbar.myTicket')}</span>
            </button>
            <button 
              onClick={() => setCurrentPage('create-event')} 
              className={`${navButtonClass} bg-[#339999] hover:bg-[#339999] text-white`}
            >
              <PlusCircle size={18} /><span>{t('navbar.createEvent')}</span>
            </button>
            <div className="relative" ref={languageDropdownRef}>
              <button onClick={toggleLanguageDropdown} className={navButtonClass}>
                <Globe size={18} /> <span>{language.toUpperCase()}</span>
              </button>
              {isLanguageDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => changeLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`} role="menuitem">
                      {t('navbar.english')}
                    </button>
                    <button onClick={() => changeLanguage('id')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'id' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`} role="menuitem">
                      {t('navbar.indonesian')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder={t('navbar.searchPlaceholder')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            <button onClick={() => { setCurrentPage('favorite-events'); setIsMobileMenuOpen(false); }} className={mobileNavButtonClass}>
              <Star size={18} /><span>{t('navbar.myFavorite')}</span>
            </button>
            <button onClick={() => { setCurrentPage('my-ticket'); setIsMobileMenuOpen(false); }} className={mobileNavButtonClass}>
               <Ticket size={18} /><span>{t('navbar.myTicket')}</span>
            </button>
            <button 
              onClick={() => { setCurrentPage('create-event'); setIsMobileMenuOpen(false); }} 
              className={`${mobileNavButtonClass} bg-[#339999] hover:bg-[#339999] text-white`}
            >
               <PlusCircle size={18} /><span>{t('navbar.createEvent')}</span>
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <button onClick={() => changeLanguage('en')} className={`${mobileNavButtonClass} ${language === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>English</button>
                <button onClick={() => changeLanguage('id')} className={`${mobileNavButtonClass} ${language === 'id' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>Indonesian</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;