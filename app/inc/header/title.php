<?php
if ( is_front_page() ) :
	bloginfo('name');
	print(' | Accueil');
else :
	if(get_field('titre_seo')){
		echo get_field('titre_seo');
	}else{
		wp_title('');
	}
	print(' | ');
	bloginfo('name');
endif;
?>