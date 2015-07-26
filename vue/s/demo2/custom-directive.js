(function () {

    var Vue = require('vue');

    Vue.directive('my-custom-1', {
        /**
         * カスタムディレクティブのフック関数 ①
         * @desc: 初期化時に呼ばれる
         *        一般的にはイベントリスナを追加したり、一回だけ実行が必要なコストのかかる処理を行う
         */
        bind: function () {
            var self = this,
                $el = $(this.el);

            console.log('bind =====');

            $el.attr('style', 'background-color:' + this.arg + ';');
            $el.on('click', function () {
                console.log('click!');
                self.vm.$destroy();
            });
        },
        /**
         * カスタムディレクティブのフック関数②
         * @desc: 初めの一度は bind の直後に初期値とともに呼ばれ、
         *        以降、バインディングされている値が変更される度に呼ばれます
         * @params newValue: 更新後の値
         * @params oldValue: 更新前の値
         */
        update: function (newValue, oldValue) {
            console.log('update =====');
            this._showMyProp();
        },
        /**
         * カスタムディレクティブのフック関数③
         * @desc: ディレクティブが紐付いているエレメントから取り除かれた時に一度だけ呼ばれます
         *        bind()の中で追加されたイベントリスナの削除等のクリーンアップのための処理を行う
         */
        unbind: function () {
            console.log('unbind =====');
            $(this.el).off();
        },
        /**
         * カスタムディレクティブの中でアクセスできるプロパティ
         */
        _showMyProp: function () {
            var html = 'name: ' + this.name + '<br>' +
                       'el: ' + this.el + '<br>' +
                       'vm: ' + this.vm + '<br>' +
                       'expression: ' + this.expression + '<br>' +
                       'raw: ' + this.raw + '<br>' +
                       'arg: ' + this.arg;
            $(this.el).html(html);
        }
    });
})();