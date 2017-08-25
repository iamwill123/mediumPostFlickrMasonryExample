// Navigate to:
   // https://www.flickr.com/services/developer
// then: 
   // https://www.flickr.com/services/api/
// or use this link: https://www.flickr.com/services/apps/create/

"use strict";

// IIFE
(function($) {
  
  // When the DOM is ready, call the getJSONData() to create an ajax request to the flickr api
  $(document).ready(function() {
  	getJSONData();
  });

  // AJAX call, ring ring hello helloooo ??
  function getJSONData() {
    var API_KEY ="8f29ca9d04e2badc2e07dc346663e0f9";
    var photoset_ID = "72157685222990161";
    
    var flickrURL = "https://api.flickr.com/services/rest/" +
                    "?method=flickr.photosets.getPhotos" +
                    "&api_key=" + API_KEY +
                    "&photoset_id=" + photoset_ID +
                    "&privacy_filter=1" +  // 1 signifies all public photos.
                    "&format=json&nojsoncallback=1";
                    
  	$.getJSON( flickrURL, successFn );
  }

  // **picks up** ah yes hello, I have your request, here you go!
  function successFn(result) {
  	console.log(result);
  	console.log("flickr request is a success, do a backflip");
    
    var photosetTitle = result.photoset.title;
		$("#photo-grid h1").html(photosetTitle);
		
    var $gridMasterClass = $("<div class='grid' />").append("<div class='grid-sizer' />");
    $("#photo-grid").append($gridMasterClass);
  
    $.each(result.photoset.photo, function(i, photo) {
      var originalSizeURL = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
  
      $("<img>").attr("src", originalSizeURL)
        .appendTo(".grid")
        .wrap("<div class='grid-item' data-featherlight-gallery data-featherlight-filter='a' />")
        .wrap('<a href="' + originalSizeURL + '" data-featherlight="'+ originalSizeURL +'" class="gallery"></a>');
        
      // if (i === 12) {
      //   return false;
      // }
    });
    
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