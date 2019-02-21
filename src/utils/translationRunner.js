// translationRunner.js
const manageTranslations = require('react-intl-translations-manager').default;
 
// es2015 import
// import manageTranslations from 'react-intl-translations-manager';
 
manageTranslations({
  messagesDirectory: 'src/locales2/extractedMessages',
  translationsDirectory: 'src/locales2',
  languages: ['en', 'ru'] // any language you need
});