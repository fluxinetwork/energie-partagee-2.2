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

$('.fc, .js-toggle-follow-clone').waypoint(function() {
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