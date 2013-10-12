# ClassySlider

## Scope:
* Rotate N slides of HTML in content
* Auto rotate - adjustable
* Define transition type
* Display controls - direct & dynamic

## Options:

See all available options and their defaults below:

```javascript
var options = {
  classPrefix    : 'classy-slider-',
  controls       : true,
  controlTrigger : 'click',
  direction      : 'forward',
                // 'backward'
  dynamicControls: true,
  el             : Utils.createElem('div'),
  startFrom      : 0,
  pauseOnHover   : true,
  timer          : 2000,
  transition     : 'fade'
                 // 'slide-[up|down|left|right]'
                 // 'reveal-up|down|left|right' 
                 // 'cover-|up|down|left|right'
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

_Now you are ready._

To run the project: `grunt run`

While running the project go to `localhost:8000/demo` for the demo.

To run the tests: `grunt test`
