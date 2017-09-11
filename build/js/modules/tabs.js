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