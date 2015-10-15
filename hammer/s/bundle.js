(function (w) {
    
    'use strict';


    var util = w.util || {};

    /**
     * data-view属性を持つ要素に一括でタッチハンドラを付与する
     */
    util.bindAction = function (el, handler) {
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
    };

    /**
     * bindActionしたものを一括解除
     */
    util.unbindAction = function (handler) {
        var self = this;

        if (!handler.touchManagers && handler.touchManagers.length < 1) {
            return;
        }

        _.each(handler.touchManagers, function(mgr) {
            self.offTouch(null, mgr);
        });
        handler.touchManagers = [];

        return handler;
    };


    w.util = util;

})(window);