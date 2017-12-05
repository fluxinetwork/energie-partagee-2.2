<section class="page-formations l-tabs js-tab-wrap">
	<div class="l-tabs__controls">
		<button class="l-tabs__controls__tab button cta js-tab">Formations</button>
		<button class="l-tabs__controls__tab button cta js-tab">Webinaires</button>
	</div>
	
	<div class="l-tabs__content page-formations__content">

<?php

$meta_label = 'date_event';	
$cat_id = 2;

/*=============================================*\

			 FORMATIONS DEBUTANT

\*=============================================*/

echo '<ul class="l-tabs__content__list js-tab-content">';

$args_formations_debutant = array(
	'ignore_sticky_posts' 	=> 1,
	'post_status' => 'publish',
	'post_type' => 'post',
	'posts_per_page' => -1,
	'meta_key' => $meta_label,
	'orderby' => 'meta_value_num',
	'order' => 'ASC',
	'meta_query' => array( 
		'relation' => 'AND',
		array(
			'key' => $meta_label, 
			'value' => date('y-m-d'), 
			'compare' => '>=',
			'type' => 'DATE'
		),
		array(
			'key' => 'type_formation', 
			'value' => 'formation', 
			'compare' => '='
		)
	)  
);		

$formations_debutant = new WP_Query( $args_formations_debutant );

if ( $formations_debutant->have_posts() ) :

	$hasResults = true;

	while ( $formations_debutant->have_posts() ) :
		$formations_debutant->the_post();

		echo '<li class="l-tabs__content__list__item">';
		
		include( get_template_directory() . '/page-templates-parts/formation-item.php' );

		echo '</li>';

	endwhile;

else : 

	$hasResults = false;

	echo '<li class="l-tabs__content__list__item">';

	include( get_template_directory() . '/page-templates-parts/formation-item.php' );

	echo '</li>';

endif;

echo '</ul>';

wp_reset_postdata();


/*=============================================*\

			 FORMATIONS EXPERT

\*=============================================*/

echo '<ul class="l-tabs__content__list js-tab-content">';

$args_formations_expert = array(
	'ignore_sticky_posts' 	=> 1,
	'post_status' => 'publish',
	'post_type' => 'post',
	'posts_per_page' => -1,
	'meta_key' => $meta_label,
	'orderby' => 'meta_value_num',
	'order' => 'ASC',
	'meta_query' => array( 
		'relation' => 'AND',
		array(
			'key' => $meta_label, 
			'value' => date('y-m-d'), 
			'compare' => '>=',
			'type' => 'DATE'
		),
		array(
			'key' => 'type_formation', 
			'value' => 'webinaire', 
			'compare' => '='
		)
	)  
);		

$formations_expert = new WP_Query( $args_formations_expert );

if ( $formations_expert->have_posts() ) :

	$hasResults = true;

	while ( $formations_expert->have_posts() ) :
		$formations_expert->the_post();

		echo '<li class="l-tabs__content__list__item">';
		
		include( get_template_directory() . '/page-templates-parts/formation-item.php' );

		echo '</li>';

	endwhile;

else : 
	
	$hasResults = false;

	echo '<li class="l-tabs__content__list__item">';

	include( get_template_directory() . '/page-templates-parts/formation-item.php' );

	echo '</li>';

endif;

echo '<li class="l-tabs__content__list__item">';
echo '<a href="http://energie-partagee.org/nos-outils/nos-formations/les-videos-des-webenr-passes/" target="_blank">';
echo '<article class="c-formation">';
echo '<div class="button-round grey"><i class="icon-plus_64"></i></div>';
echo '<div class="c-formation__infos"><h1 class="c-formation__infos__title">Visionner les vidéos des Web\'EnR passés</h1></div>';
echo '</article>';
echo '</a>';
echo '</li>';

echo '</ul>';

wp_reset_postdata();

?>

	</div>
</section>