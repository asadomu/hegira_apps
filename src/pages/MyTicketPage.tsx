/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MyTicketPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold text-gradient-hegra mb-6">{t('myTicketPage.title')}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{t('myTicketPage.description')}</p>
      
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <label htmlFor="ticket-email" className="sr-only">{t('myTicketPage.emailPlaceholder')}</label>
        <input
          id="ticket-email"
          type="email"
          placeholder={t('myTicketPage.emailPlaceholder')}
          className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          className="button-gradient-hegra text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          {t('myTicketPage.findButton')}
        </button>
      </form>
    </div>
  );
};

export default MyTicketPage;
