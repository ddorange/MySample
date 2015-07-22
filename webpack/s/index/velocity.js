/**
 * TEST: jQuery Plugin
 * @desc: 
 */

module.exports = {

    setup: function () {
        $('#anim-vlc').on('click', function () {
            $('#js-vlc').velocity({ translateX: '+=100' }, 500);
        });

        $('#anim-vlc-ui').on('click', function () {
            $('#js-vlc-ui').velocity('callout.shake');
        });
    }
};