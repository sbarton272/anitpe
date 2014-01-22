/**
 * Register your submission and choose a character
 * For more information check out the documentation
 * http://anitype.com/documentation
 */
Anitype.register('W', {

  // Enter your name
  author: 'sbarton272',

  // Enter a personal website, must have http
  website: 'https://github.com/sbarton272',

  // Make your animation here
  construct: function(two, points) {

    // Reference to instance
    var anitype = this;

    // Create a Two.Polygon
    var polygon = anitype.makePolygon(points);
    
    // Set an initial state
    polygon.scale = 1;

    // Useful vars
    var easing = Anitype.Easing.Elastic.Out;
    var startX = 0;
    
    // start all points at zero
    _.each(polygon.vertices, function(v, i) {
      var curX = v.x;
      v.x = startX;
      
      anitype.addTween(v, {
        
        to: { x: curX },
        easing: easing,
        duration: 0.5, // Value from 0 - 1
        start: 0,        // Value from 0 - 1
        complete : function() 
        {  
          anitype.addTween(v, {
            to: { x: startX },
            easing: easing,
            duration: 0.5, // Value from 0 - 1
            start: 0.5        // Value from 0 - 1
          });
        }
      }); // addTween
    }); // each

    // Return your polygon wrapped in a group.
    return two.makeGroup(polygon);

  }

});