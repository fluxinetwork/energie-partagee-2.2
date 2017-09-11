<?php
		
	$taille_titre = get_sub_field('taille_titre');
	$texte_titre = get_sub_field('texte_titre');
	$align_titre = get_sub_field('align_titre');
	
	if($taille_titre == 2):
        $class_titre = 3;
    elseif($taille_titre == 3):
        $class_titre = 4;
    elseif($taille_titre == 4):
        $class_titre = 4;
    elseif($taille_titre == 5):
        $class_titre = 4;
    endif;
	
	echo '<h'.$taille_titre.' class="h'.$class_titre.'">'.$texte_titre.'</h'.$taille_titre.'>';
	
?>