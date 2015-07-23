module.exports = {
    setup: function () {
        var content = require('./content');
        console.log('admin: ' + content);

        // vendor
        var Vue = require('vue');
        console.log('this load Vue?', !!Vue);

        // var core = require('./../../core/component/a');
        // console.log(core.name);
    }
};