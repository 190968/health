const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['react-intl', {"messagesDir": "./build/messages",
        "enforceDescriptions": false}], config);  // change importing css to less
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
    config = rewireLess.withLoaderOptions({
             modifyVars: {
                 "@body-background": "#f2f2f2",
                 "@layout-footer-background": "#303030",
             },
    })(config, env);
    // do stuff with the webpack config...
    return config;
};