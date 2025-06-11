/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';
import { Instagram, Linkedin, MessageSquareText, Facebook, Mail, MapPin } from 'lucide-react'; // Using MessageSquareText for TikTok placeholder

interface FooterProps {
  setCurrentPage: (page: Page) => void; // Or use actual navigation if implemented
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: MessageSquareText, href: '#', label: 'TikTok' }, // Placeholder for TikTok
    { Icon: Facebook, href: '#', label: 'Facebook' },
  ];

  const userLinkKeys = ['faq', 'terms', 'privacy', 'refund', 'contactSupport', 'becomeOrganizer'] as const;

  // It's highly recommended to download the logo and place it in your public folder (e.g., /logo.png)
  // and use a local path like "/logo.png" for better performance and reliability.
  const logoUrl = "https://drive.google.com/uc?export=view&id=1f2Es3t8i01xzjWLDgkFesPXWq3AqPXDG";


  return (
    <footer style={{ backgroundColor: '#15043A' }} className="text-[#FEFFFF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Hegra Logo & Description */}
          <div>
            <img 
              src={logoUrl} 
              alt={t('appName')} 
              className="h-10 w-auto mb-3" // Adjusted height, e.g., 40px. w-auto maintains aspect ratio.
            />
            <p className="text-sm text-[#FEFFFF]">{t('footer.description')}</p>
          </div>

          {/* Contact Address */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#FEFFFF]">{t('footer.userLinks.contactSupport')}</h3>
            <address className="not-italic text-sm space-y-1 text-[#FEFFFF]">
              <p className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-[#339999]" />
                <span>{t('footer.contactAddress')}</span>
              </p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2 text-[#339999]" />
                <a href="mailto:support@hegra.com" className="hover:text-[#f5af47] transition-colors">support@hegra.com</a>
              </p>
            </address>
          </div>

          {/* User Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#FEFFFF]">Links</h3>
            <ul className="space-y-2 text-sm text-[#FEFFFF]">
              {userLinkKeys.map(key => (
                <li key={key}>
                  <a href="#" className="hover:text-[#f5af47] transition-colors" onClick={(e) => { e.preventDefault(); /*setCurrentPage('some-page')*/ }}>
                    {t(`footer.userLinks.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#FEFFFF]">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#FEFFFF] hover:text-[#f5af47] transition-colors"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-[#FEFFFF]">
          <p>{t('footer.copyright', { year: currentYear.toString() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;