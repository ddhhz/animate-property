# animate-property

  Smooth property animations with requestAnimationFrame and [Tween](https://github.com/component/tween).

## Installation

    $ component install optimuslime/animate-property

## API

### animateProperties(el, props, [options])

  Animate the given properties to a desired end with the additional `options`:

  - `ease` easing function defaulting to "out-circ" (view [ease](https://github.com/component/ease) for more)
  - `duration` animation duration defaulting to `1000`

```js
var animateProperty = require('animate-property');

var div = document.createElement('div');
div.offsetTop = 0;
animateProperty(div, {offsetTop: 100} , {
  ease: 'out-bounce',
  duration: 1500
});
```

## License

  MIT
