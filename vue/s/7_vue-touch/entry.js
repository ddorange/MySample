(function () {

    'use strict';

    var Vue = require('vue'),
        VueTouch = require('vue-touch');

    // VueTouchプラグインを追加
    Vue.use(VueTouch);

    var vm = new Vue({
        el: '#js-app',
        data: {
            msg: 'vue-touchプラグインのサンプル',
        },
        methods: {
            sayHello: function () {
                console.log('Hello');
            }
        }
    });

})();