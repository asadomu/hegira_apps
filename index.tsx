/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import '@tailwindcss/browser'; // Initializes Tailwind CSS JIT

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './index.css';
import { LanguageProvider } from './src/contexts/LanguageContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}