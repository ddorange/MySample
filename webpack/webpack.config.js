var webpack = require('webpack');
var grunt = require('grunt');
var glob = require('glob');
var _ = require('lodash')

// bower alias
var bower_dir = __dirname + '/bower_components';

// webpack config obj
var config = {
    
    context: __dirname + '/s',
    
    entry: {
        // demo1: './demo1/entry',
        // demo2: './demo2/entry',
        // demo3: './demo3/entry',
        // 'demo4/top': './demo4/top/entry',
        // demo5: './demo5/entry',
        vendors: [ 'jquery', 'velocity', 'velocity.ui', 'vue', 'boombox' ],
        // core: [ 'jquery', 'velocity', 'velocity.ui', 'vue', 'boombox', 'core/entry' ]
    },
    
    resolve: {
        alias: {
            core: __dirname +  '/s/core'
        }
    },
    
    output: {
        path: './dist/',
        publicPath: '/dist/',
        filename: '[name]/bundle.js',
        chunkFilename: '[name].[id].js'
    },
    
    module: {
        noParse: [],
        loaders: [
            // { test: /\.css$/, loader: 'style!css!file' },                    // load css inline
            { test: /\.css$/, loader: 'style/url!file?name=[name].css!' }        // load css using link tag
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

    devtool: '#source-map',

    // my util mothod
    addVendor: function (name, path, isJqPlugin) {
        this.resolve.alias[name] = path;

        if (!isJqPlugin) {
            this.module.noParse.push(new RegExp(path));
        }
    },

    hoge: [],
};


// ./s 配下の entry.js を検索して config.entry  に追加する
var files = glob.sync('./s/**/*/entry.js');
var regex = /(^.\/s\/)(.*)(?=\/entry.js)/;

_.each(files, function (file) {
    var name = file.toString().match(regex)[2],
        path = './' + name + '/entry.js';
    
    if (name !== 'core') {
        config.entry[name] = path;
        grunt.log.writeln(name + ' : ' + path);
    }
});


config.addVendor('jquery',   bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('velocity', bower_dir + '/velocity/velocity.min.js', true);
config.addVendor('velocity.ui', bower_dir + '/velocity/velocity.ui.min.js', true);
config.addVendor('vue', bower_dir + '/vue/dist/vue.min.js');
config.addVendor('boombox', bower_dir + '/boombox.js/boombox.min.js');

module.exports = config;