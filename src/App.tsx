/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MyTicketPage from './pages/MyTicketPage';
import CreateEventPage from './pages/CreateEventPage';
import AllArticlesPage from './pages/AllArticlesPage';
import FavoriteEventsPage from './pages/FavoriteEventsPage';

export type Page = 'home' | 'my-ticket' | 'create-event' | 'all-articles' | 'favorite-events';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'my-ticket':
        return <MyTicketPage />;
      case 'create-event':
        return <CreateEventPage />;
      case 'all-articles':
        return <AllArticlesPage />;
      case 'favorite-events':
        return <FavoriteEventsPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;