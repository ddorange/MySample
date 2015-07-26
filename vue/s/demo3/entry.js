(function () {

    var Vue = require('vue');

    /**
     * コンポーネントの作り方①
     * 1. Vue.extendでVueクラスを拡張
     * 2. Vue.componentで登録
     */
    var MyCat = Vue.extend({
        template: '<p>にゃあ</p>',
        data: function () {
            return { title: 'Hello!' };
        }
    });
    Vue.component('my-cat', MyCat);

    /**
     * コンポーネントの作り方②
     * Vue.componentの第二引数に拡張オブジェクトを渡す
     */
    Vue.component('my-dog', {
        template: '<p>わんわん</p>'
    });

    var vm = new Vue({
        el: '#js-custom-component'
    });

})();