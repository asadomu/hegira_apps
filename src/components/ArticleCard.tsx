/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArticleCardProps {
  article: {
    id: string | number;
    title: string;
    thumbnailUrl: string; // Square or 4:3
    snippet: string;
  };
  onReadMore: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onReadMore }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out w-full">
      <img 
        className="w-full h-40 object-cover aspect-square sm:aspect-[4/3]" // Square on small, 4:3 on sm+
        src={article.thumbnailUrl || `https://source.unsplash.com/random/400x300?article&sig=${article.id}`} 
        alt={article.title} 
      />
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1 h-12 overflow-hidden" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }} title={article.title}>
          {article.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 h-8 overflow-hidden mb-3" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
          {article.snippet}
        </p>
        <button 
          onClick={onReadMore}
          className="text-xs text-[#339999] dark:text-[#57c5c5] font-semibold hover:text-[#2a8585] dark:hover:text-[#339999] transition-colors"
        >
          {t('articles.readMore')} &rarr;
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;