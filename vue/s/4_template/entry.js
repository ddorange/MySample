(function () {


    var Vue = require('vue');

    /**
     * templateを利用する
     */
    Vue.component('my-fox', {
        template: '#js-fox-template',
        data: function () {
            return { name: 'gon' };
        }
    });

    /**
     * contentの挿入（select属性がないとき）
     * 何も要素がが挿入されなかった場合にcontentの中身が挿入される
     */
    Vue.component('my-bear', {
        template: '#js-bear-template'
    });

    /**
     * contentの挿入（select属性があるとき）
     * 何も要素がが挿入されなかった場合にcontentの中身が挿入される
     */
    Vue.component('my-moon-bear', {
        template: '#js-moon-bear-template',
        data: function () {
            return {
                name: 'kuma-tetsu',
                age: 60,
                desc: 'ツキノワグマ'
            };
        }
    });


    var vm = new Vue({
        el: '#js-custom-component'
    });

})();