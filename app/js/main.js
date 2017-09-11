/*------------------------------*\

    #CONFIG

\*------------------------------*/

var siteURL = '';
var isHome = false;
var themeURL = "/wp-content/themes/energie-partagee-2";


// Activate resize events
var resizeEvent = true;
var resizeDebouncer = true;

// Store window sizes
var windowH; 
var windowW;
calc_window();
var lastWindowW = windowW;

// Breakpoint
var bpSmall = 600;
var bpMedium = 830;
var bpLarge = 1000;
var bpXlarge = 1200; 

// Ajax
var ppp = 12; // Post per page
var offsetPost = 12;
var offsetProject = 1;
var limiteProjectLoading = 0;

// Projects Map
var nbMakers = 0;
var nbShowMakers = 0;
var nbloadedCards = 6;
var gmarkers = [];
var activateFilters = false;
var filterCat = 'all_cat';
var filterStade = 'all_cat';

var map;
var prevCardMapId;
var previousMarker;
var previousNrj;
var isOpenMarker = false;

var stylesMapProjects = [
   {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#0500ff"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "45"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#007bff"
            },
            {
                "visibility": "on"
            },
            {
                "lightness": "-9"
            }
        ]
    }
];


var markerShadow;
var iconShadow = {
	url: themeURL+'/app/img/marker-shadow.png',
	size: new google.maps.Size(38, 38),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(34, 34)
};

var iconsSelectProjectsMap = {
	eolie: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#5ab1bb',
      	fillOpacity: 1, 
    },
	bioma: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#83ab00',
      	fillOpacity: 1, 
    },
	solai: { 
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#e9af00',
      	fillOpacity: 1, 
    },
	micro: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#5268b9',
      	fillOpacity: 1, 
    },
	geoth: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#e7511e',
      	fillOpacity: 1, 
    },
	econo: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#b7115b',
      	fillOpacity: 1, 
    }
};

var iconsProjectsMap = {
	eolie: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#5ab1bb',
      	fillOpacity: 1, 
    },
	bioma: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#83ab00',
      	fillOpacity: 1, 
    },
	solai: { 
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#e9af00',
      	fillOpacity: 1, 
    },
	micro: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#5268b9',
      	fillOpacity: 1, 
    },
	geoth: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#e7511e',
      	fillOpacity: 1, 
    },
	econo: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#b7115b',
      	fillOpacity: 1, 
    }
};


/*------------------------------*\

    #FUNCTIONS

\*------------------------------*/

// Jquery OuterWidth() always with margin & padding

var oldOuterWidth = $.fn.outerWidth;
$.fn.outerWidth = function () { 
	return oldOuterWidth.apply(this, [true]);
};




/*------------------------------*\

    #LOAD

\*------------------------------*/


$(window).load(function() {

});






/*------------------------------*\

    #READY

\*------------------------------*/

var FOO = {
    common: {
        init: function() {
            init_tabs();
			// Nav
			for (var i=0; i<nbNavItems; i++) {				
				pp_nav();
			}
            setTimeout(function(){
                $('.nav').removeClass('is-hidden');
            },1);

			// Mini slider project
			initLoadMoreProjectsBtn();

			// Video lightbox
			$('.lightvideo').lightGallery();

            // Wrap anim
            $('.no-touch .wrap-anim').waypoint(function(){
                $(this.element).toggleClass('ready-anim');
            }, {offset: '85%'});

            // wrap suggestion
            if ($('.suggestion').length) {
                $('.fluxi-wrap').addClass('has-suggestion');
            }
        }
    },
    home: {
        init: function() {
            isHome = true; 
            if ($('body').hasClass('touch')) {
                $('.key-nums__item__num').each(function(){
                    $(this).html($(this).attr('data-number'));
                });
            } else {
                $('.key-nums__item__num').each(function(){
                    var txt = $(this).next();
                    var val = $(this).attr('data-number');
                    var speed = (val>1000) ? 3000 : val*100;
                    $(this).jQuerySimpleCounter({
                      start:  0,
                      end:  val,
                      duration: speed
                    });
                });
            }
        }
    },
	page: {
        init: function() {
			$(".fitvids").fitVids();
			initLoadMorePostsBtn();
			if($('body.page-template-page-projets').length){	
				initProjectsMap();
                initLoadMoreProjectsCardsBtn();				
			}			
        }
    },
	category: {
        init: function() {			
			initLoadMorePostsBtn();
        }
    },
	single: {
        init: function() {
			$(".fitvids").fitVids();
			if($('body.single-projets').length){			
				initSingleMap();				
				initSendMailPorspect();			
			}
        }
    },	
	contact:{
		init: function() {
			initContactForm();

            // Add mailto in clikarde
            $('.clikarde__item').each(function( i ) {
                var dataMailto,
                    dataHref = $(this).find('.minicard').attr('href');

                if(dataHref.indexOf('@') > -1){
                    dataMailto = dataHref.substring(7);

                    $(this).find('.minicard').attr('href', 'mailto:'+dataMailto);
                }
            });
        }
	},
    search:{
        init: function() {
            $('.nav__search__input').focus();
			// Test to select active filter option in search filters
			if((window.location.href).split("&")[1] != void 0){
				var activeFilter = (window.location.href).split("&")[1];
				var filterVal = activeFilter.substring(4);				
				$('#search-filters #filter option[value='+filterVal+']').attr('selected','selected');
			}
			
			$('#search-filters').change(function() {
				var filterType;
                var filterVal = $('#search-filters #filter option:selected').val();
			  	
				if($.isNumeric(filterVal)){
					filterType = 'cat';
				}else{
					filterType = 'cpt';
				}
				var urlSeach = (window.location.href).split('&')[0] ;
               location.href = urlSeach+'&'+filterType+'='+filterVal;
            });
			
            calc_windowH();
            if (windowH<$('.footer').offset().top) {
                $('#search-filters').waypoint(function(){
                    $(this.element).toggleClass('is-fixed');
                });
                $('.footer').waypoint(function(){
                    $('#search-filters').toggleClass('is-fixed');
                }, {offset: '100%'});
            }
        }
    }
};

var UTIL = {
    fire: function(func, funcname, args) {
        var namespace = FOO;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
          namespace[func][funcname](args);
        }
    },
    loadEvents: function() {
        UTIL.fire('common');
        $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
          UTIL.fire(classnm);
        });
    }
};

$(document).ready(UTIL.loadEvents);





/*------------------------------*\

    #RESIZE

    Is activated by vars in config.js

\*------------------------------*/

