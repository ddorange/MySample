(function () {

    var Vue = require('vue');

    // 基本
    var vmTextBox = new Vue({
        el: '#js-textBox',
        data: {
            msg: ''
        }
    });

    // ディレクティブ
    var vmDir = new Vue({
        el: '#js-testDirectives',
        data: {
            hasError: true,
            hasWarning: true,
            isImportant: true,
            isShow: false,
            users: [
                { name: "rin"   },
                { name: "uzuki" }
            ]
        }
    });

    // イベントのリスニング
    var vmEvListen = new Vue({
        el: '#js-eventListening',
        data: {
            users: [
                { name: "rin",   isColor: false },
                { name: "uzuki", isColor: false }
            ]
        },
        methods: {
            onClick: function () {
                console.log('clicked');
            },
            toggleColor: function (user) {
                console.log(user);
                user.isColor = !user.isColor;
            },
            showAlert: function (msg, e) {
                alert(msg);
                console.log(e);
            }
        }
    });

    // フィルター
    var vmFilter = new Vue({
        el: '#js-filter',
        data: {
            str: 'aabbcc',
            searchText: '',
            idols: [
                { name: "rin"   },
                { name: "uzuki" },
                { name: "mio"   }
            ]
        }
    });

})();