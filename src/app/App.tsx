import React from 'react';
import styles from './app.module.scss';
import { useRoutes } from 'react-router-dom';
import Root from '@routes/root';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    supportedLngs: ['en', 'tr'],
    lng: document.querySelector('html')?.lang,
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
  });

function App(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Navbar />
      {useRoutes(Root)}
      <Footer />
    </div>
  );
}

export default App;
