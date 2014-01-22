/**
 * Register your submission and choose a character
 * For more information check out the documentation
 * http://anitype.com/documentation
 */
Anitype.register('Q', {

  // Enter your name
  author: 'sbarton272',

  // Enter a personal website, must have http
  website: 'https://github.com/sbarton272',

  // Make your animation here
  construct: function(two, points) {

    // Reference to instance
    var anitype = this;

    // Create a Two.Polygon
    var linePoints = points.splice(5,2);
    var ovalPoints= points;
    var oval = anitype.makePolygon(ovalPoints);
    var line = anitype.makePolygon(linePoints);
    
    var xOffset  = -500;
    var littleHopHeight = 50;
    var bigHopHeight = 200;
    var littleHopTime = .3;
    var bigHopTime = .5;
    var nLittleHops = 1;
    var totHopTime = littleHopTime + bigHopTime;

    // rotate oval
    oval.rotation = -.05;
        
    // store original y values
    _.each(line.vertices, function(v,t) {
        v.startY = v.y;
    });
    
    // hop line over
    anitype.addTick( function(percent) {
      _.each(line.vertices, function(v,t) {
        
        // x movement
        if( percent < totHopTime ) {
          var xDistPercent = (totHopTime - percent) / totHopTime;
          v.x = xDistPercent * xOffset;
        }
        
        // y movement
        var hopTime;
        if( percent < littleHopTime ) {
          // map percent [0,littleHopTime] -> [0,1]
          hopTime = percent / littleHopTime;
          v.y = v.startY - littleHopHeight* Math.abs(Math.sin(Math.PI * hopTime * nLittleHops));

        } else if ( percent < totHopTime ) {
          // map percent [littleHopTime, bigHopTim+littleHopTime] -> [0,1]
          hopTime = (percent - littleHopTime) / bigHopTime;
          v.y = v.startY - bigHopHeight*Math.sin(Math.PI * hopTime);
          
        }
        
      }); 
    });
    
    anitype.addTween(oval, {
      to: {rotation: 0},
      easing: Anitype.Easing.easeOutSine,
      duration: totHopTime, // Value from 0 - 1
      start: 0        // Value from 0 - 1
    });

    // Return your polygon wrapped in a group.
    return two.makeGroup(oval, line);

  }

});