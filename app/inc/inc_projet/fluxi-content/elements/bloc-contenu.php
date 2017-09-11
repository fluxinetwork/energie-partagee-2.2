<div class="blocs-contenu">

<?php
		
	$titre_bloc = get_sub_field('titre_bloc');
	$texte_bloc = get_sub_field('texte_bloc');
	$image_bloc = get_sub_field('image_bloc');	
	$image_align = get_sub_field('alignement_image');
	$image_size = 'carte';
	
	if($texte_bloc == '' || $image_align=='full'):
		$image_size = 'large';
	endif;
	
	if($image_bloc):
		if($texte_bloc):	
			if($titre_bloc):
				echo '<h2>'.$titre_bloc.'</h2>';
			endif;
			echo '<div class="texte"><span class="image align-'.$image_align.'"><img src="'.$image_bloc['sizes'][$image_size].'" alt="'.$image_bloc['alt'].'" /></span>'.$texte_bloc.'</div>';				
		else:	
			if($titre_bloc):
				echo '<h2>'.$titre_bloc.'</h2>';
			endif;	
			echo '<div class="image align-full"><img src="'.$image_bloc['sizes'][$image_size].'" alt="'.$image_bloc['alt'].'" /></div>';
		endif;			
	else:		
		if($titre_bloc):
			echo '<h2>'.$titre_bloc.'</h2>';
		endif;
		if($texte_bloc):
			echo '<div class="texte">'.$texte_bloc.'</div>';
		endif;		
	endif;			
	
?>	

</div>