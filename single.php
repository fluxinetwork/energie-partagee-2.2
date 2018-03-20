<?php 

get_header();

	echo '<section class="wrap-main">';

		if ( have_posts() ) :

			while ( have_posts() ) : the_post();

				if ( is_singular('post') ) :

					get_template_part( 'page-templates-parts/content', 'single' );
			
				elseif ( is_singular('formation') ) :

					get_template_part( 'page-templates-parts/content', 'formation' );		

				endif;

			endwhile;

		else:

	  		get_template_part( 'page-templates-parts/content', 'none' );

		endif;

	echo '</section>';

get_footer();