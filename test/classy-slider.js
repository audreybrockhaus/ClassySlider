/* jshint newcap: false */

suite('ClassySlider', function () {
    
  var slider,
      sliderElem,
      opts = {},
      slides,
      Utils = window.Utils;

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

  test('goToSlide', function (done) {
    this.timeout(2100);
    slider.goToSlide(1);
    assert.strictEqual(slider.activeSlideIndex, 1);
    assert.strictEqual(slider.targetSlideIndex, 1);
    assert.strictEqual(slider.previousSlideIndex, 0);

    done();
    /*setTimeout(function () {
      assert.strictEqual(slides[1].className, ' ' + slider.options.classPrefix + 'active');
      assert.strictEqual(slides[0].className, ' ' + slider.options.classPrefix + 'left');
      done();
    }, 2000);*/
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

  test('addListener', function (done) {
    this.timeout(300);

    slider.options.timer = 100;
    
    var elem = document.createElement('a');
    document.body.appendChild(elem);

    setTimeout(function () {
      slider.addListener(elem, 1);
      Utils.fireEvent(elem, 'click');
      assert.strictEqual(slider.activeSlideIndex, 2);

      slider.addListener(elem, 'next');
      Utils.fireEvent(elem, 'click');
      assert.strictEqual(slider.activeSlideIndex, 3);
      
      slider.addListener(elem, 'previous');
      Utils.fireEvent(elem, 'click');
      assert.strictEqual(slider.activeSlideIndex, 2);

      done();
    }, 10);
  });

  test('setTimer', function (done) {
    this.timeout(slider.options.timer + 200);

    slider.options.timer = 100;

    slider.goToSlide(1);
    slider.setTimer(true);
    assert.strictEqual(slider.activeSlideIndex, 2);

    clearInterval(slider.timer);

    slider.setTimer();
    setTimeout(function () {
      assert.strictEqual(slider.activeSlideIndex, 3);
      done();
    }, slider.options.timer);
  });

  test('initPrevBtn', function () {
    slider.initPrevBtn();

    assert.strictEqual(slider.prevButton.className, ' ' + slider.options.classPrefix + 'control-previous');
    assert.strictEqual(slider.prevButton.nodeName, 'SPAN');
    assert.strictEqual(Utils.getText(slider.prevButton), 'Previous');
  });

  test('initNextBtn', function () {
    slider.initNextBtn();

    assert.strictEqual(slider.nextButton.className, ' ' + slider.options.classPrefix + 'control-next');
    assert.strictEqual(slider.nextButton.nodeName, 'SPAN');
    assert.strictEqual(Utils.getText(slider.nextButton), 'Next');
  });

  test('initDynamicControls', function () {
    slider.goToSlide(1);
    
    assert.ok(slider.nextButton);
    Utils.fireEvent(slider.prevButton, 'click');
    assert.strictEqual(slider.activeSlideIndex, 0);

    assert.ok(slider.nextButton);
    Utils.fireEvent(slider.nextButton, 'click');
    assert.strictEqual(slider.activeSlideIndex, 1);
  });

  test('initControls', function () {
    var controls = Utils.getChildren(slider.controls);
    Utils.fireEvent(controls[1], 'click');
    assert.strictEqual(slider.activeSlideIndex, 2);
  });

  test('pauseOnHover', function () {
    Utils.fireEvent(slider.options.el, 'mouseover');
    assert.isTrue(slider.timerClear);

    Utils.fireEvent(slider.options.el, 'mouseout');
    assert.isFalse(slider.timerClear);
  });
});
