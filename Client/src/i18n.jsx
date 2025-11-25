import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en';
import es from './translations/es';
import fr from './translations/fr';
import de from './translations/de';
import it from './translations/it';
import ja from './translations/ja';
import ko from './translations/ko';
import zh from './translations/zh';
import ur from './translations/ur';
import ar from './translations/ar';
import hi from './translations/hi';
import tr from './translations/tr';

// Initialize i18next
i18n
    .use(LanguageDetector) // Detects user language
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: en
            },
            es: {
                translation: es
            },
            fr: {
                translation: fr
            },
            de: {
                translation: de
            },
            it: {
                translation: it
            },
            ja: {
                translation: ja
            },
            ko: {
                translation: ko
            },
            zh: {
                translation: zh
            }
            ,
            ur: {
                translation: ur
            }
            ,
            ar: {
                translation: ar
            }
            ,
            hi: {
                translation: hi
            }
            ,
            tr: {
                translation: tr
            }
        },
        fallbackLng: 'en', // Use English if language detection fails
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false, // React already safes from xss
        },
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'preferredLanguage',
            caches: ['localStorage'], // Cache the language selection
        },
        react: {
            useSuspense: false // Prevents issues with Suspense
        }
    });

export default i18n;
