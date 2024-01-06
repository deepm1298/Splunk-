const path = require('path');
const webpackMerge = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        Component6: path.join(__dirname, 'src/Component6.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
});
