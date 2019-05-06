const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['react-intl', {"messagesDir": "./build/messages",
        "enforceDescriptions": false}], config);  // adding messages

    config = injectBabelPlugin(['recharts'], config);  // add charts
    config = injectBabelPlugin(['import', { libraryName: 'antd', "customName": (name) => {
        // if (name === 'TimePicker'){
        //   return 'antd/lib/custom-time-picker';
        // }
        return `antd/lib/${name}`;
      }, style: true }], config);  // change importing css to less
     config = rewireLess.withLoaderOptions({
              modifyVars: {
                  "@text-color": "fade(#000, 80%)",
                  "@blue-6": "#51ade2",
                  "@body-background": "#f2f2f2",
                  "@layout-body-background": "#f2f2f2",
                  //"@heading-color-dark": "#565a5c",
                  //"@text-color-secondary-dark": "#565a5c",
                  "@layout-sider-background": "#3882C3",
                  "@layout-trigger-background": "#3882C3",
                  "@menu-dark-color": "#fff",
                  "@menu-dark-bg": "#3882C3",
                  "@menu-dark-item-active-bg": "#3271A9",//5AC2C4
                  "@menu-dark-highlight-color": "#6cbcee",
                  "@menu-dark-submenu-bg": "#3782c3",
                  "@layout-footer-background": "#303030",
                  
                  // avatar
                  "@avatar-size-lg": '60px',
                  "@card-padding-wider": '24px',
                  //"@avatar-font-size-lg": '40px',
              },
              javascriptEnabled: true
     })(config, env);
    // do stuff with the webpack config...
    return config;
};