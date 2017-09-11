<?php
/*
Template Name: Tous les événements
*/
?>
<?php get_header(); ?>
<?php	
	$cat_id = 16;
	$cat_ppp = 12;
	$meta_label = 'date_event';	
	
	$args_category = array(
		'post_status' => 'publish',
		'post_type' => 'post',
		'cat' => $cat_id ,
		'posts_per_page' => $cat_ppp,
		'orderby' => 'meta_value',
		'meta_key' => $meta_label,
		'order' => 'ASC',
		'meta_query' => array( 
			array(
				'key' => $meta_label, 
				'value' => date('y-m-d'), 
				'compare' => '>=',
				'type' => 'DATE'
			)
		)  
	);			
	
	$query_category = new WP_Query( $args_category );

	// Total posts
	$args_count = array(
		'post_status' => 'publish',
		'post_type' => 'post',
		'cat' => $cat_id,		
		'meta_key' => $meta_label,
		'order' => 'ASC',
		'meta_query' => array( 
			array(
				'key' => $meta_label, 
				'value' => date('y-m-d'), 
				'compare' => '>=',
				'type' => 'DATE'
			)
		)  
	);
	$posts_count = new WP_Query( $args_count );
	$total_post_count = $posts_count->found_posts;
	
	
?>
	<?php include( TEMPLATEPATH.'/app/inc/inc_projet/get-category.php' ); ?>
<?php get_footer(); ?>
