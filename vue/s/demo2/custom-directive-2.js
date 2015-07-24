(function () {

    var Vue = require('vue');

    Vue.directive('my-custom-1', {
        bind: function () {
            // [ カスタムディレクティブのフック関数① ]
            // 準備のための作業をします
            // e.g. イベントリスナを追加したり、一回だけ実行が必要なコストのかかる処理を行う
            console.log('bind =====');

            var self = this,
                $el = $(this.el);

            $el.attr('style', 'background-color:' + this.arg + ';');
            $el.on('click', function () {
                console.log('click!');
                self.vm.$destroy();
            });
        },
        update: function (newValue, oldValue) {
            // [ カスタムディレクティブのフック関数② ]
            // 更新された値に何か処理をします
            // この部分は初期値に対しても呼ばれます
            console.log('update =====');

            // [ カスタムディレクティブの中でアクセスできるプロパティ ]
            var html = 'name: ' + this.name + '<br>' +
                       'el: ' + this.el + '<br>' +
                       'vm: ' + this.vm + '<br>' +
                       'expression: ' + this.expression + '<br>' +
                       'raw: ' + this.raw + '<br>' +
                       'arg: ' + this.arg;
            
            $(this.el).html(html);
        },
        unbind: function () {
            // [ カスタムディレクティブのフック関数③ ]
            // クリーンアップのための処理を行います
            // e.g. bind()の中で追加されたイベントリスナの削除
            console.log('unbind =====');
            $(this.el).off();
        }
    });
})();