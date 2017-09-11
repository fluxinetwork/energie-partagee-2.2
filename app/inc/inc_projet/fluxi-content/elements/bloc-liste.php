<?php
	$type_liste = get_sub_field('type_liste');	
	
	($type_liste == 'numero' ? $type_liste = 'ol' : $type_liste = 'ul');
	
	echo '<'.$type_liste.' class="list">';	
	while( have_rows('element_liste') ): the_row();  
	
		$type_element = get_sub_field('type_element');
		$texte_liste = get_sub_field('texte_element');
		
		echo ($type_element == 'lien' ? '<li><a href="'.get_sub_field('url_lien').'">'.$texte_liste.'</a></li>' : '<li>'.$texte_liste.'</li>');
		
		
	endwhile; 
	echo '</'.$type_liste.'>';
?>	