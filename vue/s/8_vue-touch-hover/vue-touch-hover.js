(function () {

    'use strict';

    var vueTouchHover = {},
        gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe'],
        customeEvents = {};

    // alias
    var Hammer = (typeof require === 'function')? require('hammerjs') : window.Hammer,
        $      = (typeof require === 'function')? require('jquery') : window.$,
        _      = (typeof require === 'function')? require('lodash'): window._;

    // const
    var htapConf = {
            
            // 押したときに付与するクラス名
            hoverClass: 'on',

            // HammerのPressイベントのオプション
            pressOption: {
                // デフォルトだと長押しくらいの秒数になってるので
                time: 10,
                // Pressイベント自体をキャンセルされると、pressupでhoverClassを外す機会がなくなるので発生しなさそうな値を入れている
                threshold: 5000
            },

            // pressup発生時にこの値以上動いたらキャンセルされる
            chancelThreshold: 5
        };


    vueTouchHover.install = function (Vue) {

        Vue.directive('touch', {

            // インラインステートメントを使用できるようにする
            acceptStatement: true,

            bind: function () {
                var event,
                    recognizerType,
                    recognizer,
                    mc,
                    custom;

                if (!this.el.hammer) {
                    this.el.hammer = new Hammer.Manager(this.el);
                }

                mc = this.mc = this.el.hammer

                // determine event type
                event = this.arg;

                if (customeEvents[event]) {
                    // custom event
                    custom = customeEvents[event]
                    recognizerType = custom.type
                    recognizer = new Hammer[capitalize(recognizerType)](custom)
                    recognizer.recognizeWith(mc.recognizers)
                    mc.add(recognizer)

                } else if (event === 'htap') {
                    // ボタンの挙動をエミュレートする
                    this.mc.add(new Hammer.Press(htapConf.pressOption));

                } else {
                    // built-in event
                    for (var i = 0; i < gestures.length; i++) {
                        if (event.indexOf(gestures[i]) === 0) {
                            recognizerType = gestures[i];
                            break;
                        }
                    }
                    if (!recognizerType) {
                        console.warn('Invalid v-touch event: ' + event)
                        return;
                    }
                    recognizer = mc.get(recognizerType);
                    if (!recognizer) {
                        // add recognizer
                        recognizer = new Hammer[capitalize(recognizerType)]();
                        // make sure multiple recognizers work together...
                        recognizer.recognizeWith(mc.recognizers);
                        mc.add(recognizer);
                    }
                }
            },
            update: function (fn) {
                var self  = this,
                    event = this.arg;
                
                // teardown old handler
                if (typeof this.handler === 'function') {
                    this.mc.off(event, this.handler);
                } else {
                    _.each(this.handler, function (_fn, _name) {
                        self.mc.off(_name, _fn);
                    });
                }

                if (event === 'htap') {
                    // define new handler
                    this.handler = {};
                    // 指をつけたとき
                    this.handler.press = function (e) {
                        self.pressed = true;
                        $(e.target).addClass(htapConf.hoverClass);
                    };

                    // 指を上げたとき
                    this.handler.pressup = function (e) {
                        if (!self.pressed) {
                            return;
                        }
                        self.pressed = false;
                        $(e.target).removeClass(htapConf.hoverClass);

                        // 移動量が閾値を超えたらキャンセルする
                        if (Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY)) < htapConf.chancelThreshold) {
                            e.targetVM = self.vm;
                            fn.call(self.mc, e);
                        }
                    };
                    _.each(this.handler, function (_fn, _name) {
                        self.mc.on(_name, _fn);
                    });
                } else {
                    // define new handler
                    this.handler = function (e) {
                        e.targetVM = self.vm
                        fn.call(self.vm, e)
                    }
                    self.mc.on(event, this.handler)
                }
            },
            unbind: function () {
                var self = this;
                
                if (typeof this.handler === 'function') {
                    this.mc.off(this.arg, this.handler);
                } else {
                    _.each(this.handler, function (_fn, _name) {
                        self.mc.off(_name, _fn);
                    });
                }

                // すべてのhandlerがなくなったら削除？
                if (!Object.keys(this.mc.handlers).length) {
                    this.mc.destroy()
                    this.el.hammer = null
                }
            }
        });
    };

    vueTouchHover.registerCustomEvent = function (event, options) {
        options.event = event;
        customeEvents[event] = options;
    }

    // htapイベントのオプションを設定を変更する
    vueTouchHover.configureHtap = function (option) {
        option = option || {};
        htapConf.hoverClass  = (option.hoverClass)? option.hoverClass : htapConf.hoverClass;
        htapConf.pressOption = (option.pressOption)? option.pressOption : htapConf.pressOption;
    };

    function capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    if (typeof exports === 'object') {
        module.exports = vueTouchHover;
    } else if (window.Vue) {
        window.VueTouch = vueTouchHover;
        window.Vue.use(vueTouchHover);
    }

})();