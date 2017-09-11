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




