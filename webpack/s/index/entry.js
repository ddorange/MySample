console.log('index');

/**
 * TEST: core module
 * @desc
 */
// var core = require('./../core/entry');
// console.log(core.name);
// console.log('core load Vue?', core.isVue());

/**
 * TEST: vendor
 * @desc: 
 */
var Vue = require('vue');
console.log('this load Vue?', !!Vue);


/**
 * TEST: jquery
 * @desc: global import
 */
$('#js-jq').html('jQuery');


// TEST: jquery plugin
var vlc = require('./velocity');
vlc.setup();

// TEST: lazy load
var lazy = require('./lazy-load');
lazy.setup();