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
        },
        /**
         * data-view属性を持つ要素に一括でタッチハンドラを付与する
         */
        bindAction: function (el, handler) {
            var self = this;

            handler.touchManagers = handler.touchManagers || [];

            _.each(el.querySelectorAll('[data-action]'), function (_el) {
                var action = _el.getAttribute('data-action'),
                    mgr;

                self.onTouch(_el, function () {
                    if (action.indexOf('url:') === 0) {
                        location.href = action.substring(4, action.length);
                    } else if (handler.hasOwnProperty(action)) {
                        handler[action].call(handler, _el);
                    } else {
                        return;
                    }
                });

                handler.touchManagers.push(mgr);
            });

            return handler;
        },
        /**
         * bindActionしたものを一括解除
         */
        unbindAction: function (handler) {
            var self = this;

            if (handler.touchManagers && handler.touchManagers.length > 0) {
                _.each(handler.touchManagers, function(mgr) {
                    self.offTouch(null, mgr);
                });
                handler.touchManagers = [];
            }
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