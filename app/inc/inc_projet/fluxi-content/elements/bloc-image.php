<?php 
	
	$type_dimage = get_sub_field('type_dimage');
	$image_only = get_sub_field('image');
	
	echo '<a href="'.$image_only['sizes']['large'].'" class="lightbox wrap-extend">';
	
	echo'<figure class="figure"><img class="img-responsive" src="'.$image_only['sizes']['large'].'" alt="'.$image_only['alt'].'" />';
			
	if($type_dimage == 'image_legende'):
		$legende = get_sub_field('legende');					
		echo '<figcaption class="legend">'.$legende.'</figcaption>';
	endif;			 
	
	echo '</figure></a>';	
?>
