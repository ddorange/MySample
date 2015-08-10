(function () {


    var Vue = require('vue');

    /**
     * templateを利用する
     */
    var status = Vue.extend({
        template: '#app-status-tmpl',
        props: ['job'],
        data: function () {
            return {
                stamina: 0,
                exp: 0
            };
        }
    }); 

    var vmApp = new Vue({
        el: '#js-app',
        components: {
            'app-status': status
        },
        data: {
            job: {
                holds: [
                    'warrior',
                    'monk',
                    'sorcerer'
                ],
                curent: 0
            }
        },
        methods: {
            changeJob: function () {
                if (this.job.curent < this.job.holds.length - 1) {
                    this.job.curent++;
                } else {
                    this.job.curent = 0;
                }
            }
        }
    });

})();