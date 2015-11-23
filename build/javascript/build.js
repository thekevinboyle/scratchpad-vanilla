(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
Simplest Possible Way:

function animatesausage() {
  $("<div />").appendTo("body");
  requestAnimationFrame(animatesausage);
}
requestAnimationFrame(animatesausage);
*/

/*
Polyfill: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
*/

var scrollTop,
    scrollScalar,
    sheetEast = document.getElementById('sheet-east'),
    sheetWest = document.getElementById('sheet-west'),
    sheetWidth = sheetEast.offsetWidth,
    sheetOffset,
    s = ""; // style string

// snap stuff
var scrollSnapWidth = sheetWidth / 16;
// Ease In Function
// Params: Time, Begin, Change (Finish - Begin), Duration
var easeIn; /* = function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
            };*/

function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

easeIn = easeOutCubic;
// Red Block
var $currframe = $('#currframe');

// Starting time and duration.
var seconds = 1;
var time = 0;
var duration = 60 * seconds;

// Starting Target, Begin, Finish & Change
var target = {
  x: 0,
  y: 0
};

var begin = {
  x: 0,
  y: 0
};

var finish = {
  x: 0,
  y: 0
};

var change = {
  x: finish.x - begin.x,
  y: finish.y - begin.y
};

// Called on each frame.
var onEnterFrame = function () {

  // Easing into the target.
  target.x = easeIn(time, begin.x, change.x, duration);
  target.y = easeIn(time, begin.y, change.y, duration);

  // CSS Transform
  $currframe[0].style.webkitTransform = 'translate(' + target.x + 'px, ' + target.y + 'px)';

  // Increase time.
  time++;
};

// Initial animation loop.
// Checks to see if it's necessary
(function animationLoop() {
  requestAnimationFrame(animationLoop);
  if (time <= duration) {
    onEnterFrame();
  }
})();

// On each mouse move, call moveTarget
$(window).bind('click', function (e) {
  moveTarget(e);
});

// Moves the target params and resets the time.
var moveTarget = function (e) {

  begin.x = target.x;
  //begin.y = target.y;

  finish.x = e.pageX;
  //finish.y = e.pageY;

  change.x = finish.x - begin.x;
  //change.y = finish.y - begin.y;

  time = 0;
};

var that = this;

var $sausage = $('#sausage');

var snapFlush = function () {

  // see where we are
  //
  // move the windows to where they should be
  requestAnimationFrame(snapFlush);
  // Do the horiz scroll
};

var isScrolling = null;

$(window).scroll(function () {
  isScrolling = true;
  clearTimeout($.data(this, 'scrollTimer'));
  $.data(this, 'scrollTimer', setTimeout(function () {
    // we've stopped scrolling
    // do something
    console.log("Haven't scrolled in 250ms!");
    isScrolling = false;
    scrollScalar = document.body.scrollTop / (document.body.clientHeight - window.innerHeight);

    sheetOffset = sheetWidth * scrollScalar;
    var adjust = sheetOffset % scrollSnapWidth;
    var e = {
      pageX: sheetOffset - adjust
    };
    moveTarget(e);
    //$.proxy(snapFlush, that)
  }, 250));
});

/**
 * Our animation loop - called by rAF
 */

function update() {

  scrollScalar = document.body.scrollTop / (document.body.clientHeight - window.innerHeight);

  // TODO: integrate 3d transform here if available
  //sheetWest.style.right = -sheetOffset + 'px'; // move bubble2 at 50% of scroll rate
  //sheetEast.style.left = -sheetOffset + 'px'; // move bubble1 at 20% of scroll rate

  if (isScrolling == true) {
    sheetOffset = sheetWidth * scrollScalar;
  } else if (isScrolling == false) {
    if (time <= duration) {
      sheetOffset = target.x = easeIn(time, begin.x, change.x, duration);
      time++;
    } else {
      isScrolling = null;
    }
  }
  // if(isScrolling == true) {
  // } else if (isScrolling == false) {
  //   // move to an ideal
  //   // target.x = easeIn(time, begin.x, change.x, duration);
  //   // target.y = easeIn(time, begin.y, change.y, duration);
  //
  //   // CSS Transform
  //   // $currframe[0].style.webkitTransform = 'translate(' + target.x + 'px, ' + target.y + 'px)';
  //
  //
  //   // Increase time.
  //
  // }

  s = 'translate3d(' + sheetOffset + 'px, 0, 0)';
  sheetWest.style.WebkitTransform = s;
  sheetWest.style.MozTransform = s;
  sheetWest.style.OTransform = s;
  sheetWest.style.msTransform = s;
  sheetWest.style.transform = s;
  s = 'translate3d(' + -sheetOffset + 'px, 0, 0)';
  sheetEast.style.WebkitTransform = s;
  sheetEast.style.MozTransform = s;
  sheetEast.style.OTransform = s;
  sheetEast.style.msTransform = s;
  sheetEast.style.transform = s;
  //console.log(scrollScalar * 100);
  // keep going
  requestAnimationFrame(update);
}

// schedule up the start
window.addEventListener('load', update, false);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvamF2YXNjcmlwdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDY0EsSUFBSSxTQUFTO0lBQ2IsWUFBWTtJQUNaLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQztJQUNqRCxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFDakQsVUFBVSxHQUFHLFNBQVMsQ0FBQyxXQUFXO0lBQ2xDLFdBQVc7SUFDWCxDQUFDLEdBQUMsRUFBRTs7O0FBQUMsQUFHTCxJQUFJLGVBQWUsR0FBRyxVQUFVLEdBQUMsRUFBRTs7O0FBQUMsQUFHcEMsSUFBSSxNQUFNOzs7O0FBQUMsQUFNWCxTQUFTLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRTtBQUNoRixTQUFPLGFBQWEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLGVBQWUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsR0FBRyxVQUFVLENBQUM7Q0FDakc7O0FBRUQsTUFBTSxHQUFHLFlBQVk7O0FBQUMsQUFFdEIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQzs7O0FBQUMsQUFHakMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNiLElBQUksUUFBUSxHQUFHLEVBQUUsR0FBRyxPQUFPOzs7QUFBQyxBQUc1QixJQUFJLE1BQU0sR0FBRztBQUNYLEdBQUMsRUFBRSxDQUFDO0FBQ0osR0FBQyxFQUFFLENBQUM7Q0FDTCxDQUFDOztBQUVGLElBQUksS0FBSyxHQUFHO0FBQ1YsR0FBQyxFQUFFLENBQUM7QUFDSixHQUFDLEVBQUUs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QUssQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLFdBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNqQyxXQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDL0IsV0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLFdBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUM7OztBQUFDLEFBRzlCLHVCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2pDOzs7QUFBQSxBQUdELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5TaW1wbGVzdCBQb3NzaWJsZSBXYXk6XG5cbmZ1bmN0aW9uIGFuaW1hdGVzYXVzYWdlKCkge1xuICAkKFwiPGRpdiAvPlwiKS5hcHBlbmRUbyhcImJvZHlcIik7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlc2F1c2FnZSk7XG59XG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZXNhdXNhZ2UpO1xuKi9cblxuLypcblBvbHlmaWxsOiBodHRwOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiovXG5cbnZhciBzY3JvbGxUb3AsXG5zY3JvbGxTY2FsYXIsXG5zaGVldEVhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hlZXQtZWFzdCcpLFxuc2hlZXRXZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoZWV0LXdlc3QnKSxcbnNoZWV0V2lkdGggPSBzaGVldEVhc3Qub2Zmc2V0V2lkdGgsXG5zaGVldE9mZnNldCxcbnM9XCJcIjsgLy8gc3R5bGUgc3RyaW5nXG5cbi8vIHNuYXAgc3R1ZmZcbnZhciBzY3JvbGxTbmFwV2lkdGggPSBzaGVldFdpZHRoLzE2O1xuLy8gRWFzZSBJbiBGdW5jdGlvblxuLy8gUGFyYW1zOiBUaW1lLCBCZWdpbiwgQ2hhbmdlIChGaW5pc2ggLSBCZWdpbiksIER1cmF0aW9uXG52YXIgZWFzZUluOy8qID0gZnVuY3Rpb24odCwgYiwgYywgZCkge1xuXG4gIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG5cbn07Ki9cblxuZnVuY3Rpb24gZWFzZU91dEN1YmljKGN1cnJlbnRJdGVyYXRpb24sIHN0YXJ0VmFsdWUsIGNoYW5nZUluVmFsdWUsIHRvdGFsSXRlcmF0aW9ucykge1xuICAgIHJldHVybiBjaGFuZ2VJblZhbHVlICogKE1hdGgucG93KGN1cnJlbnRJdGVyYXRpb24gLyB0b3RhbEl0ZXJhdGlvbnMgLSAxLCAzKSArIDEpICsgc3RhcnRWYWx1ZTtcbn1cblxuZWFzZUluID0gZWFzZU91dEN1YmljO1xuLy8gUmVkIEJsb2NrXG52YXIgJGN1cnJmcmFtZSA9ICQoJyNjdXJyZnJhbWUnKTtcblxuLy8gU3RhcnRpbmcgdGltZSBhbmQgZHVyYXRpb24uXG52YXIgc2Vjb25kcyA9IDE7XG52YXIgdGltZSA9IDA7XG52YXIgZHVyYXRpb24gPSA2MCAqIHNlY29uZHM7XG5cbi8vIFN0YXJ0aW5nIFRhcmdldCwgQmVnaW4sIEZpbmlzaCAmIENoYW5nZVxudmFyIHRhcmdldCA9IHtcbiAgeDogMCxcbiAgeTogMFxufTtcblxudmFyIGJlZ2luID0ge1xuICB4OiAwLFxuICB5OiAwXG59O1xuXG52YXIgZmluaXNoID0ge1xuICB4OiAwLFxuICB5OiAwXG59O1xuXG52YXIgY2hhbmdlID0ge1xuICB4OiBmaW5pc2gueCAtIGJlZ2luLngsXG4gIHk6IGZpbmlzaC55IC0gYmVnaW4ueVxufTtcblxuLy8gQ2FsbGVkIG9uIGVhY2ggZnJhbWUuXG52YXIgb25FbnRlckZyYW1lID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gRWFzaW5nIGludG8gdGhlIHRhcmdldC5cbiAgdGFyZ2V0LnggPSBlYXNlSW4odGltZSwgYmVnaW4ueCwgY2hhbmdlLngsIGR1cmF0aW9uKTtcbiAgdGFyZ2V0LnkgPSBlYXNlSW4odGltZSwgYmVnaW4ueSwgY2hhbmdlLnksIGR1cmF0aW9uKTtcblxuICAvLyBDU1MgVHJhbnNmb3JtXG4gICRjdXJyZnJhbWVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgdGFyZ2V0LnggKyAncHgsICcgKyB0YXJnZXQueSArICdweCknO1xuXG5cbiAgLy8gSW5jcmVhc2UgdGltZS5cbiAgdGltZSsrO1xuXG59O1xuXG4vLyBJbml0aWFsIGFuaW1hdGlvbiBsb29wLlxuLy8gQ2hlY2tzIHRvIHNlZSBpZiBpdCdzIG5lY2Vzc2FyeVxuKGZ1bmN0aW9uIGFuaW1hdGlvbkxvb3AoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb25Mb29wKTtcbiAgaWYgKHRpbWUgPD0gZHVyYXRpb24pIHtcbiAgICBvbkVudGVyRnJhbWUoKTtcbiAgfVxufSkoKTtcblxuLy8gT24gZWFjaCBtb3VzZSBtb3ZlLCBjYWxsIG1vdmVUYXJnZXRcbiQod2luZG93KS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgbW92ZVRhcmdldChlKTtcbn0pO1xuXG4vLyBNb3ZlcyB0aGUgdGFyZ2V0IHBhcmFtcyBhbmQgcmVzZXRzIHRoZSB0aW1lLlxudmFyIG1vdmVUYXJnZXQgPSBmdW5jdGlvbihlKSB7XG5cbiAgYmVnaW4ueCA9IHRhcmdldC54O1xuICAvL2JlZ2luLnkgPSB0YXJnZXQueTtcblxuICBmaW5pc2gueCA9IGUucGFnZVg7XG4gIC8vZmluaXNoLnkgPSBlLnBhZ2VZO1xuXG4gIGNoYW5nZS54ID0gZmluaXNoLnggLSBiZWdpbi54O1xuICAvL2NoYW5nZS55ID0gZmluaXNoLnkgLSBiZWdpbi55O1xuXG4gIHRpbWUgPSAwO1xuXG59O1xuXG52YXIgdGhhdCA9IHRoaXM7XG5cbnZhciAkc2F1c2FnZSA9ICQoJyNzYXVzYWdlJyk7XG5cbnZhciBzbmFwRmx1c2ggPSBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gc2VlIHdoZXJlIHdlIGFyZVxuICAvL1xuICAvLyBtb3ZlIHRoZSB3aW5kb3dzIHRvIHdoZXJlIHRoZXkgc2hvdWxkIGJlXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShzbmFwRmx1c2gpO1xuICAvLyBEbyB0aGUgaG9yaXogc2Nyb2xsXG59XG5cbnZhciBpc1Njcm9sbGluZyA9IG51bGw7XG5cbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgIGNsZWFyVGltZW91dCgkLmRhdGEodGhpcywgJ3Njcm9sbFRpbWVyJykpO1xuICAgICQuZGF0YSh0aGlzLCAnc2Nyb2xsVGltZXInLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgLy8gd2UndmUgc3RvcHBlZCBzY3JvbGxpbmdcbiAgICAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGF2ZW4ndCBzY3JvbGxlZCBpbiAyNTBtcyFcIik7XG4gICAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIHNjcm9sbFNjYWxhciA9ICggZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgLyAoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpICk7XG5cbiAgICAgICAgc2hlZXRPZmZzZXQgPSBzaGVldFdpZHRoICogc2Nyb2xsU2NhbGFyO1xuICAgICAgICB2YXIgYWRqdXN0ID0gc2hlZXRPZmZzZXQlc2Nyb2xsU25hcFdpZHRoO1xuICAgICAgICB2YXIgZSA9IHtcbiAgICAgICAgICBwYWdlWDogc2hlZXRPZmZzZXQgLSBhZGp1c3RcbiAgICAgICAgfVxuICAgICAgICBtb3ZlVGFyZ2V0KGUpO1xuICAgICAgICAvLyQucHJveHkoc25hcEZsdXNoLCB0aGF0KVxuICAgIH0sIDI1MCkpO1xufSk7XG5cbi8qKlxuICogT3VyIGFuaW1hdGlvbiBsb29wIC0gY2FsbGVkIGJ5IHJBRlxuICovXG5cblxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG5cbiAgICBzY3JvbGxTY2FsYXIgPSAoIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIC8gKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSApO1xuXG5cbiAgICAvLyBUT0RPOiBpbnRlZ3JhdGUgM2QgdHJhbnNmb3JtIGhlcmUgaWYgYXZhaWxhYmxlXG4gICAgLy9zaGVldFdlc3Quc3R5bGUucmlnaHQgPSAtc2hlZXRPZmZzZXQgKyAncHgnOyAvLyBtb3ZlIGJ1YmJsZTIgYXQgNTAlIG9mIHNjcm9sbCByYXRlXG4gICAgLy9zaGVldEVhc3Quc3R5bGUubGVmdCA9IC1zaGVldE9mZnNldCArICdweCc7IC8vIG1vdmUgYnViYmxlMSBhdCAyMCUgb2Ygc2Nyb2xsIHJhdGVcblxuXG4gICAgaWYoaXNTY3JvbGxpbmcgPT0gdHJ1ZSkge1xuICAgICAgc2hlZXRPZmZzZXQgPSBzaGVldFdpZHRoICogc2Nyb2xsU2NhbGFyO1xuICAgIH0gZWxzZSBpZiAoaXNTY3JvbGxpbmcgPT0gZmFsc2UpIHtcbiAgICAgIGlmICh0aW1lIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgIHNoZWV0T2Zmc2V0ID0gdGFyZ2V0LnggPSBlYXNlSW4odGltZSwgYmVnaW4ueCwgY2hhbmdlLngsIGR1cmF0aW9uKTtcbiAgICAgICAgdGltZSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNTY3JvbGxpbmcgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZihpc1Njcm9sbGluZyA9PSB0cnVlKSB7XG4gICAgLy8gfSBlbHNlIGlmIChpc1Njcm9sbGluZyA9PSBmYWxzZSkge1xuICAgIC8vICAgLy8gbW92ZSB0byBhbiBpZGVhbFxuICAgIC8vICAgLy8gdGFyZ2V0LnggPSBlYXNlSW4odGltZSwgYmVnaW4ueCwgY2hhbmdlLngsIGR1cmF0aW9uKTtcbiAgICAvLyAgIC8vIHRhcmdldC55ID0gZWFzZUluKHRpbWUsIGJlZ2luLnksIGNoYW5nZS55LCBkdXJhdGlvbik7XG4gICAgLy9cbiAgICAvLyAgIC8vIENTUyBUcmFuc2Zvcm1cbiAgICAvLyAgIC8vICRjdXJyZnJhbWVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgdGFyZ2V0LnggKyAncHgsICcgKyB0YXJnZXQueSArICdweCknO1xuICAgIC8vXG4gICAgLy9cbiAgICAvLyAgIC8vIEluY3JlYXNlIHRpbWUuXG4gICAgLy9cbiAgICAvLyB9XG5cbiAgICBzID0gJ3RyYW5zbGF0ZTNkKCcgKyBzaGVldE9mZnNldCAgKyAncHgsIDAsIDApJztcbiAgICBzaGVldFdlc3Quc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gcztcbiAgICBzaGVldFdlc3Quc3R5bGUuTW96VHJhbnNmb3JtID0gcztcbiAgICBzaGVldFdlc3Quc3R5bGUuT1RyYW5zZm9ybSA9IHM7XG4gICAgc2hlZXRXZXN0LnN0eWxlLm1zVHJhbnNmb3JtID0gcztcbiAgICBzaGVldFdlc3Quc3R5bGUudHJhbnNmb3JtID0gcztcbiAgICBzID0gJ3RyYW5zbGF0ZTNkKCcgKyAtc2hlZXRPZmZzZXQgICsgJ3B4LCAwLCAwKSc7XG4gICAgc2hlZXRFYXN0LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHM7XG4gICAgc2hlZXRFYXN0LnN0eWxlLk1velRyYW5zZm9ybSA9IHM7XG4gICAgc2hlZXRFYXN0LnN0eWxlLk9UcmFuc2Zvcm0gPSBzO1xuICAgIHNoZWV0RWFzdC5zdHlsZS5tc1RyYW5zZm9ybSA9IHM7XG4gICAgc2hlZXRFYXN0LnN0eWxlLnRyYW5zZm9ybSA9IHM7XG4gICAgLy9jb25zb2xlLmxvZyhzY3JvbGxTY2FsYXIgKiAxMDApO1xuICAvLyBrZWVwIGdvaW5nXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG5cbi8vIHNjaGVkdWxlIHVwIHRoZSBzdGFydFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB1cGRhdGUsIGZhbHNlKTtcblxuXG4iXX0=
