(function (w) {

    'use strict';

    // alias
    var Hammer = (typeof require === 'function')? require('hammerjs') : w.Hammer,
        $      = (typeof require === 'function')? require('jquery') : w.$,
        _      = (typeof require === 'function')? require('lodash'): w._;

    // const
    var HOVER_CLASS_NAME = 'on',
        HAMMER_PRESS = {
            time: 50,
            threshold: 5000
        },
        TOUCH_CHANCEL_THRESHOLD = 5;

    var vueTouchHover = {};

    vueTouchHover.install = function (Vue) {

        Vue.directive('touch', {

            // インラインステートメントを使用できるように
            acceptStatement: true,

            bind: function () {
                if (!this.el.hammer) {
                    this.el.hammer = new Hammer.Manager(this.el);
                }
                
                this.mc = this.el.hammer;
                this.mc.add( new Hammer.Press(HAMMER_PRESS) );
            },
            update: function (fn) {
                var self = this;
                
                // teardown old handler
                if (this.handler) {
                    _.each(this.handler, function (_fn, _name) {
                        self.mc.off(_name, _fn);
                    });
                }

                // define new handler
                this.handler = {};

                // 指をつけたとき
                this.handler.press = function (e) {
                    self.pressed = true;
                    $(e.target).addClass(HOVER_CLASS_NAME);
                };

                // 指を上げたとき
                this.handler.pressup = function (e) {
                    if (!self.pressed) {
                        return;
                    }

                    self.pressed = false;
                    $(e.target).removeClass(HOVER_CLASS_NAME);

                    // 移動量が閾値を超えたらキャンセルする
                    if (Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY)) < TOUCH_CHANCEL_THRESHOLD) {
                        e.targetVM = self.vm;
                        fn.call(self.mc, e);
                    }
                };

                _.each(this.handler, function (_fn, _name) {
                    self.mc.on(_name, _fn);
                });
            },
            unbind: function () {
                var self = this;
                
                _.each(this.handler, function (_fn, _name) {
                    self.mc.off(_name, _fn);
                });

                // すべてのhandlerがなくなったら削除？
                if (!Object.keys(this.mc.handlers).length) {
                    this.mc.destroy()
                    this.el.hammer = null
                }
            }
        });
    };

    vueTouchHover.config = function (option) {
        option = option || {};
        HOVER_CLASS_NAME = (option.hover)? option.hover : HOVER_CLASS_NAME;
        HAMMER_PRESS     = (option.press)? option.press : HAMMER_PRESS;
    };



    if (typeof exports === 'object') {
        module.exports = vueTouchHover;
    } else if (w.Vue) {
        w.VueTouch = vueTouchHover;
        w.Vue.use(vueTouchHover);
    }

})(window);