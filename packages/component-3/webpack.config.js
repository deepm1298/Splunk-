const path = require('path');
const webpackMerge = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        Component3: path.join(__dirname, 'src/Component3.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
});
