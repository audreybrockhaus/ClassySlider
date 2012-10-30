  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls?

(function( $ ){
  
  var delay = 1000;
  
  var rotate = function(context, slides) {
    //Find & deactivate first (active) slide
    for (var i = 0; i < slides.length; i++) {
      
    }
    //Activate next slide
    //Repeat until end of array
    //Activate first slide
    
  };
  
  var methods = {
    init : function( options ) {
      this.each(function(){
        var $this = $(this);
        // Get an array of all the slides in the slider
        var slides = $this.find('.slide');
        var timer = setTimeout(function(){
          rotate($this, slides);
        }, delay);
      });
      
    }
  };

  $.fn.jimmysslider = function( method ) {
    
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