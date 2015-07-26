(function (w) {
    
    'use strict';

    // パン
    var hmPan = new Hammer($('#js-pan')[0]);
    hmPan.on('pan', function (e) {
        console.log('pan', e);
    });

    // スワイプ
    var hmSwipe =  new Hammer($('#js-swipe')[0]);
    hmPan.on('swipe', function (e) {
        console.log('swipe', e);
    });

    // パンを詳しく
    var hmPan2 = new Hammer($('#js-pan2')[0]);
    hmPan2.on('panstart', function (e) {
        console.log('panstart');
    });

    hmPan2.on('panmove', function (e) {
        console.log('panmove', e.deltaX);
    });

    hmPan2.on('panend', function (e) {
        console.log('panend', e.deltaX);
    });

    hmPan2.on('pancancel', function (e) {
        console.log('pancancel');
    });

})(window);