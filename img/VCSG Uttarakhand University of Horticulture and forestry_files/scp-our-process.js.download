jQuery(function ($) {

    var breakpoint = ed_school_plugin.data.vcWidgets.ourProcess.breakpoint || 480;
    var $body = $('body');
    var delay = 0;
    var speed = 500;
    var $dots = $('.dots');
    var $dot = $('.dot');
    var $line = $('.line');
    var $dotContainer = $('.dot-container');
    var containerInitialWidth = ( 100 * parseFloat($dotContainer.css('width')) / parseFloat($dotContainer.parent().css('width')) ) + '%';

    function setWidth($bodyWidth, $width) {
        if ($body.width() < $bodyWidth) {
            $dotContainer.each(function () {
                $this = $(this);
                $this.css({width: $width});
            });
        } else {
            $dotContainer.css({width: containerInitialWidth})
        }
    }

    setWidth(breakpoint, '100%');

    $(window).resize(function () {
        setWidth(breakpoint, '100%');
    });

    // just to identify the container
    $dots.each(function (i) {

        $(this).appear(function () {

            $line.each(function (i) {
                $this = $(this);
                delay += 1000;

                $this.delay(delay).animate({
                    width: '100%'
                }, speed, function () {
                    var $this = $(this);

                    $this.siblings('.dot-wrap').css({opacity: 1});
                    $this.siblings('.text').css({opacity: 1});
                    $this.siblings('.triangle').css({opacity: 1});
                });
            });
        });
    });
});