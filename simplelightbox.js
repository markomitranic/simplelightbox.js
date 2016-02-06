(function() {

    $.fn.lightbox = function(params) {

        // First of all, Check for inconsistencies with the init method parameters. Break if something is not right!
        // We will check if lightbox and button have not been set?
        if (!params.button || !params.lightbox) {
            console.log('Invalid lightbox usage. Check parameters.');
            console.log('button: ' + params.button);
            console.log('lightbox: ' + params.lightbox);
            return;
        } else {
            // Create options object
            var options = new optionsPrototype(params);
            // Validate all parameters
            if (validateOptions(options) == 'error') {
                return;
            } else {
                // Do the boogie!
                initLightbox(options);
                createCurtain(options);
                startListeners(options);
            }
        }

        function optionsPrototype(params) {
            // Set default values for parameters that have not been set.
            this.button = params.button;
            this.lightbox = params.lightbox;
            this.lightboxEl = $(params.lightbox);
            this.curtainId = params.curtainId || '#curtain';
            this.lightboxPosition = params.lightboxPosition || 'fixed';
            this.closeButtonId = params.closeButtonId || '#close';
            this.effect = params.effect || 'fade';
            // Add the selector removing method. Removes # or . from options values first letter.
            this.removeSelector = function(selector) {
                return selector.substring(1);
            };
        }

        //Preform some checks on parameters
        function validateOptions(options) {
            // We have to check if the lightboxPosition is set to fixed || relative. If not, force it.
            if ((options.lightboxPosition !== 'relative') && (options.lightboxPosition !== 'fixed')) {
                console.log('lightboxPosition can only be \'fixed\' or \'relative\'. Falling back to Fixed.')
                options.lightboxPosition = 'fixed';
            }
            if ((options.curtainId) && options.curtainId.substring(0, 1) !== '#') {
                console.log('Curtain ID must begin with #');
                return 'error';
            }
            if ((options.closeButtonId) && options.closeButtonId.substring(0, 1) !== '#') {
                console.log('Button ID must begin with #');
                return 'error';
            }
        }

        // Find the Lightbox, hide it, apply some CSS, append it to body.
        function initLightbox(options) {
            var lightbox = $(options.lightbox);
            lightbox.css({
                'display': 'none',
                'z-index': '99999',
                'position': options.lightboxPosition,
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%,-50%)'
            });
            lightbox.appendTo('body');
        }

        // Check for existing curtain elements. If there are none, start a new one. Give the curtain basic CSS.      
        function createCurtain(options) {
            if (!$(options.curtainId).length) {
                $('<div>', {
                    id: options.removeSelector(options.curtainId),
                }).appendTo('body');
            }
            options.curtainEl = $(options.curtainId);
            options.curtainEl.appendTo('body').css({
                'display': 'none',
                'height': '100vh',
                'width': '100vw',
                'z-index': '99998',
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': 'rgba(0,0,0,0.5)'
            });
        }

        //Toggle all
        function toggleLightbox() {
            if (options.effect == 'slide') {
                options.lightboxEl.slideToggle();
                options.curtainEl.slideToggle();
            } else if (options.effect == 'zoom') {
                options.lightboxEl.fadeToggle();
                options.curtainEl.fadeToggle();
                console.log('Sorry, zoom effect has not been working properly in this version. Falling back to fade.')
            } else {
                options.lightboxEl.fadeToggle();
                options.curtainEl.fadeToggle();
            }
        }

        // Adds the listener to the lightbox button
        function startListeners(options) {
            $(document).on('click', options.button, function() {
                toggleLightbox();
            });
            $(document).on('click', options.curtainId, function() {
                toggleLightbox();
            });
            // If an additional button is defined, add the listener to it.
            if (options.closeButtonId !== undefined) {
                $(document).on('click', options.closeButtonId, function() {
                    toggleLightbox();
                });
            }
        }
    };
})(jQuery);