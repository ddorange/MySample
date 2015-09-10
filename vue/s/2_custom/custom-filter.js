(function () {

    var Vue = require('vue');

    Vue.filter('reverse', function (value) {
        return value.split('').reverse().join('');
    });

    Vue.filter('wrap', function (value, begin, end) {
        return begin + value + end;
    });

})();