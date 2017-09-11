<?php 
	
	$align_image = get_sub_field('align_image');
	$image_txt = get_sub_field('image');
	$txt_txt = get_sub_field('texte');
	$taille_img = get_sub_field('taille_de_limage'); 
	
			
	if($align_image == 'img_gauche'):					
		echo '<div class="img__left">';
	else:
		echo '<div class="img__right">';
	endif;		
	
		echo '<img class="'.$taille_img.'" src="'.$image_txt['sizes']['large'].'" alt="'.$image_txt['alt'].'" />'.$txt_txt;
	
	echo '</div>';
		
?>
