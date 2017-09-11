/*------------------------------*\

    #TOOLS

\*------------------------------*/

/**
 * Get window sizes
 * Store results in windowW and windowH vars
 */

// Get width and height
function calc_window() {
	calc_windowW();
	calc_windowH();
}
// Get width
function calc_windowW() {
	windowW = $(window).width();
}
// Get height
function calc_windowH() {
	windowH = $(window).height();
}


/**
 * Test window width
 * Use breakpoint vars set in config.js
 */

function test_layout() {
	calc_windowW();
	if ( windowW<=bpSmall ) {
	    return 'is-small';
	} else if ( windowW>bpSmall && windowW<=bpLarge ) {
		return 'is-medium';
	} else if ( windowW>bpLarge && windowW<=bpXlarge ) {
		return 'is-marge';
	} else if ( windowW>bpXlarge ) {
		return 'is-xlarge';
	}
} 


/* Disable a.js-disable-links */

function disable_links() {
	$('.js-disable-link').click(function(e){
		e.preventDefault();
	});
}


/* Remove img title on roll-over, store it in data and then fill it back on roll-out */

function disable_titles() {
	$('.js-disable-title').hover(
		function(){
			var cible = $(this);
			cible.data( 'title', cible.attr('title') ).attr('title','');
		},
		function() {
			var cible = $(this);
			cible.attr( 'title', cible.data('title') );
		}		
	);
}


/**
 * Monitor img loading progress
 * Using Images Loaded : http://imagesloaded.desandro.com
 */

function loading_img(container, loader) {
	container.addClass('is-loading');
	var nbImg = container.find('img').length-1;
	
	container.imagesLoaded().progress(onProgress).always(onAlways);

	function onProgress(imgLoad, image) {
		var percent = Math.round(stepLoad*(100/nbImg));
		//$('.loader__bar').css('width', percent+'%');
	}

	function onAlways() {
		container.removeClass('is-loading');
		//$('.loader').remove();
	}
}


/**
 * Add a notification display
 * Using : notify('message');	
 */	
var notify = function(message) {
	
	var $message;	
	
	if ( $('body').hasClass('single-projets') ) {
			$message = $('<div class="bullet-points bullet-points--white"><span></span></div><p class="notif-form" style="display:none;">' + message + '</p>');
	} else {
			$message = $('<p class="notif-form" style="display:none;">' + message + '</p>');
	}      

    $('.notification').append($message);
       $message.slideDown(300, function() {
      	if ( !$('body').hasClass('single-projets') && !$('body').hasClass('page-id-3224')) {
      		window.setTimeout(function() {
      		  $message.slideUp(300, function() {
      		    $message.remove();
      		  });
      		}, 10000);
      	}
    });
};	


/**
 * Share buttons
 */	

var popupCenter = function(url, title, width, height){
	var popupWidth = width || 640;
	var popupHeight = height || 320;
	var windowLeft = window.screenLeft || window.screenX;
	var windowTop = window.screenTop || window.screenY;
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	var windowHeight = window.innerHeight || document.documentElement.clientHeight;
	var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2 ;
	var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
	var popup = window.open(url, title, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', top=' + popupTop + ', left=' + popupLeft);
	popup.focus();
	return true;
};

$('.js-share').on('click', function(e){
	e.preventDefault();

	var network = $(this).attr('data-network');
	var url = $(this).attr('data-url');
	var shareUrl;

	if (network == 'facebook') {
		shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
		popupCenter(shareUrl, "Partager sur Facebook");
	} if (network == 'twitter') {
		var origin = "energiepartagee";
		shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) +
            "&via=" + origin + "" +
            "&url=" + encodeURIComponent(url);
		popupCenter(shareUrl, "Partager sur Twitter");
	}
});


