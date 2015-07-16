var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');

// bower alias
var bower_dir = __dirname + '/bower_components';

// webpack config obj
var config = {
    
    context: __dirname + '/s',
    
    entry: {
        index: './index/entry',
        page1: [ './page1/a', './page1/b' ],
        page2: './page2/entry',
        vendors: [ 'jquery', 'velocity', 'vue', 'boombox' ]
    },
    
    resolve: {
        alias: {}
    },
    
    output: {
        path: './dist',
        filename: '[name].bundle.js'
    },
    
    module: {
        noParse: [],
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    // my util mothod
    addVendor: function (name, path, isPlugin) {
        this.resolve.alias[name] = path;
        
        if (!isPlugin) {
            this.module.noParse.push(new RegExp(path));
        }
    },
};

config.addVendor('jquery',   bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('velocity', bower_dir + '/velocity/velocity.min.js', true);
config.addVendor('vue', bower_dir + '/vue/dist/vue.min.js');
config.addVendor('boombox', bower_dir + '/boombox.js/boombox.min.js');

module.exports = config;