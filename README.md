# ClassySlider


## Scope:
* Rotate N slides of HTML in content
* Auto rotate - adjustable (global)
* Click link to rotate - direct & dynamic
* Define transition type (global)
* Display controls

## Options:

See all available options and their defaults below:

```javascript
var options = {
  classPrefix: 'classy-slider-', // Any strong is valid
  controls: true,
  controlTrigger: 'click', // Any event trigger is valid
  direction: 'forward', // 'backward' is also valid
  dynamicControls: true,
  el: Utils.createElem('div'), // Pass the element to turn into a slider
  startFrom: 0, // Index to start slider at
  timer: 2000, // Time between slides
  transition: 'fade' // Also accepts: 'slide-up|down|left|right',
    // 'reveal-up|down|left|right', 'cover-|up|down|left|right'
};
```

## Implementation

This slider is classy, so you can create a new instance of it for each slider you want.

```javascript
(function () {
  var opts = {
    controls: false,
    el: document.getElementById('slider'),
    timer: 4000
  };

  var slider = new ClassySlider(opts);
}());
```

## Contributing

1. `git clone git@github.com:jking90/ClassySlider.git`
2. `cd ClassySlider`
3. `npm install`
4. If you don't already have [Grunt](http://gruntjs.com/) installed, `npm install -g grunt-cli`
5. `grunt prepare`

Now you are ready.

To run the project: `grunt run`

While running the site, for tests go to `localhost:8000/test`, for the demo go to `localhost:8000/demo`.
