// I hope we all know whats going on in here...

"use strict";

// IIFE
(function($) {
  
  // When the DOM is ready, call the getJSONData() to create an ajax request to the flickr api
  $(document).ready(function() {
  	getJSONData();
  });

  // AJAX call, ring ring hello helloooo ??
  function getJSONData() {
    var flickrURL = '';
  	$.getJSON( flickrURL, successFn );
  }

  // **picks up** ah yes hello, I have your request, here you go!
  function successFn(result) {
  	console.log(result);
  	console.log("flickr images loaded, hurray! do a backflip");

  	initMasonry();
  }

  // Something went wrong!
  function errorFn(xhr, status, strErr) {
    console.log(strErr);
  }

  // initialize masonry
  	// This is pretty default stuff right here that you can find in the 
  	// documentation / examples, I won't go over this unless you ask me to.
  function initMasonry() {
  	// first handle the imagesloaded because we are loading images
  	var $grid = $('.grid').imagesLoaded( function() {
    console.log("masonry initialized");

    // Now call masonry after all images have loaded so it'll 
    // properly gridify the images, gridify is probably not a real word.
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
  });
  	
  	// we can init the featherlight library here.
	initFeatherLight();
  }

  // Also very default settings here and can be found below: 
  	// https://github.com/noelboss/featherlight/#installation
		// https://codepen.io/HVinh/pen/dYrPdK
	function initFeatherLight() {
	  $('a.gallery').featherlightGallery({
	    previousIcon: '«',     /* Code that is used as previous icon */
			nextIcon: '»',         /* Code that is used as next icon */
			galleryFadeIn: 100,    /* fadeIn speed when slide is loaded */
			galleryFadeOut: 100    /* fadeOut speed before slide is loaded */
		});
	}

})(jQuery);