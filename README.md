# No nonsense, simple Lightbox plugin.

**Simple usage, no styles, no pseudo-elements, no nonsense.**

In short, add the `simpleplugin.js` and initialize method:

```
    <script>
        $('.dugme').lightbox({
          button: '.dugme',
          lightbox: '.lightbox',
          curtainId: '#curtain',
          closeButtonId: '#close',
          effect: 'fade'
        });
    </script>
```

Now for the long version:


----------


## 1. Prelude


**So, am making a website, see, and i need to have a lightbox at one point, right?**

I go to Google, search for a lightbox, and find a bunch of 30+kb **omni-potent** plugins with all these spectacular options and styles. Some of them even use additional external plugins! If i would try to use any of them, i would find out that there is little-to-none documentation on real world usage.

So 2h later, i am still pulling my hair out, trying to overwrite !important inline styles that the stupid plugin has embeded. I finish doing that, now the curtain doesn't work for some reason. After 20min of fixing the curtain, everything works fine, but i begin to notice that the animation is a bit laggy.

I burned all .js files in a moment of unimaginable fury and wrote my own plugin within 20minutes.

## 2. Usage for Dummies

1. Have jQuery.
2. Add the plugin `simpleplugin.js`
3. Feed the plugin with the right parameters

> ### Have jQuery
> 
> This plugin requires jQuery, since it uses jQuery selectors and
> simpler jQuery methods like `.on() | .toggle() | .css()` Also, this
> code itself is wrapped up as a jQuery plugin.
> 
> ### Add the `plugin .js`
> 
> One should embed the `simpleplugin.js` on the bottom of the body. This
> is done by adding a line just before closing the body tag on the page:
> 
> 
> ### Feed the plugin
> 
> In order to work, our plugin needs some information. Add this code
> within <script></script> tags, after the plugin inclusion.
> 
> ```
>   <script>
>       $('.dugme').lightbox({
>         button: '.dugme',
>         lightbox: '.lightbox',
>         curtainId: '#curtain',
>         closeButtonId: '#close',
>         lightboxPosition: 'fixed',
>         effect: 'fade'
>       });
>   </script>
>```
> Here are some details about the
> parameters:
> 
> - `button = [selector string]` (You must specify the jQuery selector for the button that will open the lightbox)
> - `lightbox = [selector string]` (Also you must specify the jQuery selector for the element that you want to be shown.)
> - `curtainId = [selector string]` (OPTIONAL: By default, lugin will create its own curtain with the ID #curtain. But if you want it named anything else, you may specify the ID here.)
> - `closeButtonId = [selector string]` (OPTIONAL: You can define additional button ID that will close the lightbox. People usually put X button within the lightbox itself.)
> - `lightboxPosition = [string: fxed || relative]` (OPTIONAL: You can define if you want the `#lightbox` element to be relative or fixed positioned),
> - `effect = [string]` (OPTIONAL: slide, zoom,  fade[default])

## 3. Pros & Cons

**Pros:** Are evident. You can style your elements however you may like. Plugin will not care about them.

I am not a magician, so there ought to be some pros and cons.

**Cons:** The plugin adds almost no css. Almost? Well since it creates a new `#curtain` element, it embeds some inline styles to it:

```
    'display' : 'none',                     // Hide it
    'height' : '100vh',                     // Cover the entire window
    'width' : '100vw',                      // Cover the entire window
    'z-index' : '99998',                    // Be on top of everything
    'position' : 'fixed',                   // Position 
    'top' : 0,                              // Position 0
    'left' : 0,                             // Position 0
    'background-color' : 'rgba(0,0,0,0.5)'  // Set color and opacity
```

But wait, that is not the main issue here. In order to hide and show the lightbox we need to add some styles to it also. This may mean that some of your CSS properties will get overwritten.
```
    'display': 'none',                      // Hide the element
    'z-index': '99999',                     // Put it on top of everything
    'position' : 'fixed',                   // Position
    'top' : '50%',                          // Position on center of the screen
    'left' : '50%',                         // Position on center of the screen
    'transform' : 'translate(-50%,-50%)'    // A cute hack to exactly center the div
```

So if you would like to make something different, you would need to edit these lines in the plugin `simpleplugin.js`


## 4. Towards the future, and beyond...

This plugin is not actively developed anymore, but i do have some ideas for the future:

- Allow parameter to change the position to absolute
- Transition effects Zoom parameter was actually never written.
- Allow user to set z-index of both elements via parameters
- Allow user to pick the rgba color for the #curtain