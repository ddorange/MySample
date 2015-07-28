(function (w) {
    
    'use strict';


    var util = {
        /** タッチハンドラの付与 */
        onTouch: function (el, func) {
            var manager =  new Hammer.Manager(el),
                _onPress,
                _onPressup;

            _onPress = function (e) {
                $(e.target).addClass('on');
            };
            
            _onPressup = function (e) {
                $(e.target).removeClass('on');
                func.call(manager, e);
            };
            
            manager.add( new Hammer.Press({ time: 10, threshold: 5000 }) );
            manager.on('press', _onPress);
            manager.on('pressup', _onPressup);
            
            return manager;
        },
        /** タッチハンドラの削除 */
        offTouch: function (manager) {
            manager.off('press pressup');
            manager.destroy();
        }
    };

   var once = true,
       manager = util.onTouch($('#js-touch')[0], function (e) {
        console.log('ecxe', e);
        
        if (once) {
            once = false;
            setTimeout(function () {
                console.log('off');
                util.offTouch(manager);
            }, 3000);
        }
    });

})(window);