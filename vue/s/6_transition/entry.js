(function () {

    'use strict';

    require('velocity');
    require('velocity.ui');

    var Vue = require('vue');


    Vue.transition('flip', {
        enter: function (el, done) {
            // 要素は既に DOM に挿入されており、
            // アニメーションが終わったとき、done は呼ばれます
            $(el).velocity('transition.flipXIn', { complete: done });
        },
        enterCancelled: function (el) {
            $(el).velocity('stop');
        },
        leave: function (el, done) {
            // enter と同様
            $(el).velocity('transition.flipXOut', { complete: done });
        },
        leaveCancelled: function (el) {
            $(el).velocity('stop');
        }
    });

    var vmApp = new Vue({
        el: '#js-app',
        data: {
            msg: 'hello!',
            show: {
                expand: true,
                bounce: true,
                flip: true
            }
        },
        methods: {
            toggleShow: function (key) {
                this.show[key] = !this.show[key];
            }
        }
    });

})();