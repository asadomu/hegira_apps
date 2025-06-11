/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ArticleCard from '../components/ArticleCard'; // Re-use ArticleCard for consistency

const AllArticlesPage: React.FC = () => {
  const { t } = useLanguage();

  // Dummy data for more articles
  const articlesData = Array.from({ length: 12 }, (_, i) => ({
    id: `all-art-${i + 1}`,
    title: t('dummy.articleTitle', {id: (i + 1).toString()}),
    thumbnailUrl: `https://source.unsplash.com/random/400x300?blog,writing&sig=allArt${i + 1}`,
    snippet: t('dummy.articleSnippet'),
  }));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gradient-hegra mb-8 text-center">{t('allArticlesPage.title')}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center max-w-2xl mx-auto">
        {t('allArticlesPage.description')}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articlesData.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onReadMore={() => { /* Navigate to specific article page in future */ }} 
          />
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPage;
