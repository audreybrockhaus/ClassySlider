  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls

var Utils = {
  createElem: function (elem) {
    return document.createElement(elem);
  },

  createListener: function (elem, evnt, callback) {
    if ('addEventListener' in elem) {
      elem.addEventListener(evnt, callback);
    } else {
      elem.attachEvent('on' + evnt, callback);
    }
  },

  extend: function (obj1, obj2) {
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      }
    }

    return obj1;
  },

  getChildren: function (elem) {
    var children = [];

    for (var i = 0; i < elem.children.length; i++) {
      children.push(elem.children[i]);
    }

    return children;
  },

  setText: function (elem, string) {
    if ('innerText' in elem) {
      elem.innerText = string;
    } else {
      elem.textContent = string;
    }
  },

  removeClass: function (elem, className) {
    var classes = elem.className.split(/\s+/),
        index = classes.indexOf(className);

    if (index >= 0) {
      classes.splice(index, 1);
      elem.className = classes.join(' ');
      Utils.removeClass(elem, className);
    }
  },

  addClass: function (elem, className) {
    Utils.removeClass(elem, className);
    elem.className += ' ' + className;
  }
};

function ClassySlider(opts) {
  this.defaults = {
    classPrefix: 'classy-slider-',
    controls: true,
    controlTrigger: 'click',
    direction: 'forward',
      // 'backward'
    dynamicControls: true,
    el: Utils.createElem('div'),
    startFrom: 0,
    // pauseOnHover
    timer: 2000,
    transition: 'fade'
      // 'slide-' (udlr)
      // 'cover-' (udlr)
      // 'reveal-' (udlr)
      // false
  };

  this.options = opts;

  this.initVars();
  this.initSlider();
}

ClassySlider.prototype.updateClass = function (i) {
  var start = this.activeSlideIndex,
      prefix = this.options.classPrefix,
      last = this.slides[this.slides.length - 1];

  if (i < start) {
    Utils.addClass(this.slides[i], prefix + 'left');
    Utils.removeClass(this.slides[i], prefix + 'right');
    Utils.removeClass(this.slides[i], prefix + 'active');
  } else if (i > start) {
    Utils.addClass(this.slides[i], prefix + 'right');
    Utils.removeClass(this.slides[i], prefix + 'left');
    Utils.removeClass(this.slides[i], prefix + 'active');
  } else {
    Utils.addClass(this.slides[i], prefix + 'active');
    Utils.removeClass(this.slides[i], prefix + 'right');
    Utils.removeClass(this.slides[i], prefix + 'left');
  }

  if (start === this.slides.length - 1) {
    Utils.addClass(this.slides[0], prefix + 'wrap');
  } else {
    Utils.removeClass(this.slides[0], prefix + 'wrap');
  }

  if (start === 0) {
    Utils.addClass(last, prefix + 'wrap');
  } else {
    Utils.removeClass(last, prefix + 'wrap');
  }
};

ClassySlider.prototype.initClasses = function () {
  Utils.addClass(this.options.el, 'classy-slider');

  if (this.options.transition) {
    Utils.addClass(this.options.el, this.options.classPrefix + this.options.transition);
  }

  for (var i = 0; i < this.slides.length; i++) {
    this.updateClass(i);
  }
};

ClassySlider.prototype.initVars = function () {
  if (!this.options.el) {
    return;
  }

  var defaults = Utils.extend({}, this.defaults);
  this.options = Utils.extend(defaults, this.options);

  this.slides = Utils.getChildren(this.options.el);

  this.activeSlideIndex = this.targetSlideIndex = this.previousSlideIndex = this.options.startFrom;
  this.activeSlide = this.targetSlide = this.previousSlide = this.slides[this.activeSlideIndex];

  this.initClasses();
};

ClassySlider.prototype.updateClasses = function () {
  this.updateClass(this.targetSlideIndex);
  this.updateClass(this.previousSlideIndex);
  this.updateClass(this.activeSlideIndex);
};

ClassySlider.prototype.updateState = function (active, target, previous) {
  this.activeSlideIndex = active;
  this.activeSlide = this.slides[active];
  if (target >= 0) {
    this.targetSlideIndex = target;
    this.targetSlide = this.slides[this.targetSlideIndex];
  }
  if (previous >= 0) {
    this.previousSlideIndex = previous;
    this.previousSlide = this.slides[this.previousSlideIndex];
  }
};

ClassySlider.prototype.getFinalIndex = function (index) {
  if (this.slides[index]) {
    return index;
  } else if (index < 0) {
    return this.slides.length - 1;
  } else {
    return 0;
  }
};

ClassySlider.prototype.goToSlide = function (index) {
  this.updateState(this.activeSlideIndex, this.getFinalIndex(index));
  this.updateClasses();
  this.updateState(this.targetSlideIndex, this.targetSlideIndex, this.activeSlideIndex);
};

ClassySlider.prototype.goToNext = function () {
  if (this.options.direction === 'backward') {
    this.goToSlide(this.activeSlideIndex - 1);
  } else {
    this.goToSlide(this.activeSlideIndex + 1);
  }
};

ClassySlider.prototype.goToPrevious = function () {
  if (this.options.direction === 'backward') {
    this.goToSlide(this.activeSlideIndex + 1);
  } else {
    this.goToSlide(this.activeSlideIndex - 1);
  }
};

ClassySlider.prototype.addListener = function (elem, index) {
  var _this = this;

  var callback = function () {
    clearInterval(_this.timer);
    if (index === 'next') {
      _this.goToNext();
    } else if (index === 'previous') {
      _this.goToPrevious();
    } else {
      _this.goToSlide(index);
    }
    _this.setTimer(true);
  };

  Utils.createListener(elem, this.options.controlTrigger, callback);
};

ClassySlider.prototype.setTimer = function (instant) {
  var _this = this;

  if (instant) {
    this.goToNext();
  }

  this.timer = setInterval(function () {
    _this.goToNext();
  }, this.options.timer);
};

ClassySlider.prototype.initDynamicControls = function () {
  var prevButton = Utils.createElem('span');
  Utils.addClass(prevButton, this.options.classPrefix + 'control-previous');
  Utils.setText(prevButton, 'Previous');
  this.addListener(prevButton, 'previous');
  this.prevButton = prevButton;
  this.options.el.appendChild(prevButton);

  var nextButton = Utils.createElem('span');
  Utils.addClass(nextButton, this.options.classPrefix + 'control-next');
  Utils.setText(nextButton, 'Next');
  this.addListener(nextButton, 'next');
  this.nextButton = nextButton;
  this.options.el.appendChild(nextButton);
};

ClassySlider.prototype.initControls = function () {
  var controls = Utils.createElem('ul');
  Utils.addClass(controls, this.options.classPrefix + 'controls');

  for (var i = 0; i < this.slides.length; i++) {
    var control = Utils.createElem('li');
    Utils.setText(control, i + 1);

    this.addListener(control, i);
    controls.appendChild(control);
  }

  this.controls = controls;
  this.options.el.appendChild(controls);
  
  if (this.options.dynamicControls) {
    this.initDynamicControls();
  }
};

ClassySlider.prototype.initSlider = function () {
  this.goToSlide(this.activeSlide);
  this.setTimer();

  if (this.options.controls) {
    this.initControls();
  }
};
