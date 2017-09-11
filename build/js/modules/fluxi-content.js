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