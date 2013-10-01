/* jshint newcap: false */

suite('ClassySlider', function () {
    
  var slider,
      sliderElem,
      opts = {},
      slides;

  setup(function () {
    sliderElem = document.createElement('div');
    
    for (var i = 0; i < 5; i++) {
      var slide = document.createElement('div');
      sliderElem.appendChild(slide);
    }

    opts.el = sliderElem;

    slider = ClassySlider(opts);

    var children = Utils.getChildren(sliderElem);
    slides = [];

    for (var j = 0; j < children.length; j++) {
      if (children[j].nodeName === 'DIV') {
        slides.push(children[j]);
      }
    }
  });

  test('constructor', function () {
    assert.instanceOf(slider, ClassySlider);
  });

  test('updateClass', function () {
    for (var i = 0; i < slides.length; i++) {
      assert.strictEqual(slides[i].className.indexOf(slider.options.classPrefix), 1);
    }
  });

  test('initClasses', function () {
    var classes = sliderElem.className.split(' ');
    assert.isTrue(classes.indexOf('classy-slider') > -1);
    assert.isTrue(classes.indexOf(slider.options.classPrefix + slider.options.transition) > -1);
  });

  test('initVars', function () {
    var options = Utils.extend(slider.defaults, opts);

    assert.strictEqual(slider.slides.length, slides.length);
    assert.deepEqual(slider.options, options);
  });

  test('updateState', function () {
    slider.updateState(1, 2, 3);
    assert.strictEqual(slider.activeSlideIndex, 1);
    assert.strictEqual(slider.targetSlideIndex, 2);
    assert.strictEqual(slider.previousSlideIndex, 3);
  });

  test('getFinalIndex', function () {
    assert.strictEqual(slider.getFinalIndex(1), 1);
    assert.strictEqual(slider.getFinalIndex(-1), 4);
    assert.strictEqual(slider.getFinalIndex(6), 0);
  });

  test('goToSlide', function () {
    slider.goToSlide(1);
    assert.strictEqual(slider.activeSlideIndex, 1);
    assert.strictEqual(slider.targetSlideIndex, 1);
    assert.strictEqual(slider.previousSlideIndex, 0);

    setTimeout(function () {
      assert.strictEqual(slides[1].className, ' ' + slider.options.classPrefix + 'active');
      assert.strictEqual(slides[0].className, ' ' + slider.options.classPrefix + 'left');
    }, 100);
  });

  test('goToNext', function () {
    slider.goToSlide(1);
    slider.goToNext();
    assert.strictEqual(slider.activeSlideIndex, 2);

    slider.options.direction = 'backward';
    slider.goToNext();
    assert.strictEqual(slider.activeSlideIndex, 1);
  });

  test('goToPrevious', function () {
    slider.goToSlide(1);
    slider.goToPrevious();
    assert.strictEqual(slider.activeSlideIndex, 0);

    slider.options.direction = 'backward';
    slider.goToPrevious();
    assert.strictEqual(slider.activeSlideIndex, 1);
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

  test('pauseOnHover', function () {
    assert.strictEqual(true, false);
  });

  test('initSlider', function () {
    assert.strictEqual(true, false);
  });
});