/**
 * MAIN RESIZE EVENT
 *
 */

function resize_handler() {	 
	// calc_windowW();    
}
if ( resizeEvent ) { $( window ).bind( "resize", resize_handler() ); }

/**
 * DEBOUNCER
 * Fire event when stop resizing
 */

function debouncer( func , timeout ) {
    var timeoutID;
    var timeoutVAR;

    if (timeout) {
        timeoutVAR = timeout;
    } else {
        timeoutVAR = 200;
    }

    return function() {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        }, timeoutVAR );
    };

}

function debouncer_handler() {
    reloadCurrentPage();
}
if ( resizeDebouncer ) { $( window ).bind( "resize", debouncer(debouncer_handler) ); }





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



TweenMax.to(".js-widget", 0.4, { y: "0%", ease:Back.easeOut });
		
var coinAnim = new TimelineMax({delay: .5});
coinAnim.fromTo(".js-coin", .4, { scale:0, rotation: 0}, { scale:1, rotation: 720, ease:Quad.easeOut });
coinAnim.to(".js-coin", 0.6, { top: "100px", ease:Back.easeIn }, 0.4);
coinAnim.to(".js-widget-tirelire", 0.2, { scaleY: 1.1, transformOrigin:"50% 100%", ease:Back.easeIn }, "-=0.25");
coinAnim.to(".js-widget-tirelire", 0.2, { scaleY: 1, transformOrigin:"50% 100%", ease:Back.easeOut });

var messageAnim = new TimelineMax({delay: 2});
messageAnim.to(".js-widget-message", 0.4, { x: "0%",  ease:Back.easeOut });
messageAnim.to(".js-widget-message", 0.4, { x: "120%",  ease:Back.easeIn }, 3);

$('.js-widget').on('mouseenter', function () {
	if ( !coinAnim.isActive() && !messageAnim.isActive() ) {
		coinAnim.restart();
		messageAnim.restart();
	}
});

$('.fc').waypoint(function() {
	$('.js-widget').toggleClass('is-off');
}, {offset: '50%'});


$('.js-widget-close').on('click', function (e) {
	e.preventDefault();
	$('.c-widget, .js-widget-close').css('display','none');
	localStorage.delaistorage = Date.now();
	localStorage.clickcount = 1;
});

if( localStorage.clickcount ){
	var closeWidgetDelai = 0;
	var compareTimeout = 600001;
	if(localStorage.delaistorage){
		closeWidgetDelai = Math.round(localStorage.delaistorage);
		compareTimeout = Math.round(Date.now()) - closeWidgetDelai;
	}	
	
	if(compareTimeout < 600000){
		$('.c-widget, .js-widget-close').css('display','none');
	}
}
var timerOff;

$(".js-choose-connexion, .js-close-connect").on("click",function(e){
	e.preventDefault();
	clearTimeout(timerOff);
	$(".connexion div").addClass("is-active")
});

$(".js-close-connect").on("click", function(){

	$(".connexion div").removeClass("is-active");
	$(".connexion div span").addClass("is-off");

	timerOff = setTimeout(function(){
		$(".connexion div span").removeClass("is-off");
	}, 300)
});

