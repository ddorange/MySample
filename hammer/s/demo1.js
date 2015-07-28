(function (w) {
    
    'use strict';

    // とりあえずタップ
    var hTap = new Hammer($('#js-hmTap')[0]);
    hTap.on('tap', function (e) {
        console.log('tap', e);
    });

    // touchdownで`.on`スタイルを付与、touchupで削除を行いたい
    var hPress = new Hammer($('#js-hmPress')[0]);
    hPress.on('press', function (e) {
        console.log('press', e);
        $(e.target).addClass('on');
    });
    hPress.on('pressup', function (e) {
        console.log('pressup', e);
        $(e.target).removeClass('on');
    });


    // Pressイベントの発生間隔を短くしてみる
    // Pressイベントのスレッショルドを発生しない距離にする
    // -> これなら自前で書いたほうが早いか？
    var hPressCustom = new Hammer.Manager($('#js-hmPressCustom')[0]);
    hPressCustom.add( new Hammer.Press({ time: 10, threshold: 5000 }) );

    hPressCustom.on('press', function (e) {
        console.log('press');
        $(e.target).addClass('on');
    });
    hPressCustom.on('pressup', function (e) {
        if (e.deltaX < 10 && e.deltaY < 10) {
            console.log('pressup exce');
        }
        $(e.target).removeClass('on');
    });


    // イベント解除
    w.offTap = function () {
        hTap.off('tap');
        hTap.destroy();
    };

    w.offPressCustom = function () {
        hPressCustom.off('press pressup');
        hPressCustom.destroy();
    };

})(window);