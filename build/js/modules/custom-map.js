
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


var iconShadow = {
	url: themeURL+'/app/img/marker-shadow.png',
	size: new google.maps.Size(38, 38),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(36, 34)
};

var iconsProjectsMap = {
	eolie: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 8,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 2,
      	fillColor: '#5ab1bb',
      	fillOpacity: 1, 
    },
	bioma: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 8,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 2,
      	fillColor: '#83ab00',
      	fillOpacity: 1, 
    },
	solai: { 
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 8,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 2,
      	fillColor: '#e9af00',
      	fillOpacity: 1, 
    },
	micro: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 8,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 2,
      	fillColor: '#5268b9',
      	fillOpacity: 1, 
    },
	geoth: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 8,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 2,
      	fillColor: '#e7511e',
      	fillOpacity: 1, 
    },
	econo: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 8,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 2,
      	fillColor: '#b7115b',
      	fillOpacity: 1, 
    }
};

var iconsSelectProjectsMap = {
	eolie: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 7,
		strokeColor: '#5ab1bb',
      	strokeOpacity: 1,
      	strokeWeight: 3,
      	fillColor: '#ffffff',
      	fillOpacity: 1,
    },
	bioma: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 7,
		strokeColor: '#83ab00',
      	strokeOpacity: 1,
      	strokeWeight: 3,
      	fillColor: '#ffffff',
      	fillOpacity: 1, 
    },
	solai: { 
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 7,
		strokeColor: '#e9af00',
      	strokeOpacity: 1,
      	strokeWeight: 3,
      	fillColor: '#ffffff',
      	fillOpacity: 1, 
    },
	micro: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 7,
		strokeColor: '#5268b9',
      	strokeOpacity: 1,
      	strokeWeight: 3,
      	fillColor: '#ffffff',
      	fillOpacity: 1, 
    },
	geoth: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 7,
		strokeColor: '#e7511e',
      	strokeOpacity: 1,
      	strokeWeight: 3,
      	fillColor: '#ffffff',
      	fillOpacity: 1, 
    },
	econo: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 7,
		strokeColor: '#b718b',
      	strokeOpacity: 1,
      	strokeWeight: 3,
      	fillColor: '#ffffff',
      	fillOpacity: 1, 
    }
};

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
	            		//markerContent += '<div class="card__img" style="background-image:url('+data[i].image+')"><i class="card__icon"></i><div class="spinner"></div><span class="tag is-inactive">'+data[i].stadeName+'</span></div>';
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


