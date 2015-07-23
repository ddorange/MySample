console.log('demo4 top');

setTimeout(function () {
    require.ensure([], function () {
        var content = require('./content.js');
        console.log(content);

        var core = require('core/entry.js');
        console.log(core.name);
    });
}, 1000);