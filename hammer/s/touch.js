(function (w) {
    
    'use strict';


    var util = w.util || {};

    /**
     * タッチハンドラの付与
     */
    util.onTouch = function (el, func) {
        var manager =  new Hammer.Manager(el),
            _onPress,
            _onPressup;

        _onPress = function (e) {
            $(e.target).addClass('on');
        };
        
        _onPressup = function (e) {
            $(e.target).removeClass('on');
            if (Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY)) < 5) {
                func.call(manager, e);
            }
        };
        
        manager.add( new Hammer.Press({ time: 10, threshold: 5000 }) );
        manager.on('press', _onPress);
        manager.on('pressup', _onPressup);
        
        return manager;
    };
    /**
     * タッチハンドラの削除
     */
    util.offTouch = function (manager) {
        manager.off('press pressup');
        manager.destroy();
    };

    w.util = util;

})(window);