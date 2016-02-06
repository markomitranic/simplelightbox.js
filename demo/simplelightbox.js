(function() {

    $.fn.lightbox = function(options) {

        // Present a user with an error if method parameters have not been set and return the function.
        if (!options.button || !options.lightbox) {
            console.log('Invalid lightbox usage. Check parameters.');
            console.log('button: ' + options.button);
            console.log('lightbox: ' + options.lightbox);
            return;
        } else {
            allowLightbox(options);
        }
        if (options.curtainId.substring(0, 1) !== '#') {
            console.log('Curtain ID must begin with #');
            return;
        }
        if ((options.closeButtonId) && options.closeButtonId.substring(0, 1) !== '#') {
            console.log('Button ID must begin with #');
            return;
        }


        function allowLightbox(settings) {

            // Set default values for parameters not set.
            var options = $.extend({
                curtain: '#curtain',
                effect: 'fade'
            }, settings);

            // Add the selector removing method. Removes # or . from options values first letter.
            options.removeSelector = function(selector) {
                return selector.substring(1);
            };



            // Check for existing curtain elements. If there are none, start a new one. Give the curtain basic CSS.      
            if (!$(options.curtainId).length) {
                $('<div>', {
                    id: options.removeSelector(options.curtainId),
                }).appendTo('body');
            }
            var curtain = $(options.curtainId);
            curtain.appendTo('body').css({
                'display': 'none',
                'height': '100vh',
                'width': '100vw',
                'z-index': '99998',
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': 'rgba(0,0,0,0.5)'
            });

            // Initially hide the Lightbox, append it to body.
            var lightbox = $(options.lightbox);
            lightbox.css({
                'display': 'none',
                'z-index': '99999',
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%,-50%)'
            });
            lightbox.appendTo('body');



            // Add the listener to the lightbox button
            var listenerArray = [];

            $(document).on('click', options.button, function() {
                lightbox.fadeToggle();
                curtain.fadeToggle();
            });
            $(document).on('click', options.curtainId, function() {
                lightbox.fadeToggle();
                curtain.fadeToggle();
            });
            if (options.closeButtonId !== undefined) {
                $(document).on('click', options.closeButtonId, function() {
                    lightbox.fadeToggle();
                    curtain.fadeToggle();
                });
            }

        }
    };
})(jQuery);