<?php
/*
Template Name: Dans la presse
*/
?>
<?php get_header(); ?>
<?php
	
	$cat_id = 17;
	$cat_ppp = 12;	
		
	$args_category = array(
		'post_status' => 'publish',
		'post_type' => 'post',
		'cat' => $cat_id ,
		'posts_per_page' => $cat_ppp
	);	
	
	$query_category = new WP_Query( $args_category );

	// Total posts
	$args_count = array(
		'post_status' => 'publish',
		'post_type' => 'post',
		'cat' => $cat_id 
	);
	$posts_count = new WP_Query( $args_count );
	$total_post_count = $posts_count->found_posts;
?>
	<?php include( TEMPLATEPATH.'/app/inc/inc_projet/get-category.php' ); ?>
<?php get_footer(); ?>
