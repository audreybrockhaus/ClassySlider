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
    controls: true,
    controlTrigger: 'click',
    direction: 'forward',
    el: Utils.createElem('div'),
    startFrom: 0,
    timer: 2000,
    transition: 'fade'
    // pauseOnHover
  };

  this.options = opts;

  this.initVars();
  this.initSlider();
}

ClassySlider.prototype.initVars = function () {
  if (!this.options.el) {
    return;
  }

  var defaults = Utils.extend({}, this.defaults);
  this.options = Utils.extend(defaults, this.options);

  this.slides = Utils.getChildren(this.options.el);

  this.activeSlideIndex = this.targetSlideIndex = this.options.startFrom;
  this.activeSlide = this.targetSlide = this.slides[this.activeSlideIndex];
};

ClassySlider.prototype.updateState = function (active, target) {
  this.activeSlideIndex = active;
  this.activeSlide = this.slides[active];
  this.targetSlideIndex = target;
  this.targetSlide = this.slides[target];
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
  Utils.removeClass(this.activeSlide, 'active');
  Utils.addClass(this.targetSlide, 'active');
  this.updateState(this.targetSlideIndex, this.targetSlideIndex);
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
    _this.setTimer();
  };

  Utils.createListener(elem, this.options.controlTrigger, callback);
};

ClassySlider.prototype.setTimer = function () {
  var _this = this;

  this.timer = setInterval(function () {
    _this.goToNext();
  }, this.options.timer);
};

ClassySlider.prototype.initControls = function () {
  var controls = document.createElement('ul');
  Utils.addClass(controls, 'classy-slider-controls');

  for (var i = 0; i < this.slides.length; i++) {
    var control = document.createElement('li');
    Utils.setText(control, i + 1);

    this.addListener(control, i);
    controls.appendChild(control);
  }

  this.options.el.appendChild(controls);

  var prevButton = document.createElement('span');
  Utils.addClass(prevButton, 'classy-slider-control-previous');
  Utils.setText(prevButton, 'Previous');
  this.addListener(prevButton, 'previous');
  this.options.el.appendChild(prevButton);

  var nextButton = document.createElement('span');
  Utils.addClass(nextButton, 'classy-slider-control-next');
  Utils.setText(nextButton, 'Next');
  this.addListener(nextButton, 'next');
  this.options.el.appendChild(nextButton);
};

ClassySlider.prototype.initSlider = function () {
  this.goToSlide(this.activeSlide);
  this.setTimer();
  Utils.addClass(this.options.el, 'classy-slider');

  if (this.options.controls) {
    this.initControls();
  }
};
