  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls

var Utils = {
  createElem: function(elem) {
    return document.createElement(elem);
  },

  extend: function(obj1, obj2) {
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key]
      }
    }

    return obj1;
  },

  getChildren: function(elem) {
    var children = [];

    for (var i = 0; i < elem.children.length; i++) {
      children.push(elem.children[i]);
    }

    return children;
  },

  removeClass: function(elem, className) {
    var classes = elem.className.split(/\s+/),
        index = classes.indexOf(className);

    if (index >= 0) {
      classes.splice(index, 1);
      elem.className = classes.join(' ');
      Utils.removeClass(elem, className);
    }
  },

  addClass: function(elem, className) {
    Utils.removeClass(elem, className);
    elem.className += ' ' + className;
  }
};

function ClassySlider (opts) {
  this.defaults = {
    controls: true,
    el: Utils.createElem('div'),
    startFrom: 0,
    timer: 2000,
    transition: 'fade'
  }

  this.options = opts;

  this.initVars();
  this.setBinds();
};

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
  this.goToSlide(this.activeSlideIndex + 1);
};

ClassySlider.prototype.goToPrevious = function () {
  this.goToSlide(this.activeSlideIndex - 1);
};

ClassySlider.prototype.initControls = function () {
  var controls = document.createElement('ul');
  controls.className = 'slider-controls';

  for (var i = 0; i < this.slides.length; i++) {
    var control = document.createElement('li'),
        _this = this;
    control.innerText = i + 1;

    control.addEventListener('click', function () {
      clearInterval(_this.timer);
      _this.goToSlide(i);
      setTimeout(function () {
        _this.initSlider();
      }, _this.options.timer);
    });
    
    controls.appendChild(control);
  }

  this.options.el.appendChild(controls);

};

ClassySlider.prototype.initSlider = function () {
  var _this = this;

  this.goToSlide(this.activeSlide);

  this.timer = setInterval(function () {
    _this.goToNext(); 
  }, this.options.timer);
};

ClassySlider.prototype.setBinds = function () {
  this.initSlider();

  if (this.options.controls) {
    this.initControls();
  }
};