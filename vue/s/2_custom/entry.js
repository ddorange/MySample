(function () {
    
    var Vue = require('vue');

    require('./custom-directive');
    require('./custom-filter');

    var myCustom1 = new Vue({ el: '#js-myCustom1' });

    var myFilter = new Vue({
        el: '#custom-filter',
        data: {
            text: 'abc'
        }
    });

})();