const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'production.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jui-core.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
}