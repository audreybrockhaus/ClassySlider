  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls

var Utils = {
  createElem = function(elem) {
    return document.createElement(elem);
  },

  extend = function(obj1, obj2) {
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key]
      }
    }

    return obj1;
  },

  getChildren = function(elem) {
    return Array.prototype.slice.apply(this, elem.children);
    // switch to for loop
  }
};

function ClassySlider (opts) {
  this.defaults = {
    controls: true,
    el: Utils.createElem('div'),
    startFrom: 0,
    timer: 2000
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

  this.activeSlideIndex = this.options.startFrom;
  this.activeSlide = this.slides[this.options.startFrom];
};

ClassySlider.prototype.setBinds = function () {
};
