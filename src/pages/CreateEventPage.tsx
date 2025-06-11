/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CreateEventPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold text-gradient-hegra mb-6">{t('createEventPage.title')}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {t('createEventPage.description')}
      </p>
      {/* Future event creation form will go here */}
      <div className="mt-8 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Event Form Area</p>
      </div>
    </div>
  );
};

export default CreateEventPage;
