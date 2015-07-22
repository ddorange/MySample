console.log('demo3: lazy load');


// We create a function that will lazy load modules based on the current hash
var resolveRoute = function () {
    
    if (!location.hash || location.hash.length === 1) {
        // If no hash or hash is '#'
        console.log('lazy load: home');
        require.ensure([], function () {
            var home = require('./home.js');
            home.setup();
        });

    } else if (location.hash === '#admin') {
        // Or if route is #admin we lazy load that
        console.log('lazy load: admin');
        require.ensure([], function () {
            // var admin = require('./admin.js');
            var admin = require('./../core/entry');
            admin.setup();
        });
    }
};

// Resolve route on hash change
window.onhashchange = resolveRoute;

// Resolve current route
resolveRoute();