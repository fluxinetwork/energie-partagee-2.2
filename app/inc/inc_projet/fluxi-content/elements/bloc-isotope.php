<?php 	
	$type_de_mozaic = get_sub_field('type_de_mozaic');		
	$array_filters = $array_elements = array();
	$random_id = str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789');
	$random_id = substr( $random_id , 0 , 6 ); 
	$count_filters = 0;
	
	if($type_de_mozaic == 'mosaic_images' || $type_de_mozaic == 'mosaic_documents'):
		
		if( have_rows('groupe_elements') ):			
			
			while( have_rows('groupe_elements') ): the_row();  			
							   
				$filtre_label = $filtre_mozaic  = get_sub_field('filtre');
				$clean_strings = array(' ','-','_');
				$filtre_mozaic = str_replace($clean_strings, '', $filtre_mozaic); 
				$filtre_mozaic = sanitize_title($filtre_mozaic);
				// random generated class : f_'.$random_id.'_'.$count_filters.'
									
				$array_filters[] = '<button class="button f_cat_'.$count_filters.'"  data-filter=".f_cat_'.$count_filters.'">'.$filtre_label.'</button>';
				
				while( have_rows('elements') ): the_row(); 						
					$titre_element = get_sub_field('titre');
					
					if($type_de_mozaic == 'mosaic_images'):	
						$img_element = get_sub_field('image');										 
						$array_elements[] = '<li class="item f_cat_'.$count_filters.'"><img class="img-vignette" src="'.$img_element['sizes']['thumbnail'].'" alt="'.$titre_element.'" /></li>';
						
					elseif($type_de_mozaic == 'mosaic_documents'):	
						$doc_element = get_sub_field('document');	
																										 
						$array_elements[] = '<li class="item f_cat_'.$count_filters.'"><a href="'.$doc_element['url'].'" target="_blank"><span class="icon-doc js-icon-notype"></span><span class="titre">'.$titre_element.'</span></a></li>';
						
					endif;					
												
				endwhile; 
				
				$count_filters++;
					
			endwhile; 		
            					
        endif; 		
		// Output
		echo '<div class="isogrid '.$type_de_mozaic.' wrap-extend">';
			echo '<div id="filters-isogrid" class="button-group-sort">'; 		
				echo '<button class="button is-checked" data-filter="*">Tout</button>'; 			
				foreach ($array_filters as $filter){ 
					echo $filter;				
				}		 
			echo '</div>';	
			
			echo '<ul class="main-isogrid">';			
				foreach ($array_elements as $elements){ 
					echo $elements;
				}	
			echo '</ul>';	
		echo '</div>';	
		
	endif;			 
		
?>