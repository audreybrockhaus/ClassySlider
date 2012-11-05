  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls

(function( $ ){
  
  var delay = 1000;
  var sliders = [];
  
  var rotate = function(context, slides) {
    
    var activeSlide;
    
    //Find & deactivate active slide
    for (var i = 0; i < slides.length; i++) {
      var slide = $(slides[i]);
      if (slide.hasClass('active')) {
        activeSlide = i;
        slide.removeClass('active');
      }
    }

    //Activate next slide
    if (activeSlide === undefined) {
      activeSlide = 0;
    } else {
      activeSlide++;
    }

    if (activeSlide >= slides.length) {
      activeSlide = 0;
    };
    $(slides[activeSlide]).addClass('active');
    
    // Continue through other slides
    var timer = setTimeout(function(){
      rotate(context, slides);
    }, delay);
    
  };
  
  var clickHandler = function(event){
    event.preventDefault();
    // Remove active class from current slide
    // Find desired slide
    // Add active class to desired slide
    // Stop animation
  };
        
  var methods = {
    init : function( options ) {
      this.each(function(){
        var $this = $(this);
        sliders.push($this);
        // Get an array of all the slides in the slider
        var slides = $this.children();
        slides.addClass('slide');
        var timer = setTimeout(function(){
          rotate($this, slides);
        }, delay);
      });
      
      // Give unique IDs to each slide
      for (i = 0; i < sliders.length; i++) {
        var slides = sliders[i].children();
        // Add ol for markers
        //sliders[i].append('<ol class="controls"></ol>');
        //var controls = sliders[i].find('.controls');
        var controls = $('<ol class="controls"></ol>');
        
        // Add markers (li) into ol
        for (j = 0; j < slides.length; j++) {
          var slide = $(slides[j]);
          var slideID = 'slide' + i + '-' + j;
          var slideNum = j + 1;
          slide.attr('id', slideID);
          //controls.append('<li><a href="#' + slideID + '">' + slideNum + '</a></li>');
          var li = $('<li></li>');
          var anchor = $('<a href="#' + slideID + '">' + slideNum + '</a>');
          controls.append(li);
          li.append(anchor);
          anchor.click(clickHandler);
        };
        sliders[i].append(controls);
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