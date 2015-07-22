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
        index: './index/entry',
        // 'page4/top': './page4/top/entry',
        vendors: [ 'jquery', 'velocity', 'velocity.ui', 'vue', 'boombox' ],
        // core: [ 'jquery', 'velocity', 'velocity.ui', 'vue', 'boombox', 'core/entry' ]
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
    addVendor: function (name, path, isJqPlugin) {
        this.resolve.alias[name] = path;

        if (!isJqPlugin) {
            this.module.noParse.push(new RegExp(path));
        }
    },
};

config.addVendor('jquery',   bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('velocity', bower_dir + '/velocity/velocity.min.js', true);
config.addVendor('velocity.ui', bower_dir + '/velocity/velocity.ui.min.js', true);
config.addVendor('vue', bower_dir + '/vue/dist/vue.min.js');
config.addVendor('boombox', bower_dir + '/boombox.js/boombox.min.js');

module.exports = config;