const CracoAntDesignPlugin = require("craco-antd");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
// const path = require('path');

module.exports = {
    webpack: {
        // alias: {
        //     let alias = (config.resolve.alias || {});
        //     alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, "./src/icons.js");
        //     return alias;
        // },
        plugins: [
          new WebpackBar({ profile: true }),
          ...(process.env.NODE_ENV === "development"
            ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
            : [])
        ]
      },
  plugins: [{ plugin: CracoAntDesignPlugin }],
  jest: {
    configure: {
      moduleDirectories: ['node_modules'],
      transformIgnorePatterns: [ 'node_modules/?!(antd|rc-.+)/' ]
    }
}
};