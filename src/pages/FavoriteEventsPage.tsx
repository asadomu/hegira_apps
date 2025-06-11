/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import EventCard from '../components/EventCard'; // Re-use EventCard

const FavoriteEventsPage: React.FC = () => {
  const { t } = useLanguage();

  // Dummy data for favorite events - in a real app, this would come from user data
  const favoriteEventsData = Array.from({ length: 3 }, (_, i) => ({
    id: `fav-${i + 1}`,
    organizerIconUrl: `https://avatar.vercel.sh/organizerFav${i+1}.png?text=F${i+1}`,
    organizerName: t('dummy.eventOrganizer', {id: (i + 1).toString()}),
    imageUrl: `https://source.unsplash.com/random/800x300?favorite,event&sig=fav${i + 1}`,
    name: t('dummy.eventName', {id: (i + 1).toString()}),
    summary: t('dummy.eventSummary'),
    date: `Nov ${10 + i}, 2025`,
    time: '20:00 WIB',
    location: 'Grand Ballroom',
    price: `IDR ${300000 + i * 25000}`,
  }));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gradient-hegra mb-8 text-center">{t('favoriteEventsPage.title')}</h1>
      
      {favoriteEventsData.length > 0 ? (
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center max-w-2xl mx-auto">
            {t('favoriteEventsPage.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEventsData.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-xl text-gray-500 dark:text-gray-400 text-center py-10">
          You haven't added any events to your favorites yet.
        </p>
      )}
    </div>
  );
};

export default FavoriteEventsPage;
