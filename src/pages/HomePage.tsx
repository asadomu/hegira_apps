/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';
import EventCard from '../components/EventCard';
import ArticleCard from '../components/ArticleCard';
import PromoBannerCard from '../components/PromoBannerCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  // Slider state
  const heroSlides = [
    'https://source.unsplash.com/random/1600x600?event,concert,festival&sig=hero1', // Adjusted resolution for 16:6
    'https://source.unsplash.com/random/1600x600?technology,conference,innovation&sig=hero2',
    'https://source.unsplash.com/random/1600x600?art,exhibition,gallery&sig=hero3',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Auto-play every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);


  // Dummy Data
  const popularEventsData = Array.from({ length: 5 }, (_, i) => ({
    id: `pop-${i + 1}`,
    organizerIconUrl: `https://avatar.vercel.sh/organizer${i+1}.png?text=O${i+1}`,
    organizerName: t('dummy.eventOrganizer', {id: (i + 1).toString()}),
    imageUrl: `https://source.unsplash.com/random/800x300?concert,festival&sig=pop${i + 1}`,
    name: t('dummy.eventName', {id: (i + 1).toString()}),
    summary: t('dummy.eventSummary'),
    date: `Dec ${15 + i}, 2025`,
    time: '19:00 WIB',
    location: 'Jakarta Convention Center',
    price: `IDR ${250000 + i * 50000}`,
  }));

  const exploreEventsData = Array.from({ length: 5 }, (_, i) => ({
    id: `exp-${i + 1}`,
    organizerIconUrl: `https://avatar.vercel.sh/organizerExp${i+1}.png?text=E${i+1}`,
    organizerName: t('dummy.eventOrganizer', {id: (i + 6).toString()}),
    imageUrl: `https://source.unsplash.com/random/800x300?workshop,conference&sig=exp${i + 1}`,
    name: t('dummy.eventName', {id: (i + 6).toString()}),
    summary: t('dummy.eventSummary'),
    date: `Jan ${5 + i}, 2026`,
    time: '10:00 WIB',
    location: 'Online Event',
    price: 'Free',
  }));

  const promoBannersData = [
    { id: 'promo-1', imageUrl: 'https://source.unsplash.com/random/600x250?sale,ticket&sig=promo1', title: t('dummy.promoTitle'), subtitle: t('dummy.promoSubtitle'), buttonText: t('articles.readMore'), buttonLink: '#' },
    { id: 'promo-2', imageUrl: 'https://source.unsplash.com/random/600x250?music,event&sig=promo2', title: 'New Year Festival', subtitle: 'Book your spot now!', buttonText: 'Explore', buttonLink: '#' },
    { id: 'promo-3', imageUrl: 'https://source.unsplash.com/random/600x250?food,bazaar&sig=promo3', title: 'Weekend Food Bazaar', buttonText: 'Details', buttonLink: '#' },
  ];

  const articlesData = Array.from({ length: 5 }, (_, i) => ({
    id: `art-${i + 1}`,
    title: t('dummy.articleTitle', {id: (i + 1).toString()}),
    thumbnailUrl: `https://source.unsplash.com/random/400x300?technology,lifestyle&sig=art${i + 1}`,
    snippet: t('dummy.articleSnippet'),
  }));

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      <span className="text-gradient-hegra">{children}</span>
    </h2>
  );
  
  const HorizontalScrollContainer: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <div className="flex overflow-x-auto space-x-4 pb-4 -mb-4 hide-scrollbar">
      {children}
    </div>
  );


  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Banner Slider Section */}
      <section 
        className="relative w-full aspect-[16/6] overflow-hidden" // Changed from aspect-video (16:9) to 16:6
        role="region"
        aria-roledescription="carousel"
        aria-label="Hero Banner"
      >
        <div className="relative h-full w-full">
          {heroSlides.map((slideUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={index !== currentSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
            >
              <img 
                src={slideUrl} 
                alt={`Hero image ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/30"></div> {/* Optional: subtle overlay */}
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            ></button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 pb-12">
        {/* Popular Events Section */}
        <section aria-labelledby="popular-events-title">
          <SectionTitle><span id="popular-events-title">{t('popularEvents.title')}</span></SectionTitle>
          <HorizontalScrollContainer>
            {popularEventsData.map(event => (
              <div key={event.id} className="w-80 md:w-1/3 flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </HorizontalScrollContainer>
        </section>

        {/* Promo Banner Section */}
        <section aria-labelledby="promo-banner-title">
            {/* Using a subtle title or omitting if design implies it */}
            {/* <h2 id="promo-banner-title" className="sr-only">Promotions</h2> */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promoBannersData.slice(0,3).map(promo => (
                    <PromoBannerCard key={promo.id} promo={promo} />
                ))}
            </div>
        </section>

        {/* Explore Events Section */}
        <section aria-labelledby="explore-events-title">
          <SectionTitle><span id="explore-events-title">{t('exploreEvents.title')}</span></SectionTitle>
          <HorizontalScrollContainer>
            {exploreEventsData.map(event => (
              <div key={event.id} className="w-80 md:w-1/3 flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </HorizontalScrollContainer>
        </section>

        {/* Articles Section */}
        <section aria-labelledby="articles-title">
          <SectionTitle><span id="articles-title">{t('articles.title')}</span></SectionTitle>
          <HorizontalScrollContainer>
            {articlesData.map(article => (
              <div key={article.id} className="w-72 md:w-1/4 flex-shrink-0">
                <ArticleCard article={article} onReadMore={() => setCurrentPage('all-articles')} />
              </div>
            ))}
          </HorizontalScrollContainer>
          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage('all-articles')}
              className="button-gradient-hegra text-white font-semibold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              {t('articles.seeAll')}
            </button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section aria-labelledby="newsletter-title" className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow">
          <div className="max-w-xl mx-auto text-center">
            <h2 id="newsletter-title" className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
              <span className="text-gradient-hegra">{t('newsletter.title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('newsletter.description')}</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">{t('newsletter.emailPlaceholder')}</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder={t('newsletter.emailPlaceholder')}
                className="flex-grow px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                className="button-gradient-hegra font-semibold py-2.5 px-6 rounded-md hover:opacity-90 transition-opacity"
              >
                {t('newsletter.subscribeButton')}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;