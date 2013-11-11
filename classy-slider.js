  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable
    // Click link to rotate - direct & dynamic
    // Define transition type
    // Display controls

function ClassySlider(opts) {
  if (this instanceof ClassySlider === false) {
    return new ClassySlider(opts);
  }

  this.defaults = {
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
                  // 'cover-[up|down|left|right]'
                  // 'reveal-[up|down|left|right]'
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
    Utils.addClass(this.slides[0], prefix + 'wrap-begin');
  } else {
    Utils.removeClass(this.slides[0], prefix + 'wrap-begin');
  }

  if (start === 0) {
    Utils.addClass(last, prefix + 'wrap-end');
  } else {
    Utils.removeClass(last, prefix + 'wrap-end');
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
      _this.setTimer();
    } else if (index === 'previous') {
      _this.goToPrevious();
      _this.setTimer();
    } else {
      _this.goToSlide(index);
      _this.setTimer(true);
    }
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

ClassySlider.prototype.initPrevBtn = function () {
  var prevButton = Utils.createElem('span');
  Utils.addClass(prevButton, this.options.classPrefix + 'control-previous');
  Utils.setText(prevButton, 'Previous');
  this.prevButton = prevButton;
};

ClassySlider.prototype.initNextBtn = function () {
  var nextButton = Utils.createElem('span');
  Utils.addClass(nextButton, this.options.classPrefix + 'control-next');
  Utils.setText(nextButton, 'Next');
  this.nextButton = nextButton;
};

ClassySlider.prototype.initDynamicControls = function () {
  this.initPrevBtn();
  this.addListener(this.prevButton, 'previous');
  this.options.el.appendChild(this.prevButton);

  this.initNextBtn();
  this.addListener(this.nextButton, 'next');
  this.options.el.appendChild(this.nextButton);
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

ClassySlider.prototype.pauseOnHover = function () {
  var _this = this;

  Utils.createListener(this.options.el, 'mouseover', function () {
    clearTimeout(_this.timer);
    _this.timerClear = true;
  });

  Utils.createListener(this.options.el, 'mouseout', function () {
    _this.setTimer();
    _this.timerClear = false;
  });
};

ClassySlider.prototype.initSlider = function () {
  this.goToSlide(this.activeSlide);
  this.setTimer();

  if (this.options.pauseOnHover) {
    this.pauseOnHover();
  }

  if (this.options.controls) {
    this.initControls();
  }
};
