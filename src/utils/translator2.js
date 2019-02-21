const extract = require('react-intl-cra');
const translate = require('google-translate-api');
const fs = require('fs');
const globSync = require('glob');
const mkdirpSync = require('mkdirp');


// translate('Ik spreek Engels', {to: 'en'}).then(res => {
//     console.log(res.text);
//     //=> I speak English
//     console.log(res.from.language.iso);
//     //=> nl
// }).catch(err => {
//     console.error(err);
// });

 


const langs = [
    'en',
    'ru',
    //'de',
]

const outputLanguageDataDir = './src/locales2/';
const outputExtractedLanguageDataDir = outputLanguageDataDir+'/extractedMessages/';
const outputMissingLanguageDataDir = outputLanguageDataDir+'/missing/';
mkdirpSync(outputLanguageDataDir);
mkdirpSync(outputMissingLanguageDataDir);
mkdirpSync(outputExtractedLanguageDataDir);


let baseTranslations = [];
let baseTranslationsKeys = [];
langs.map(lang => {
    console.log('Start '+lang);

    const filePattern = outputLanguageDataDir + lang+ '.json';
    // Aggregates the default messages that were extracted from the example app's
    // React components via the React Intl Babel plugin. An error will be thrown if
    // there are messages in different components that use the same `id`. The result
    // is a flat collection of `id: message` pairs for the app's default locale.
   
    //console.log(existingLanguageMessages);
    
    
    let defaultMessagesRaw = extract('./src/**/'+lang+'.js');
    let missingTranslations = [];
    //console.log(defaultMessages);
    let defaultMessages = defaultMessagesRaw.reduce((collection, descriptors) => {
        //console.log(collection);
        //console.log(descriptors);
        const {id, defaultMessage} = descriptors;
                // descriptors.forEach(({ id, defaultMessage }) => {
                    if (collection.hasOwnProperty(id)) {
                        throw new Error(`Duplicate message id: ${id}`);
                    }
                    collection[id] = defaultMessage;
                // });
    
                return collection;
            }, {});

    const defaultMessagesKeys = Object.keys(defaultMessages);
    if (lang === 'en') {
        baseTranslationsKeys = defaultMessagesKeys;
        baseTranslations = defaultMessagesRaw;
    } else {
        let existingMessages = fs.readFileSync(filePattern, 'utf8');
        existingMessages = JSON.parse(existingMessages);
        //console.log(existingMessages);
        // compare translations with existing messages
        const existingMessagesKeys = Object.keys(existingMessages);
        const missingKeys = existingMessagesKeys.filter(message => !defaultMessagesKeys.includes(message));
        

        //console.log(existingLanguageMessages);
       
        //console.log(existingMessagesKeys);
        //console.log(missingKeys);
        if (missingKeys.length > 0) {
            // merge

            defaultMessages = Object.assign(existingMessages, defaultMessages);
        }
        //return true;
        // const missingKeys = baseTranslationsKeys.filter(message => !defaultMessagesKeys.includes(message));
        // console.log('translations', baseTranslationsKeys.length);
        // console.log('missingKeys', missingKeys.length);
        // // now translate missing keys
        // missingTranslations = missingKeys.map(missingKey => {
           
        //     return baseTranslations.find(({id}) => id === missingKey);
        // })
 
    }
  
       
        fs.writeFileSync(outputExtractedLanguageDataDir + lang+ '.json', ` ${JSON.stringify(defaultMessagesRaw, null, 2)}`);
        fs.writeFileSync(outputLanguageDataDir + lang+ '.json', ` ${JSON.stringify(defaultMessages, null, 2)}`);
        // if (missingTranslations.length > 0) {
        // fs.writeFileSync(outputMissingLanguageDataDir + lang+ '.json', ` ${JSON.stringify(missingTranslations, null, 2)}`);
        // }
        console.log('Finish '+lang);
})