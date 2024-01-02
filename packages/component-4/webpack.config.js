const path = require('path');
const webpackMerge = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        Component4: path.join(__dirname, 'src/Component4.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
});
