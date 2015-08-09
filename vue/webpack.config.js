var webpack = require('webpack');

// bower alias
var bower_dir = __dirname + '/bower_components';

// webpack config obj
var config = {
    
    context: __dirname + '/s',
    
    entry: {
        demo1: './demo1/entry',
        demo2: './demo2/entry',
        demo3: './demo3/entry',
        demo4: './demo4/entry',
        vendors: [ 'jquery', 'velocity', 'velocity.ui', 'vue' ],
    },
    
    resolve: {
        alias: {}
    },
    
    output: {
        path: './dist/',
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    
    module: {
        noParse: [],
        loaders: [
            { test: /\.css$/, loader: 'style/url!file?name=[name].css!' }        // load css using link tag
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    devtool: '#source-map',

    // my util mothod
    addVendor: function (name, path, isJqPlugin) {
        this.resolve.alias[name] = path;

        if (!isJqPlugin) {
            this.module.noParse.push(new RegExp(path));
        }
    },
};

config.addVendor('lodash',      bower_dir + '/lodash/dist/lodash.underscore.min.js');
config.addVendor('jquery',      bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('velocity',    bower_dir + '/velocity/velocity.min.js', true);
config.addVendor('velocity.ui', bower_dir + '/velocity/velocity.ui.min.js', true);
config.addVendor('vue',         bower_dir + '/vue/dist/vue.js');

module.exports = config;