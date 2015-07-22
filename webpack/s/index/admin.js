module.exports = {
    setup: function () {
        console.log('admin setup');

        var Vue = require('vue');
        console.log('this load Vue?', !!Vue);
    }
};