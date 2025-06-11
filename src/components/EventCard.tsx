/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { MapPin, CalendarDays, Users, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EventCardProps {
  event: {
    id: string | number;
    organizerIconUrl?: string;
    organizerName: string;
    imageUrl: string;
    name: string;
    summary: string;
    date: string;
    time: string;
    location: string;
    price: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out w-full">
      <div className="relative">
        <img 
          className="w-full h-40 object-cover aspect-[16/6]" // Adjusted to 16/6 aspect ratio as requested
          src={event.imageUrl || `https://source.unsplash.com/random/800x300?event&sig=${event.id}`} 
          alt={event.name} 
        />
        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center">
            {event.organizerIconUrl ? 
              <img src={event.organizerIconUrl} alt={event.organizerName} className="w-4 h-4 rounded-full mr-1.5"/> :
              <Users size={12} className="mr-1.5" />
            }
          <span>{event.organizerName}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate" title={event.name}>
          {event.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 h-8 overflow-hidden mb-2" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
          {event.summary}
        </p>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-3">
          <div className="flex items-center">
            <CalendarDays size={12} className="mr-1.5 text-[#339999]" />
            <span>{event.date} - {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={12} className="mr-1.5 text-[#339999]" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        
        <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gradient-hegra">
                {event.price}
            </p>
            <button className="text-xs button-gradient-hegra text-white font-semibold py-1.5 px-3 rounded-full hover:opacity-90 transition-opacity">
                {t('navbar.myTicket')} {/* Re-using translation for 'Get Ticket' or similar */}
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;