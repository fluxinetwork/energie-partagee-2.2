<?php 

$type_form = get_sub_field('type_form');


if( !empty($type_form) ): 

	if($type_form == 'newsletter'):
		include( TEMPLATEPATH.'/app/inc/inc_projet/court-circuit.php' );
	endif;

endif; 
?>