(function () {

    var Vue = require('vue'),
        vlc = require('./velocity'),
        lazy = require('./lazy-load');

    console.log('index');
    console.log('this load Vue?', !!Vue);
    $('#js-jq').html('jQuery');
    vlc.setup();
    lazy.setup();

})();