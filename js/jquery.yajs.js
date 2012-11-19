  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls

(function( $ ){
  
  var delay = 1000;
  var sliders = [];
  
  var deactivateSlides = function(slides) {
    var activeSlide = false;
    for (var i = 0; i < slides.length; i++) {
      var slide = $(slides[i]);
      if (slide.hasClass('active')) {
        activeSlide = i;
        slide.removeClass('active');
      }
    }
    return activeSlide;
  };
  
  var rotate = function(context) {
    var $this = $(this);
    var slides = context.slides;
    
    //Find & deactivate active slide
    var activeSlide = deactivateSlides(slides);
    
    //Activate next slide
    if (activeSlide === false) {
      activeSlide = 0;
    } else {
      activeSlide++;
    }

    if (activeSlide >= slides.length) {
      activeSlide = 0;
    };
    $(slides[activeSlide]).addClass('active');
    
    // Continue through other slides
    context.timer = setTimeout(function(){
      rotate(context, slides);
    }, delay);
    
  };
  
  var clickHandler = function(event, context){
    event.preventDefault();
    // Remove active class from current slide
    deactivateSlides(context.slides);
    // Find desired slide
    var targetSlide = $(event.target).data('index');
    // Add active class to desired slide
    context.slides.eq(targetSlide).addClass('active');
    // Stop timer
    clearTimeout(context.timer);
  };
        
  var methods = {
    init : function( options ) {
      this.each(function(){
        var $this = $(this);
        sliders.push($this);
        // Get an array of all the slides in the slider
        $this.slides = $this.children();
        $this.slides.addClass('slide');
        $this.timer = setTimeout(function(){
          rotate($this);
        }, delay);
      });
      
      // Give unique IDs to each slide
      for (i = 0; i < sliders.length; i++) {
        var slider = sliders[i];
        var slides = sliders[i].slides;
        // Add ol for markers
        var controls = $('<ol class="controls"></ol>');
        
        // Add markers (li) into ol
        for (j = 0; j < slides.length; j++) {
          var slide = $(slides[j]);
          var slideID = 'slide' + i + '-' + j;
          var slideNum = j + 1;
          slide.attr('id', slideID);
          var li = $('<li></li>');
          var anchor = $('<a href="#' + slideID + '">' + slideNum + '</a>').data('index',j);
          controls.append(li);
          li.append(anchor);
          anchor.click(
            function(event) {
              clickHandler(event, slider);
            });
        };
        slider.append(controls);
      };
      
    }
  };

  $.fn.yajs = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.yajs' );
    }    
  
  };

})( jQuery );