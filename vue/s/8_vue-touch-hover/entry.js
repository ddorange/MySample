(function () {

    'use strict';

    var Vue = require('vue'),
        VueTouch = require('./vue-touch-hover');

    // VueTouchプラグインを追加
    Vue.use(VueTouch);

    var vm = new Vue({
        el: '#js-app',
        data: {
            title: 'ボタンのインタラクションを再現するサンプル',
            deltaX: 0,
            deltaY: 0
        },
        methods: {
            sayHello: function () {
                console.log('Hello');
            },
            sayBye: function () {
                console.log('Bye');
            },
            showPanValue: function (e) {
                console.log(e);
                this.deltaX = e.deltaX;
                this.deltaY = e.deltaY;
            }
        }
    });

})();