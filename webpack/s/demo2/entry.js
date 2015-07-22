console.log('demo2: vendors');

var Vue = require('vue');
console.log('this load Vue?', !!Vue);


/**
 * TEST: jquery
 * @desc: global import
 */
$('#js-jq').html('jQuery Arrival');


// TEST: jquery plugin
$('#anim-vlc').on('click', function () {
    $('#js-vlc').velocity({ translateX: '+=100' }, 500);
});

$('#anim-vlc-ui').on('click', function () {
    $('#js-vlc-ui').velocity('callout.shake');
});