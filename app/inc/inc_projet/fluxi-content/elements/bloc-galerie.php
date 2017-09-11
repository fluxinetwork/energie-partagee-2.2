<?php 

$type_galerie = get_sub_field('type_galerie');
$galerie = get_sub_field('galerie');

if( $galerie ): 

	if($type_galerie=='galerie_damier'):    
        echo '<aside class="galerie '.$type_galerie.'">';
			foreach( $galerie as $image ):			
				  echo '<a href="'.$image['sizes']['large'].'" data-sub-html="'.$image['caption'].'">';
				   echo '<img src="'.$image['sizes']['thumbnail'].'" alt="'.$image['alt'].'" />';			   
				  echo '</a>';
            endforeach;
        echo '</aside>';   
	
	elseif($type_galerie=='galerie_vignettes'):
		echo '<aside class="galerie '.$type_galerie.'">';
			echo '<ul class="'.$type_galerie.'">';
				foreach( $galerie as $image ):         
					echo '<li data-thumb="'.$image['sizes']['thumbnail'].'" data-src="'.$image['sizes']['large'].'" data-sub-html="'.$image['caption'].'">';
						echo '<img src="'.$image['sizes']['large'].'" alt="'.$image['alt'].'" />';
					echo '</li>';         
				endforeach;       
			echo '</ul>';
		echo '</aside>';
	else:
		echo '<aside class="galerie '.$type_galerie.'">';
			echo '<ul class="'.$type_galerie.'">';
				foreach( $galerie as $image ):         
					echo '<li data-thumb="'.$image['sizes']['thumbnail'].'" data-src="'.$image['sizes']['large'].'" data-sub-html="'.$image['caption'].'">';
						echo '<img src="'.$image['sizes']['large'].'" alt="'.$image['alt'].'" />';
					echo '</li>';         
				endforeach;       
			echo '</ul>';
		echo '</aside>';
	endif;



endif; 
?>