(function () {

    var Vue = require('vue');

    /**
     * コンポーネントの作り方①
     * 1. Vue.extendでVueクラスを拡張
     * 2. Vue.componentで登録
     */
    var MyCat = Vue.extend({
    
        template: '<p class="cat">{{name}}</p>',
        
        // dataのデフォルト値の定義
        data: function () {
            return { name: 'tama' };
        }
    });
    Vue.component('my-cat', MyCat);

    /**
     * コンポーネントの作り方②
     * Vue.componentの第二引数に拡張オブジェクトを渡す
     */
    Vue.component('my-dog', {
        template: '<p class="dog">dog</p>'
    });

    var vm = new Vue({
        el: '#js-custom-component'
    });

})();