$(".top-display").waypoint(function(){
	$(".navbar, .navbar__id").toggleClass("is-compact")
}, { offset: "-1px" } );
$.fn.jQuerySimpleCounter = function( options ) {
    var settings = $.extend({
        start:  0,
        end:    100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options );

    var thisElement = $(this);

    $({count: settings.start}).animate({count: settings.end}, {
		duration: settings.duration,
		easing: settings.easing,
		step: function() {
			var mathCount = Math.ceil(this.count);
			thisElement.text(mathCount);
		},
		complete: settings.complete
	});
};
$('.following .cta').click(function(e){
	$('.wrap-bg.c-main').toggleClass('is-active');	
});
/*
 * Init single project Map
 * - Add a dom container "map"
 * - mapOptions = { zoom: 7, scrollwheel: false, panControl: true}
 */
function initSingleMap(){
	//console.log('Init Google Map Obj for "Single project"');
	
	var mapContainer = document.getElementById("map");
	//mapContainer.className += 'loader';
	
	var latitude = Number($('#map').data('lat'));
	var longitude = Number($('#map').data('lon'));
	
	var latlng = new google.maps.LatLng(latitude,longitude);
	var newLatLng = {lat: latitude, lng: longitude};
	
	var categoryNRJ = $('#map').data('cat');
	// Cut string to escape "-"
	categoryNRJ = categoryNRJ.substring(0, 5);	
	
	var title = $('#map').data('title');
	
	var mapOptions = {
        zoom: 7,
        scrollwheel: false,
        panControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControl: false,
        streetViewControl: false,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP 
    };
	
	var map = new google.maps.Map(mapContainer,mapOptions);	
	map.setOptions({styles: stylesMapProjects});
	
	var marker = new google.maps.Marker({
		position: newLatLng,
		clickable: true,
		map: map,
		title: title,
		icon: iconsSelectProjectsMap[categoryNRJ]
	});	

	markerShadow = new MarkerShadow(marker.getPosition(), iconShadow, map);

	// do something only the first time the map is loaded
	google.maps.event.addListenerOnce(map, 'idle', function(){
		setTimeout(function() {        
			$('.spinner.bg-spin').remove();		        	
		}, 300);				
	});				
}



/*
 * Init Projects Map
 * - Add a dom container
 * - latlng = new google.maps.LatLng(47.50,2.20);
 * - activateFilters : default = false
 * - mapOptions = { zoom: 6, scrollwheel: false, panControl: true}
 */
function initProjectsMap(){
	
	//console.log('Init Google Map Obj for "Projects Map"');
	
	var mapContainer = document.getElementById("map");	

	var latlng = new google.maps.LatLng(47.50,2.20);
	
	activateFilters = true;	
	
	var mapOptions = {
        zoom: 6,
        scrollwheel: false,
        panControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeControl: false,
        streetViewControl: false,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROAD        
    };
	// Load the map only on desktop
	if(windowW >= bpSmall){
		loadGoogleMap(mapContainer, mapOptions);
	}else{
		loadMarkers(map)
	}	
}
/* Init the google map
 *  mapContainer = DOM element | mapOptions = option array
 */
function loadGoogleMap(mapContainer, mapOptions){	
	
	//console.log('Load Google Map Obj');
		
	map = new google.maps.Map(mapContainer,mapOptions);	
	map.setOptions({styles: stylesMapProjects});

	//mapContainer.className += 'loader';
	
	loadMarkers(map);
}

/* Load markers by JSON ajax custom request
 * map = Google map object
 * filterCat : default = 'all_cat' / String : cat_slug
 */
function loadMarkers(map){
	
	//console.log('loadMarkers '+filterCat);	
		
	// Params : suppress_filters | post_type | posts_per_page | post_status
	if(windowW >= bpSmall){
		// Load all markers
		var str = 'action=get_json_map&category='+filterCat;
	}else{
		// Mobil version
		var str = 'action=get_json_map&category='+filterCat+'&posts_per_page=6';
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        success: function(data){				
			addMakers(map, data);			
			//$('#map').removeClass('loader');			
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false; 
	
}

function addMakers(map, data){
	
	//console.log('Add Makers ');
	
	nbMakers = Object.keys(data).length;	
	
	$.each(data, function(i){		
		
		// If it's a project
		if(data[i].postType == 'projets'){	
			// Slug NRJ
			var categoryNRJ = data[i].catSlug;
			// Cut string to escape "-"
			categoryNRJ =  categoryNRJ.substring(0, 5);

			//  Add markers on the map only on desktop
			if(windowW >= bpSmall){	
				var newLatLng = {lat: Number(data[i].latitude), lng: Number(data[i].longitude)};
										
				var marker = new google.maps.Marker({
					position: newLatLng,
					map: map,
					title: data[i].title,
					icon: iconsProjectsMap[categoryNRJ],
					category : data[i].catSlug,
					stade : data[i].stadeSlug
				});				
					
				marker.addListener('click', function() {
					onClickMarker(i,map,marker,categoryNRJ);					
				});
				
				gmarkers.push(marker);			
				
				//console.log(marker);
				
				// Active filters
				if(i==nbMakers-1 && activateFilters){
					// Init all filters once if activateFilters = true
					initFilters(map);
					activateFilters=false;
					centerMapOnMarkers(map);
				}
			}
			// Add info card
			var markerContent = '<article class="card-map c-'+categoryNRJ+' anim-out-left">'; 
				markerContent += '<header class="card card-project">';
					markerContent += '<a href="'+data[i].permalink+'">';
	            		markerContent += '<div class="card__img" style="background-image:url('+data[i].image+')"><i class="card__icon"></i><div class="spinner"></div><span class="tag is-inactive">'+data[i].stadeName+'</span></div>';
	            		markerContent += '<div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div>';
	            	markerContent += '</a>';
	            markerContent += '</header>';

	            markerContent += '<div class="p-details">';
		            markerContent += '<div class="p-details__nrg"><i class="icon-'+data[i].catSlug+'_100"></i></div>';

		        	markerContent += '<ul class="p-details__infos">';
		        		markerContent += '<li class="p-details__infos__loca"><strong>'+data[i].city+'</strong><span>'+data[i].region+'</span></li>';
		          		markerContent += '<li class="p-details__infos__prod"><strong>'+data[i].equiPui+' '+data[i].typeUnit+'</strong><span>'+data[i].prod+' '+data[i].prodUnit+'</span></li>';
		        	markerContent += '</ul>';

		        	markerContent += '<p class="p-details__equi p-ss">Produit la consommation annuelle de '+data[i].equiPro+' foyers.</p>';
	    		markerContent += '</div>';

				markerContent += '<a class="link-cta" href="'+data[i].permalink+'"><i class="icon-chevronright_32"></i><span>Voir ce projet</span></a>';

			markerContent += '</article>';

			$('.cards-map').append(markerContent);

			// remove the loader
			if(i==nbMakers-1 && windowW >= bpSmall){
				$('.js-more-procards').parent().remove();
				setTimeout(function() {        
		        	$('.spinner.bg-spin').remove();		        	
		        }, 300);				
			}else if(i==1 && windowW <= bpSmall){
				$('.spinner.bg-spin').remove();
				$('.js-more-procards').parent().removeClass('anim-out');	
			}			
			
		}
		
		// End each
   });	
		
}


// Event on click  on a marker
function onClickMarker(index,map,marker,categoryNRJ){
	
	// Add a shadow
	if (markerShadow && markerShadow.setPosition) {
        markerShadow.setPosition(marker.getPosition());
        markerShadow.show();
    } else {
    	markerShadow = new MarkerShadow(marker.getPosition(), iconShadow, map);
    	markerShadow.show();
    }
    // Modify previous marker
    if(isOpenMarker){
    	previousMarker.setIcon(iconsProjectsMap[previousNrj]);
    	previousMarker.setZIndex(1);
	}
    // Change the icon
    marker.setIcon(iconsSelectProjectsMap[categoryNRJ]);
	previousMarker = marker;
	previousNrj = categoryNRJ;
	
	marker.setZIndex(10000);

    // Get the card
    if(index != prevCardMapId){
	    if(isOpenMarker){
	    	$('.cards-map .card-map:eq('+prevCardMapId+')').toggleClass('anim-out-left');
	    	setTimeout(function() {
	        	$('.cards-map .card-map:eq('+index+')').toggleClass('anim-out-left');
	        	setTimeout(function() {
	        		$('.cards-map .card-map:eq('+index+') .spinner').css('opacity',0);
	        	}, 100);
	        }, 220);
	    	
		}else{
			$('.cards-map .card-map:eq('+index+')').toggleClass('anim-out-left');
			setTimeout(function() {
	        	$('.cards-map .card-map:eq('+index+') .spinner').css('opacity',0);
	        	$('.cards-map .card-map:eq('+index+')').removeClass('unactive');
	        }, 100);
		}
	}
    prevCardMapId = index;
	isOpenMarker = true;
	
}

function initFilters(map){	

	//console.log('Init filters');
	
	$('.first.map-filters button').click(function(e){
		resetMarkers();
		var $this = $(this);
		filterCat = $this.data('filter');
		
		if(!$this.hasClass('js-f-active')){
			
			$('.first.map-filters .js-f-active').toggleClass('js-f-active');
			$this.addClass('js-f-active');	
			
			for (i = 0; i < gmarkers.length; i++) {						
				// If is same category or category not picked
				if (gmarkers[i].category == filterCat || filterCat.length === 0){ 
					if(gmarkers[i].stade == filterStade || filterStade == 'all_cat'){
						gmarkers[i].setVisible(true);					
					}
				}
				// Categories don't match 
				else{ 
					gmarkers[i].setVisible(false);
				}
			}		
		
		}else{
			$this.toggleClass('js-f-active');
			resetNrjFilter();	
		}
		
		centerMapOnMarkers(map);		
	});	
	
	$('.second.map-filters button').click(function(e){		
		resetMarkers();
		var $this = $(this);					
		filterStade = $this.data('filter');
		
		if(!$this.hasClass('js-f-active')){
			
			$('.second.map-filters .js-f-active').toggleClass('js-f-active');
			$this.addClass('js-f-active');
			
			for (i = 0; i < gmarkers.length; i++) {			
				if (gmarkers[i].stade == filterStade || filterStade.length === 0) {
					if(gmarkers[i].category == filterCat || filterCat == 'all_cat'){
						gmarkers[i].setVisible(true);									
					}
				}else {
					gmarkers[i].setVisible(false);
				}				
			}
		}else{
			$this.toggleClass('js-f-active');
			resetStadeFilter();	
		}		
		centerMapOnMarkers(map);
	});
	
}

function resetNrjFilter(){
	for (i = 0; i < gmarkers.length; i++) {
		if (gmarkers[i].category != filterCat ) {			
			if(gmarkers[i].stade == filterStade || filterStade == 'all_cat'){
				gmarkers[i].setVisible(true);
			}			
		}			
		if(i == gmarkers.length-1){
			filterCat = 'all_cat';
		}	
	}		
}
function resetStadeFilter(){
	for (i = 0; i < gmarkers.length; i++) {
		if (gmarkers[i].stade != filterStade) {		
			if(gmarkers[i].category == filterCat || filterCat == 'all_cat'){
				gmarkers[i].setVisible(true);
			}
		}	
		if(i == gmarkers.length-1){
			filterStade = 'all_cat';
		}	
	}	
}

function resetMarkers() {	
	if(isOpenMarker){
		// reset icon
    	previousMarker.setIcon(iconsProjectsMap[previousNrj]);
    	markerShadow.hide();
    	isOpenMarker = false;
    	// reset card
    	$('.cards-map .card-map:eq('+prevCardMapId+')').toggleClass('anim-out-left');
    	prevCardMapId = null;    	
	}  
}


function centerMapOnMarkers(map){
	nbShowMakers = nbMakers;		
	var LatLngList = new Array ();
	var bounds = new google.maps.LatLngBounds ();
	// Bind all marker's positions
	for (i = 0; i < gmarkers.length; i++) {
		if(gmarkers[i].visible)
		LatLngList.push(gmarkers[i].getPosition());
		else
		nbShowMakers--;			
	}	
	//  And increase the bounds to take this point
	for (var j = 0, LtLgLen = LatLngList.length; j < LtLgLen; j++) {	  
		bounds.extend (LatLngList[j]);
	}
	
	if(nbShowMakers >= 3){		
		map.fitBounds (bounds);		
	}else if(nbShowMakers == 2){		
		map.setZoom(6); 
		map.setCenter(bounds.getCenter());
	}else if(nbShowMakers == 1){		
		map.setZoom(7);
		map.setCenter(bounds.getCenter());
	}
}

function removeMarkers() {	
	//console.log('Remove All Markers');	
	 for(i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }   
}

/*
 * Reload map page on resize
 *
 */
function reloadCurrentPage(){
	if(lastWindowW <= bpSmall && windowW >= bpSmall && $('.map-projects').length == 1){	
	    location.reload(true);
	    lastWindowW = windowW; 
	}
}


/*
 * Marker shadow prototype
 * 
 */
MarkerShadow.prototype = new google.maps.OverlayView();
MarkerShadow.prototype.setPosition = function(latlng) {
    this.posn_ = latlng;
    this.draw();
  }
  /** @constructor */

function MarkerShadow(position, options, map) {

    // Initialize all properties.
    this.posn_ = position;
    this.map_ = map;
    if (typeof(options) == "string") {
      this.image = options;
    } else {
      this.options_ = options;
      if (!!options.size) this.size_ = options.size;
      if (!!options.url) this.image_ = options.url;
    }

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }
  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
MarkerShadow.prototype.onAdd = function() {
  // if no url, return, nothing to do.
  if (!this.image_) return;
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = this.options_.size.x + 'px';
  img.style.height = this.options_.size.y + 'px';
  img.style.position = 'absolute';

  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayShadow.appendChild(div);
};

MarkerShadow.prototype.draw = function() {
  // if no url, return, nothing to do.
  if (!this.image_) return;
  // We use the coordinates of the overlay to peg it to the correct position 
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  var posn = overlayProjection.fromLatLngToDivPixel(this.posn_);

  // Resize the image's div to fit the indicated dimensions.
  if (!this.div_) return;
  var div = this.div_;
  if (!!this.options_.anchor) {
    div.style.left = Math.floor(posn.x - this.options_.anchor.x) + 'px';
    div.style.top = Math.floor(posn.y - this.options_.anchor.y) + 'px';
  }
  if (!!this.options_.size) {
    div.style.width = this.size_.x + 'px';
    div.style.height = this.size_.y + 'px';
  }
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
MarkerShadow.prototype.onRemove = function() {
  if (!this.div_) return;
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

// Set the visibility to 'hidden' or 'visible'.
MarkerShadow.prototype.hide = function() {
  if (this.div_) {
    // The visibility property must be a string enclosed in quotes.
    this.div_.style.visibility = 'hidden';
  }
};

MarkerShadow.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = 'visible';
  }
};
/*
MarkerShadow.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.visibility === 'hidden') {
      this.show();
    } else {
      this.hide();
    }
  }
};*/



/*										 
\\   FLUXI CONTENT
*/				

// -- Galeries
	if($('.galerie_damier').length){
		$('.galerie_damier').lightGallery({
			thumbnail:false
			, thumbMargin:0
			, thumbContHeight:90
			/*, animateThumb: false
    		, showThumbByDefault: false*/
		}); 
	}
	if($('ul.galerie_vignettes').length){
		$('ul.galerie_vignettes').lightSlider({
			gallery:true,
			item:1,
			loop:false,
			thumbItem:9,
			slideMargin:0,
			enableDrag: false,
			adaptiveHeight:true,
			currentPagerPosition:'middle',			      
			onSliderLoad: function(el) {
				el.lightGallery({
					selector: '.galerie_vignettes .lslide'
				});
			}   
		}); 
	}
	if($('ul.galerie_slider').length){
		$('ul.galerie_slider').lightSlider({
			gallery:false,
			pager:true,
			loop:false,
			item:1,
			adaptiveHeight:true,        	
        	slideMargin:0,
        	loop:true
		}); 
	}
	// -- Accordéons
	if($('.accordion').length){
		$('.accordion .accordion__head').click( function(e) { 		 	
			$(this).parent().toggleClass('open').find('.accordion__content').slideToggle();		
		});
	}
	if($('.lightbox').length){
		// -- Lightbox Img
		$('.lightbox').lightGallery({
			selector: 'this'
		});
	}
	// Mozaic Isotope
	// regarder :: http://isotope.metafizzy.co/filtering.html
	  if($('.main-isogrid').length){
		  
		  $('.main-isogrid').each(function( i ) {	
			  //var $container = $(this);
			  var $container = $('.main-isogrid');				  
			  /*var random_id = $container.attr('class').split('_');
			  random_id = random_id[1];*/			
			  var $the_iso_grid = $container.isotope({
				itemSelector: '.item',
				layoutMode: 'masonry',			
				transitionDuration: '0.5s',		
				hiddenStyle: {
				  opacity: 0
				},
				visibleStyle: {
				  opacity: 1
				}
			  });
			  
			  $('.button-group-sort').on( 'click', 'button', function() {	
			  	var filterValue = $( this ).attr('data-filter');    
				$the_iso_grid.isotope({ filter: filterValue });
				
			  });				
			
		  });
		  
		  // file type icon
			$(".main-isogrid a[href$='.pdf'] .icon-doc").addClass('js-icon-pdf');
			$(".main-isogrid a[href$='.zip'] .icon-doc, .docs a[href$='.rar'] .icon-doc").addClass('js-icon-zip');
			$(".main-isogrid a[href$='.odt'] .icon-doc").addClass('js-icon-odt');
			$(".main-isogrid a[href$='.doc'] .icon-doc, .docs a[href$='.docx'] .icon-doc").addClass('js-icon-word');  
			$(".main-isogrid a[href$='.xls'] .icon-doc, .docs a[href$='.xlsx'] .icon-doc, .main-isogrid a[href$='.xlt'] .icon-doc, .main-isogrid a[href$='.xltx'] .icon-doc").addClass('js-icon-exel');  
	  }
function initContactForm(){	
	$("#contact_ep").validate({
			rules: {
				email:{	email: true	},				
				prenom: { required: true },
				nom: { required: true },
				sujet: { required: true },
				message: { required: true },
				
			},
			messages: {			
				sujet: { required: "Veuillez sélectionner une réponse" },
				
			},
			submitHandler: function() {				
				sendMail();			
			}
		});	
	
	function sendMail(){
		if($('#submit.is-sending').length == 0){	
			$.ajax({
					url: themeURL+'/app/inc/inc_projet/send_contact.php',
					type: 'POST',
					data: $('form#contact_ep').serialize(),
					dataType: 'json',
					beforeSend : function() {					
						$('#submit').addClass('is-sending').html('<i class="spinner"></i>');
						
					},
					success: function(json) {						
						if(json.resultForm == 'yes') {   
						    $('#submit').remove();                 	
							notify('<span class="valid-submit-form">Votre message à bien été envoyé. Merci</span>');						
						} else {
							$('#submit').removeClass('is-sending').html('Envoyer');						
							notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre message. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');	
						}						
					},
                  error: function(){
						$('#submit').removeClass('is-sending');
                        notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre message. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');
                  }          
			});
		}
	}
	
}
//*********************************************
    //   Soumettre un projet
    //*********************************************
	var typeEnergie, stadeProjet;
	
	if($('#soumettre_projet').length > 0){	

		// Datepicker
		var TODAY = new Date(2013,3,20,10,30);
		$('#mise_en_service').pickadate({
			monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			today: 'aujourd\'hui',
			clear: 'effacer',
			formatSubmit: 'dd/mm/yy',
			close: 'Fermer'
		});
		
		// validation Js du form
		var messageRadio = "Veuillez sélectionner une réponse";
		
		$("#soumettre_projet").validate({
			rules: {
				email_contact:{	required: true,	email: true	},
				connu_comment: { required: true	},
				collectif: { required: true	},
				stade_projet: {	required: true },
				entite_porteuse: { required: true },
				projet_formalise: { required: true },
				actions_sensibilisation: { required: true }, 
				dispositions_securisant: { required: true },
				montant_financement: { required: true },
				projet_visible: { required: true },
				code_postal: { required: true, number: true },
				code_postal_contact: { number: true },
				tel_1_contact : { required: true, digits: true },
				tel_2_contact : { digits: true },
				puissance_prevue : { required: true, number: true },
				unites_production : { required: true, number: true },
				objectif_production : { number: true },
				montant_investissement : { required: true, number: true },
				montant_financement : { number: true, range: [50000, 500000] },
				fonds_disponibles : { number: true },
				part_endettement : { number: true, max: 100 },
				site_web_projet : { url: true }
			},
			messages: {				
				connu_comment: { required: messageRadio },
				collectif: { required: messageRadio },
				stade_projet: { required: messageRadio },
				entite_porteuse: { required: messageRadio },
				projet_formalise: { required: messageRadio },
				actions_sensibilisation: { required: messageRadio },
				dispositions_securisant: { required: messageRadio },
				montant_financement: { required: messageRadio },
				projet_visible: { required: messageRadio }
			},
			submitHandler: function() {				
				sendForm();			
			}
		});	
		
		function sendForm(){
			if($('#submit.is-sending').length == 0){	
			$.ajax({
					url: themeURL+'/app/inc/inc_projet/soumettre_projet.php',
					type: 'POST',
					data: $('form#soumettre_projet').serialize(),
					dataType: 'json',
					beforeSend : function() {
						$('.btns-form #submit').addClass('is-sending').html('<i class="spinner"></i>');						
					},
					success: function(json) {		
						if(json.resultForm == 'yes') {  
							$('.btns-form #submit').remove();							                  	
							notify('<span class="valid-submit-form">Merci, votre projet vient a été correctement ajouté. Nous vous contacterons prochainement avant de le faire apparaitre sur notre site internet.</span>');						
						} else {
							$('.btns-form #submit').removeClass('is-sending').html('Envoyer'); 														
							notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre formulaire. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');	
						}						
					},
                    error: function(){
						$('#submit').removeClass('is-sending').html('Envoyer');
                        notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre formulaire. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');
                    }          
				});
			}
		}
	
		// affichage conditionnel
		typeEnergie = $('#source_energie').val();
		
		stadeProjet = $('input[name=stade_projet]').index($('input[name=stade_projet]:checked')) + 1;		
		
		hideShowForm();	
				
		$('#source_energie').change(function(){		
			typeEnergie = $(this).val();			
			if(typeEnergie == 14){
				$('#source_energie_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#source_energie_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}			
			hideShowForm();	
		});
		
		$('input[name=stade_projet]').change(function(){		
			stadeProjet = $('input[name=stade_projet]').index(this);			
			stadeProjet = stadeProjet + 1;				
			hideShowForm();	
			//refreshWaypoints();	
		});	
		
		// champs obtionnels/conditionnels (si autres, si oui, etc...)		
		
		$('input[name=connu_comment]').change(function(){			
			if($('input[name=connu_comment]:checked').val() == "Autres"){
				$('#connu_autre').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#connu_autre').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});
		
		$('input[name=collectif]').change(function(){			
			if($('input[name=collectif]:checked').val() == "Autres"){
				$('#autre_collectif').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#autre_collectif').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});		
		
		$('input[name=entite_porteuse]').change(function(){			
			if($('input[name=entite_porteuse]:checked').val() == "oui"){
				$('#nom_entite_porteuse').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#nom_entite_porteuse').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});	
		
		/*$('input[name=projet_formalise]').change(function(){			
			if($('input[name=projet_formalise]:checked').val() == "Oui"){
				$('#fichier_projet_formalise').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#fichier_projet_formalise').addClass('sub-hide-item').attr('disabled', true);
				$('#fichier_projet_formalise').replaceWith( $('#fichier_projet_formalise').val('').clone( true ) );
			}
		});	*/
		
		$('input[name=actions_sensibilisation]').change(function(){			
			if($('input[name=actions_sensibilisation]:checked').val() == "oui"){
				$('#actions_sensibilisation_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#actions_sensibilisation_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});	
		
		$('input[name=dispositions_securisant]').change(function(){			
			if($('input[name=dispositions_securisant]:checked').val() == "oui"){
				$('#dispositions_securisant_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#dispositions_securisant_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});
		
		$('input[name=demande_financement]').change(function(){			
			if($('input[name=demande_financement]:checked').val() == "oui"){
				$('#montant_financement').removeClass('sub-hide-item').attr('disabled', false);
				$('#montant_financement_label').removeClass('sub-hide-item');
			}
			else{
				$('#montant_financement').addClass('sub-hide-item').attr('disabled', true).val('');
				$('#montant_financement_label').addClass('sub-hide-item');
			}
		});
		
		
	}
	
	function hideShowForm(){
		
		if(stadeProjet != "" && stadeProjet != 0){			
			
			if(stadeProjet == 2 ||  stadeProjet == 3){
					
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3, .item-2-6').removeClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 1){
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3').removeClass('hide-item');
				$('.item-2-6').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 4){
				
				$('.item-1-6, .item-1-5, .item-1-4, .item-2-6').removeClass('hide-item');		
				$('.item-1-3').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 5){
				
				$('.item-1-6, .item-1-5, .item-2-6').removeClass('hide-item');	
				$('.item-1-4, .item-1-3').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 6){
							
				$('.item-1-6, .item-2-6').removeClass('hide-item');					
				$('.item-1-5, .item-1-4, .item-1-3').addClass('hide-item');
				
				disableCleaner();
				
			}
			
			else{
				
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3, .item-2-6').addClass('hide-item');			
			}
			
			
		}	
			
		// type energie 
		if(typeEnergie != 12){
			$('.type-eco-energ').addClass('sub-hide-item');
			$('.type-non-eco-energ').removeClass('sub-hide-item');
			
			$('#puissance_prevue, #unites_production, #objectif_production').removeClass('hide-item').attr('disabled', false);			
			$('#objectif_economie').addClass('hide-item').attr('disabled', true).val('');
		}
		else{
			$('.type-eco-energ').removeClass('sub-hide-item');
			$('.type-non-eco-energ').addClass('sub-hide-item');
			
			$('#puissance_prevue, #unites_production, #objectif_production').addClass('hide-item').attr('disabled', true).val('');			
			$('#objectif_economie').removeClass('hide-item').attr('disabled', false);	
		}
		
		if(typeEnergie == 14){
			$('#source_energie_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#source_energie_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		
		// champs autres etc...
		// connu comment
		if($('input[name=connu_comment]:checked').val() != "Autres"){
			$('#connu_autre').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		else{
			$('#connu_autre').removeClass('sub-hide-item').attr('disabled', false);				
		}
		// collectif
		if($('input[name=collectif]:checked').val() != "Autres"){
			$('#autre_collectif').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		else{
			$('#autre_collectif').removeClass('sub-hide-item').attr('disabled', false);				
		}
		// entite_porteuse
		if($('input[name=entite_porteuse]:checked').val() == "Autres"){
			$('#nom_entite_porteuse').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#nom_entite_porteuse').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		
		// envoie de fichier formalisé
		/*if($('input[name=projet_formalise]:checked').val() == "Oui"){
			$('#fichier-projet_formalise').removeClass('sub-hide-item');
		}
		else{
			$('#fichier_projet_formalise').addClass('sub-hide-item');
			$('#fichier_projet_formalise').replaceWith( $('#fichier_projet_formalise').val('').clone( true ) );
		}*/
		// actions_sensibilisation
		if($('input[name=actions_sensibilisation]:checked').val() == "oui"){
			$('#actions_sensibilisation_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#actions_sensibilisation_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		// dispositions_securisant
		if($('input[name=dispositions_securisant]:checked').val() == "oui"){
			$('#dispositions_securisant_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#dispositions_securisant_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		// demande_financement
		if($('input[name=demande_financement]:checked').val() == "oui"){
			$('#montant_financement').removeClass('sub-hide-item').attr('disabled', false);
			$('#montant_financement_label').removeClass('sub-hide-item');
		}
		else{
			$('#montant_financement').addClass('sub-hide-item').attr('disabled', true).val('');
			$('#montant_financement_label').addClass('sub-hide-item');
		}
	}	
	
	function disableCleaner(){		
		// initialise les champs pour la validation (en fonction de l'état d'avancement du projet)				
		$('input:text.hide-item, textarea.hide-item').each(function( index ) {						
			$(this).attr('disabled', true);
			$(this).val('');			
		});
		
		$('input:radio.hide-item').each(function( index ) {			
			$(this).attr('disabled', true);
			$(this).prop('checked', false );			
		});
		
		$('select.hide-item').each(function( index ) {			
			$(this).attr('disabled', true);
			//$(this).val('');			
		});
		
		$('input:text, textarea, input:radio, select').not('.hide-item').each(function( index ) {		
			$(this).attr('disabled', false);
		});
		
	}
/* 
 * Add prospect and send information mail 
 * Return HTML
 */
function initSendMailPorspect (){
	
	$('#mailing_prospect button').attr('disabled',false);
			
	$('body').on('submit', 'form#mailing_prospect', function(e){  
			  
		e.preventDefault();	

		$('#mailing_prospect .button-round i').attr('class','spinner');

		 $.ajax({
			type: 'POST',
			dataType: 'JSON',
			url: ajax_object.ajax_url,
			data: $(this).serialize()+'&action=send_mail_prospect',
			success: function(data){
				$('#mailing_prospect .button-round i').attr('class','icon-check_64');
				$('#mailing_prospect button').attr('disabled',true);							
				if(data[0].validation == 'error'){					
					$('#mailing_prospect button').attr('disabled',false);
				}					
				$('.notify').html('<span class="'+data[0].validation+'">'+data[0].message+'</span>');							
				
			},
			error : function(jqXHR, textStatus, errorThrown) {								
				//console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
			}
	
		});
		return false; 
		
			  
	});
		
}

/*
 * Load more projects on trio-projects
 * Return JSON
 */
function initLoadMoreProjectsBtn (){
	$('.js-more-project').attr('disabled',false);
	$('.js-more-project').on( 'click', function ( e ) {
		e.preventDefault();
		$('.js-more-project').attr('disabled',true).html('<i class="spinner green"></i>');;
		loadMoreProjects();
	});
}

function loadMoreProjects(){

    offsetProject = offsetProject + 2;
	limiteProjectLoading++;

    var str = 'offset='+offsetProject+'&action=more_project_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        success: function(data){
            var sourceUrl;
            $.each(data, function(i){
                var $firstItem = $('.trio-card .box .box__half:eq(0)');
                var $secondItem = $('.trio-card .box .box__half:eq(1)');
                var content ='<a class="card card-project anim-out" href="'+data[i].permalink+'"><div class="card__img"><img class="img-reponsive" src="'+data[i].image+'"><i class="card__icon icon-uniE60F"></i></div><div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div></a>';
                sourceUrl = data[i].sourceUrl;

                if(i > 0){
                    $secondItem.find('.card-project').addClass('anim-out');
                    setTimeout(function() {
                        $secondItem.find('.card-project').remove();
                        $secondItem.append(content);
                        setTimeout(function() {
                            $secondItem.find('.card-project').removeClass('anim-out');
                        }, 50);
                    }, 220);

                }else{
                    $firstItem.find('.card-project').addClass('anim-out');
                    setTimeout(function() {
                        $firstItem.find('.card-project').remove();
                        $firstItem.append(content);
                        setTimeout(function() {
                            $firstItem.find('.card-project').removeClass('anim-out');
                        }, 50);
                    }, 220);
                }

            });

            if(limiteProjectLoading < 2){
                $('.js-more-project').attr('disabled',false).html('<i class="icon-chevronright_64"></i>');
            }else{
                $('.js-more-project').remove();
                $('.trio-card .box__fixe').append('<a href="'+sourceUrl+'" class="button-round grey"><i class="icon-plus_64"></i></a>');
            }

        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('.js-more-project').attr('disabled',false).html('<i class="icon-chevronright_64"></i>');
            //console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false;


}
/*
 * Load more projects on mobil page projects
 * Return JSON
 */
function initLoadMoreProjectsCardsBtn (){
    $('.js-more-procards').attr('disabled',false);
    $('.js-more-procards').on( 'click', function ( e ) {
        e.preventDefault();
        $('.js-more-procards').attr('disabled',true).html('<i class="spinner"></i>');
        loadMoreProjectsCards();
    });
}
function loadMoreProjectsCards(){

    offsetProject = offsetProject + 6;

    var nbTotalCards = $('.map-projects').data('nbcards');

    var str = 'offset='+offsetProject+'&posts_per_page=6&action=more_project_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,        
        success: function(data){

            $.each(data, function(i){

                nbloadedCards++;

                var categoryNRJ = (data[i].catSlug).substring(0, 5);

                var cardContent = '<article class="card-map c-'+categoryNRJ+' anim-out">';
                        cardContent += '<header class="card card-project">';
                            cardContent += '<a href="'+data[i].permalink+'">';
                                cardContent += '<div class="card__img" style="background-image:url('+data[i].image+')"><i class="card__icon"></i><span class="tag is-inactive">'+data[i].stadeName+'</span></div>';
                                cardContent += '<div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div>';
                            cardContent += '</a>';
                        cardContent += '</header>';
                    cardContent += '</article>';

                addCardContent('cardmap', cardContent, nbloadedCards-1, i);

                if(nbloadedCards < nbTotalCards-1){
                    $('.js-more-procards').attr('disabled',false).html('Charger plus');                    
                } else{
                    $('.js-more-procards').parent().hide(300);                   
                }
            });

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false;

}

/*
 * Load more news/event
 * Return HTML
 */
function initLoadMorePostsBtn (){
    $('.js-more').attr('disabled',false);

	$('.js-more').on( 'click', function ( e ) {
		e.preventDefault();
		$('.js-more').attr('disabled',true);

		var category = $(this).data('cat');

		loadPosts(category);
	});
}
/*
 * Load 
 * @param : category (number)
 */
function loadPosts(category){    

    var totalposts = $('.fluxi-content').data('totalposts');   

    var str = '&cat=' + category + '&offset=' + offsetPost + '&ppp=' + ppp + '&action=more_post_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        beforeSend : function() {
            $('.js-more').html('<i class="spinner"></i>');            
        },
        success: function(data){

            var $data = $(data);
            
            if($data.length != 0){
                $('.js-more').attr('disabled',false);
                $('.js-more').html('Charger plus');

                $.each(data, function(i){                     
                    
                    var $output = '<a class="card-news anim-out" href="'+data[i].permalink+'">';
                        $output += '<div class="card__img"><img class="img-responsive" src="'+data[i].img+'" alt="'+data[i].title+'"></div>';
                        $output += '<div class="card__infos">';
                            $output += '<span class="tag is-inactive">'+data[i].date+'</span>';
                            $output += '<h1 class="card__title">'+data[i].title+'</h1>';
                        $output += '</div>';
                    $output += '</a>';    

                    addCardContent ('posts', $output, offsetPost, i);
                    offsetPost ++;

                    if(offsetPost >= totalposts){
                        $('.js-more').attr('disabled',true).remove();                       
                    }
                    
                });
            } else{
                $('.js-more').attr('disabled',true).remove();                                         
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    

    return false;
}

/*
 * Add and animate content of ajax loaded object
 * @param : type (string) => string for modifier process
 * @param : content (jquery | html) => html or jquery element
 * @param : domId (number) => element index in the page
 * @param : factor (number) => index to factor the animation delay
 */
function addCardContent (type, content, domId, factor){
    if(type == 'cardmap'){
        $('.cards-map').append(content);
        setTimeout(function() {
            $('.cards-map').find('.card-map:eq('+domId+')').removeClass('anim-out');
        }, 200*factor);
    }else{
        $('.js-inject-news').append(content);
        setTimeout(function() {
            $('.card-news:eq('+(domId-2)+')').removeClass('anim-out');
        }, 200*factor);
    }

}





	// VARS
	
	var ppItemsW = new Array();
	
	var logoW = $('.navbar__id').outerWidth();
	var buttonsW = $('.navbar__buttons').outerWidth();
	var nbNavItems = $('.nav__item').length;
	var activeItems = nbNavItems;
	var nbNavItemsNav1 = $('.nav__primary .nav__item').length;
	var nbNavItemsNav2 = $('.nav__secondary .nav__item').length;


	// RESIZE

	$(window).on('resize', function() {
	  pp_nav();
	});

	// HIGHLIGHT CURRENT PARENT PAGE

		$('.current_page_item').parent().parent().prev().addClass('is-active');

	// PRIORITY PATTERN NAV

	function pp_nav() {
		calc_windowW();
		var navW;
		var remainW;
		var availableW;
		var navPad;
		get_data();		

		// Hamburger

		if (activeItems < nbNavItems) {
		  $('.hamburger').addClass('is-visible');
		} else {
		  $('.hamburger').removeClass('is-visible pp-visible');
		  $('.pp').removeClass('is-visible');
		}

		// Move items

		if (remainW < navW) {
			if ($('.nav__secondary .nav__item').length > 0) {
			  var $item =  $('.nav__secondary').children().last();
			} else {
			  var $item =  $('.nav__primary').children().last();
			}
			ppItemsW.push($item.outerWidth());
			$item.removeClass('is-active').prependTo('.pp').on('click', clicPPnavItem).off('click', clicNavItem);
			clicPPnavItem();
			activeItems--;
		} else {
			if (ppItemsW.length>0) {
				if (availableW > ppItemsW[ppItemsW.length-1]) {
					var $item = $('.pp .nav__item').first();
					if ($('.nav__primary .nav__item').length == nbNavItemsNav1) {
					  $item.first().appendTo('.nav__secondary');
					} else {
					  $item.first().appendTo('.nav__primary');
					}
					$item.removeClass('is-unfold').off('click', clicPPnavItem).on('click', clicNavItem);
					ppItemsW.pop();
					activeItems++;
				}
			}
		}

		// Get data

		function get_data() {
			var hamburgerW = 0;
			if ($('.hamburger').hasClass('is-visible')) {
				hamburgerW = 50;
			}
			navW = $('.nav__primary').innerWidth() + $('.nav__secondary').width();
			navbarPd = $('.navbar').css('padding-left').replace("px", "")*2;
			remainW = windowW - logoW - buttonsW - navbarPd - hamburgerW;
			availableW = remainW - navW;
		}
	}


	// SEARCH

	$('.js-toggle-search').on('click', toggleSearch);
	function toggleSearch() {
		if (!$('.navbar').hasClass('is-search')) {
			$('.navbar').addClass('is-search');
			setTimeout(function() { $('.nav__search__input').focus(); }, 1);
			$('.js-toggle-pp').removeClass('pp-visible');
			$('.pp').removeClass('is-visible');
			$('.no-pp .is-active').removeClass('is-active');
			$('.pp .is-unfold').removeClass('is-unfold');
		} else {
			$('.navbar').removeClass('is-search');
			for (var i=0; i<nbNavItems; i++) {
				pp_nav();
			}
		}
	}


	// CLIC EVENTS FOR TOUCH DEVICES

	if ($('body').hasClass('touch')) {
		$('.js-toggle-pp').click(function(){
			clearMenu();
			if (!$('.pp').hasClass('is-visible')) {
				$('.navbar__id').addClass('is-compact');
			}
			$(this).toggleClass('pp-visible');
			$('.pp').toggleClass('is-visible');
		})

		$('.no-pp .nav__item').on('click', clicNavItem);
	}

	function clicNavItem(e) {
		if (!$(e.target).hasClass('nav__item__title')) {
			return;
		}
		if ($(this).hasClass('is-active')) {
			clearMenu();
		} else {
			clearMenu();
			$(this).toggleClass('is-active');
			$('.pp').removeClass('is-visible');
			$('.js-toggle-pp').removeClass('pp-visible')
			$('.navbar__id').addClass('is-compact');
		}
	}

	function clicPPnavItem() {
	    $('.pp .is-unfold').removeClass('is-unfold');
	    $(this).addClass('is-unfold');
	}

	function clearMenu() {
		$('.no-pp .is-active').removeClass('is-active');
		$('.pp .is-unfold').removeClass('is-unfold');
		if (!$('.navbar').hasClass('stick-top')) {
			$('.navbar__id').removeClass('is-compact');
		}
	}

	// WAYPOINT

	$('.top-display').waypoint( function(direction) {
		if ( direction == 'down' ) {
			$('.navbar, .navbar__id').addClass('is-compact');
		} else {
			$('.navbar, .navbar__id').removeClass('is-compact');
		}
	 	
	}, {offset: '-1px'});
function init_tabs() {
	$('.js-tab').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-active') ) {
			active_tab($(this));
		}
	}).eq(0).click();

	function active_tab(tab) {
		$('.js-tab').prop('disabled',true).removeClass('is-active');

		tab.addClass('is-active');
		var index = tab.index();

		var content = tab.parent().next();

		var $old = $('.js-tab-content.is-active');
		$old.removeClass('is-active').addClass('anim-off');
		var nbItem = $old.children().length;
		var oldH = $old.height();

		var $new = content.find('.js-tab-content').eq(index);
		var newH = $new.height();

		var taller = ( newH > oldH ) ? true : false;

		if ( taller ) {
			content.height( $new.height() );
		}

		setTimeout(function() {
			$new.addClass('is-active');
		}, 200)

		setTimeout(function() {
			$('.js-tab').prop('disabled',false);;
			$old.removeClass('anim-off');
			if ( !taller ) {
				content.height( $new.height() );
			}
		}, nbItem*200 )
	}

	$('.js-tab-wrap').each(function() {
		var nb = $(this).find('.js-tab').length;
		$(this).attr('data-tabs', nb);
	});
}