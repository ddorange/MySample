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
var $p = $('p');
$p.attr('style', 'color: blue;');


/**
 * TEST: jquery plugin
 * @desc: 
 */
$p.velocity({ opacity: 0 }, {
    duration: 1000,
    delay: 1000,
    begin: function(argument) {
        console.log('velocity begin');
    },
    complete: function () {
        console.log('velocity complete');
    }
});