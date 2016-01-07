(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

  var $imageListItem = $('.image-list__item');

  // add class to image--list__item

  $imageListItem.on('click', function () {
    $(this).addClass('image-list__item__active').siblings().removeClass('image-list__item__active');

    $imageListItem.on('dblclick', function () {
      var $deleted = $(this).detach().removeClass('image-list__item__active');
      $('.image-list.deleted').append($deleted);
    });
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvamF2YXNjcmlwdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVcsQUFFM0I7O01BQUssY0FBYyxHQUFHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQzs7OztBQUFDLEFBSTdDLGdCQUFjLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFXLEFBQ3BDO0tBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxBQUVoRzs7a0JBQWMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDLFlBQVcsQUFDdEM7VUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEFBQ3hFO09BQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMzQyxDQUFDLENBQUE7R0FFSCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXHIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxyICB2YXIgICRpbWFnZUxpc3RJdGVtID0gJCgnLmltYWdlLWxpc3RfX2l0ZW0nKTtcclxyICAvLyBhZGQgY2xhc3MgdG8gaW1hZ2UtLWxpc3RfX2l0ZW1cclxyICAkaW1hZ2VMaXN0SXRlbS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcciAgICAkKHRoaXMpLmFkZENsYXNzKCdpbWFnZS1saXN0X19pdGVtX19hY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdpbWFnZS1saXN0X19pdGVtX19hY3RpdmUnKTtcclxyICAgICRpbWFnZUxpc3RJdGVtLm9uKCdkYmxjbGljaycsZnVuY3Rpb24oKSB7XHIgICAgICB2YXIgJGRlbGV0ZWQgPSAkKHRoaXMpLmRldGFjaCgpLnJlbW92ZUNsYXNzKCdpbWFnZS1saXN0X19pdGVtX19hY3RpdmUnKTtcciAgICAgICQoJy5pbWFnZS1saXN0LmRlbGV0ZWQnKS5hcHBlbmQoJGRlbGV0ZWQpO1xyICAgIH0pXHJcciAgfSk7XHJ9KTtcciJdfQ==
