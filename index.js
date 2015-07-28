/**
 * Module dependencies.
 */

var Tween = require('tween-component');
var raf = require('raf-component');

/**
 * Expose `animateProperty`.
 */

module.exports = animateProperty;

/**
 * Animate properties of a given element.
 *
 * @param {Number} x
 * @param {Number} y
 * @api public
 */

function animateProperty(el, props, options) {
  options = options || {};

  // start position
  var start = initial(el, props);

  // setup tween
  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to(props)
    .duration(options.duration || 1000);

  // animate
  tween.update(function(o){
    for(var key in o)
    {
      //don't set something that was never defined in the first place
      if(el[key] != undefined)
        el[key] = o[key];
      else if(el.setAttribute) { //if it is undefined, we check for setAttribute
        el.setAttribute(key, o[key]);
      }
      else {
        //uh oh -- don't know about this case -- maybe we'll just set it to be safe
        el[key] = o[key];
        //note that the order of if/else operations is important,
        //that's why we don't just set el[key] = o[key] in the first place
      }
    }
  });

  // handle end
  tween.on('end', function(){
    animate = function(){};
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();
  
  return tween;
}

/**
 * Return intitial values.
 *
 * @return {Object}
 * @api private
 */

function initial(el, props) {
  //check properties -- we want the intial value
  var initial = {};
  for(var key in props)
  {
    var pVal = el[key];
    if(pVal == undefined && el.getAttribute)
      pVal = el.getAttribute(key);
      
    pVal = pVal || 0;
    initial[key] = pVal;
  }
  return initial;
}
