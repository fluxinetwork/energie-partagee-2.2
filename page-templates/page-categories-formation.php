<?php
/*
Template Name: Toutes les formations
*/
?>
<?php get_header(); ?>

<section class="wrap-main">

  <header class="header-bloc--page header-bloc--slim">
  	<div class="header-bloc__content">
		<?php custom_breadcrumbs(); ?>

	    <h1 class="h1">
			<?php the_title(); ?>
	    </h1>
    </div>
  </header>

<?php	

	require_once( get_template_directory() . '/page-templates-parts/liste-formations.php' );

	if( have_rows('elements_page') ):

		echo '<article class="wrap-n section">'. get_the_content() .'</article>';

	else :

		echo 'Pas de contenu';

	endif;	

?>

</section>

<?php get_footer(); ?>
