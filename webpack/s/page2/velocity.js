/**
 * TEST: jQuery Plugin
 * @desc: 
 */

module.exports = {

    anim: function () {
        $('#js-vlc').velocity({ translateX: 100 }, {
            duration: 500,
            delay: 500,
            begin: function(argument) {
                console.log('slide begin');
            },
            complete: function () {
                console.log('slide complete');
            }
        });

        $('#js-vlc-ui').velocity('callout.shake', {
            delay: 1000,
            begin: function(argument) {
                console.log('shake begin');
            },
            complete: function () {
                console.log('shake complete');
            }
        });
    }
};