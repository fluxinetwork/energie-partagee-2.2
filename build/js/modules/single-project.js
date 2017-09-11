function following_clone() {
	$( ".js-follow-bt" ).clone().appendTo( ".js-follow-clone" );
	
	$('.js-toggle-follow-clone').waypoint(function() {
		$('.js-follow-clone').parent().toggleClass('is-visible');
	}, { offset: '-5%' });

	$('.js-footer').waypoint(function() {
		$('.js-follow-clone').parent().toggleClass('is-visible');
	}, { offset: '100%' });
}