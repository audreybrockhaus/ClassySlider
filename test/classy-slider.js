suite('ClassySlider', function () {
    
  var slider,
      sliderElem,
      opts = {},
      slides = [];

  setup(function () {
    sliderElem = document.createElement('div');
    
    for (var i = 0; i < 5; i++) {
      var slide = document.createElement('div');
      sliderElem.appendChild(slide);
    }

    opts.el = sliderElem;

    slider = new ClassySlider(opts);

    var children = Utils.getChildren(sliderElem);

    for (var j = 0; j < children.length; j++) {
      if (children[j].nodeName === 'DIV') {
        slides.push(children[j]);
        console.log(children[j]);
      }
    }
  });

  test('constructor', function () {
    assert.instanceOf(slider, ClassySlider);
  });

  test('updateClass', function () {
    for (var i = 0; i < slides.length; i++) {
      assert.strictEqual(slides[i].className.indexOf('classy-slider-'), 1);
    }
  });

  test('initClasses', function () {
    var classes = sliderElem.className;
    assert.strictEqual(classes.indexOf('classy-slider'), 1);
  });

  test('initVars', function () {
    var options = Utils.extend(slider.defaults, opts);

    assert.strictEqual(slider.slides.length, slides.length);

    for (var key in slider.options) {
      if (options.hasOwnProperty(key)) {
        assert.strictEqual(slider.options[key], options[key]);
      }
    }
  });

  test('updateClasses', function () {
    assert.strictEqual(true, false);
  });

  test('updateState', function () {
    assert.strictEqual(true, false);
  });

  test('getFinalIndex', function () {
    assert.strictEqual(true, false);
  });

  test('goToSlide', function () {
    assert.strictEqual(true, false);
  });

  test('goToNext', function () {
    assert.strictEqual(true, false);
  });

  test('goToPrevious', function () {
    assert.strictEqual(true, false);
  });

  test('addListener', function () {
    assert.strictEqual(true, false);
  });

  test('setTimer', function () {
    assert.strictEqual(true, false);
  });

  test('initDynamicControls', function () {
    assert.strictEqual(true, false);
  });

  test('initControls', function () {
    assert.strictEqual(true, false);
  });

  test('initSlider', function () {
    assert.strictEqual(true, false);
  });
});
