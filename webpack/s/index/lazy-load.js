/**
 * TEST: lazy load
 *
 */

// We create a function that will lazy load modules based on the current hash
var resolveRoute = function () {
    
    if (!location.hash || location.hash.length === 1) {
        require.ensure([], function () {
            var home = require('./component/home.js');
            home.setup();
        });

    } else if (location.hash === '#admin') {
        require.ensure([], function () {
            var admin = require('./component/admin.js');
            admin.setup();
        });
    }
};

module.exports = {
    setup: function () {
        // Resolve route on hash change
        window.onhashchange = resolveRoute;

        // Resolve current route
        resolveRoute();
    }
};