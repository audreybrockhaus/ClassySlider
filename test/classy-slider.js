suite('classy-slider', function () {
    
  var slider;

  setup(function () {
    var sliderElem = document.createElement('div');
    
    for (var i = 0; i < 5; i++) {
      var slide = document.createElement('span');
      sliderElem.appendChild(slide);
    }

    var opts = {
      el: sliderElem
    };

    slider = new ClassySlider(opts);
  });

  test('constructor', function () {
    assert.strictEqual(true, false);
  });

  test('updateClass', function () {
    assert.strictEqual(true, false);
  });

  test('initClasses', function () {
    assert.strictEqual(true, false);
  });

  test('initVars', function () {
    assert.strictEqual(true, false);
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
