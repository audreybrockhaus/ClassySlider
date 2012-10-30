  //Slider
    // Rotate N slides of HTML in content
    // Auto rotate - adjustable (global)
    // Click link to rotate - direct & dynamic
    // Define transition type (global)
    // Display controls?

(function( $ ){
  
  var delay = 1000;
  
  var rotate = function(context, slides) {
    //Deactivate first (active) slide
    for slides
    //Activate next slide
    //Repeat until end of array
    //Activate first slide
    
  };
  
  var methods = {
    init : function( options ) {
      this.each(function(){
        var $this = $(this);
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
      $.error( 'Method ' +  method + ' does not exist on jQuery.jimmysslider' );
    }    
  
  };

})( jQuery );