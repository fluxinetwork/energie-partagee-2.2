<?php

	$legende = '';
	$description = '';
	$icon = '';	
	$class_link = '';
	$template_btn = '';
	$template_link = '';
	
	$type_link = get_sub_field('type_lien');
	$target_link = get_sub_field('cible_lien');
	$texte_link = get_sub_field('texte_lien');	

	if(!empty($type_link)):	

		if($type_link == 'fichier-interne'):
			$file = get_sub_field('url_fichier');
			$url_link = $file['url'];
			$legende = '<span class="legend">'.$file['caption'].'</span>';
			$description = $file['description'];
			$icon = '<i class="icon-download_64"></i>';
			
		elseif($type_link == 'fichier-externe'):
			$url_link = get_sub_field('url_lien');
			$target_link = '_blank';
			$icon = '<i class="icon-download_64"></i>';
			
		elseif($type_link == 'lien-page'):			
			$url_link = get_sub_field('lien_page');
			$icon = '<i class="icon-chevronright_32"></i>';	
			
		elseif($type_link == 'lien-mailto' || $type_link == 'bouton-mailto'):	
			$url_link = get_sub_field('add_mailto');
			$url_link = 'mailto:'.$url_link;
			$target_link = '_blank';
			$icon = '<i class="icon-chevronright_64"></i>';	
					
		else:
			$url_link = get_sub_field('url_lien');
			$icon = '<i class="icon-chevronright_32"></i>';				
		endif;
		
		if( $type_link == 'bouton' || $type_link == 'bouton-mailto' || $type_link == 'bouton-page' ):
			$class_link = 'button green __btn button--solo';	
			echo '<a class="'.$class_link.'" href="'.$url_link.'" title="'.$texte_link.'" target="'.$target_link.'">';							
					echo '<span class="txt">'.$texte_link.'</span>';
			echo '</a>';

		elseif( $type_link == 'fichier-externe' || $type_link == 'fichier-interne' || $type_link == 'lien-mailto'):
			$class_link = 'f-btn--big';
			echo '<a class="'.$class_link.'" href="'.$url_link.'" title="'.$texte_link.'" target="'.$target_link.'">';
				echo $icon;
				echo '<div>';
					echo '<span class="txt">'.$texte_link.'</span>';
					echo $legende;				
				echo '</div>';
			echo '</a>';
		else:			
			$class_link = 'f-btn';				
			echo '<a class="'.$class_link.'" href="'.$url_link.'" title="'.$texte_link.'" target="'.$target_link.'">';
				echo $icon;
				echo '<div>';
					echo '<span class="txt">'.$texte_link.'</span>';
					echo $legende;				
				echo '</div>';
			echo '</a>';	
		endif;	
		
			
	endif;
?>