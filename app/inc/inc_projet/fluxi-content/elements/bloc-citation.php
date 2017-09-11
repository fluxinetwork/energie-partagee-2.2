<?php 	
	
	$citation = get_sub_field('citation');
	
	if(!empty($citation)):
		echo '<blockquote class="wrap-extend"><p class="blockquote">'.$citation.'</p></blockquote>';	
	endif;	 
		
?>
