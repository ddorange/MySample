(function (w) {

    'use strict';

    var Hammer = (typeof require === 'function')? require('hammerjs') : w.Hammer,
        $      = (typeof require === 'function')? require('jquery') : w.$,
        _      = (typeof require === 'function')? require('lodash'): w._;

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
                this.mc.add( new Hammer.Press({ time: 10, threshold: 5000 }) );
            },
            update: function (fn) {
                var self = this,
                    mc = this.mc,
                    vm = this.vm;
                
                // teardown old handler
                if (this.handler) {
                    _.each(this.handler, function (_fn, _name) {
                        mc.off(_name, _fn);
                    });
                }

                // define new handler
                this.handler = {
                    press: function (e) {
                        self.pressed = true;
                        $(e.target).addClass('on');
                    },
                    pressup: function (e) {

                        if (!self.pressed) {
                            return;
                        }

                        self.pressed = false;
                        $(e.target).removeClass('on');

                        if (Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY)) < 5) {
                            e.targetVM = vm;
                            fn.call(mc, e);
                        }
                    }
                };

                _.each(this.handler, function (_fn, _name) {
                    mc.on(_name, _fn);
                });
            },
            unbind: function () {
                var mc = this.mc;
                
                _.each(this.handler, function (_fn, _name) {
                    mc.off(_name, _fn);
                });

                if (!Object.keys(mc.handlers).length) {
                    mc.destroy()
                    this.el.hammer = null
                }
            }
        });
    }

    if (typeof exports === 'object') {
        module.exports = vueTouchHover;
    } else if (w.Vue) {
        w.VueTouch = vueTouchHover;
        w.Vue.use(vueTouchHover);
    }

})(window);