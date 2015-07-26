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
    var hPressCustom = new Hammer.Manager($('#js-hmPressCustom')[0]);
    hPressCustom.add( new Hammer.Press({ time: 10 }) );
    hPressCustom.on('press', function (e) {
        console.log('press', e);
        $(e.target).addClass('on');
    });
    hPressCustom.on('pressup', function (e) {
        console.log('pressup', e);
        $(e.target).removeClass('on');
    });


    // イベント解除
    w.offTap = function () {
        hTap.off('tap');
        hTap.destroy();
    };

    w.offPressCustom = function () {
        hPressCustom.off('press');
        hPressCustom.off('pressup');
        hPressCustom.destroy();
    };

})(window);