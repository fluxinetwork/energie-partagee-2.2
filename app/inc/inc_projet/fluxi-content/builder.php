<?php

    while ( have_rows('elements_page') ) : the_row();

        if( get_row_layout() == 'titre' ):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-titre.php');

		elseif(get_row_layout() == 'texte'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-texte.php');

		elseif(get_row_layout() == 'citation'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-citation.php');

		elseif(get_row_layout() == 'image'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-image.php');

		elseif(get_row_layout() == 'texte_et_image'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-texte-image.php');

		elseif(get_row_layout() == 'galerie'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-galerie.php');

		elseif(get_row_layout() == 'liste'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-liste.php');

        elseif(get_row_layout() == 'lien'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-lien.php');

		elseif(get_row_layout() == 'publications'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-publications.php');

		elseif(get_row_layout() == 'accordeon'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-accordeon.php');

		elseif(get_row_layout() == 'code'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-code.php');

		elseif(get_row_layout() == 'formulaire'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-formulaire.php');

		elseif(get_row_layout() == 'cliquable'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-cliquable.php');

		elseif(get_row_layout() == 'mozaic_isotope'):
			require locate_template('/app/inc/inc_projet/fluxi-content/elements/bloc-isotope.php');
        endif;

    endwhile;

?>