const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['react-intl', {"messagesDir": "./build/messages",
        "enforceDescriptions": false}], config);  // change importing css to less
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
    config = rewireLess.withLoaderOptions({
             modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env);
    // do stuff with the webpack config...
    return config;
};