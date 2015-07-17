/**
 * TEST: page
 */
console.log('page2');

/**
 * TEST: css
 */
require('./style.css');

/**
 * TEST: core module
 * @desc
 */
// var core = require('./../core/entry');
// console.log(core.name);
// console.log('core load Vue?', core.isVue());


/**
 * TEST: page module
 */
var content = require('./content');
console.log(content);


/**
 * TEST: lib
 */
var Vue = require('vue');
console.log('this load Vue?', !!Vue);


/**
 * TEST: jquery
 * @desc: global import
 */
$('#js-jq').attr('style', 'color: blue;');


/**
 * TEST: jquery plugin
 * @desc: 
 */
$('#js-vlc').velocity({ translateX: 100 }, {
    duration: 500,
    delay: 500,
    begin: function(argument) {
        console.log('velocity begin');
    },
    complete: function () {
        console.log('velocity complete');
    }
});

$('#js-vlc-ui').velocity('callout.shake', {
    delay: 1000,
    begin: function(argument) {
        console.log('velocity-ui begin');
    },
    complete: function () {
        console.log('velocity-ui complete');
    }
});