/*------------------------------*\

    #FUNCTIONS

\*------------------------------*/

// Jquery OuterWidth() always with margin & padding

var oldOuterWidth = $.fn.outerWidth;
$.fn.outerWidth = function () { 
	return oldOuterWidth.apply(this, [true]);
};



