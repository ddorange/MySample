(function () {

    'use strict';

    var Vue = require('vue'),
        VueTouch = require('./vue-touch-hover');

    // VueTouchプラグインを追加
    Vue.use(VueTouch);

    var vm = new Vue({
        el: '#js-app',
        data: {
            msg: 'ボタンのインタラクションを再現するサンプル',
        },
        methods: {
            sayHello: function () {
                console.log('Hello');
            },
            sayBye: function () {
                console.log('Bye');
            }
        }
    });

})();