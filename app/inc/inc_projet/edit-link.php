<?php  
global $current_user;
$current_user = wp_get_current_user();		
		
if ( is_user_logged_in() ) :
	if (is_page()||is_single()) :
		if($current_user->user_login=='Adherent') :
			else : echo '<div class="edit"><a class="link" href="'.get_edit_post_link().'" class="edit-link">Editer</a></div>';
		endif;				
	endif;
endif;
		