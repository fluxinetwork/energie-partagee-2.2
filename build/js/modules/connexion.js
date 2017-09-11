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