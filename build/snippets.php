<?php 

	/**
	 * Wordpress snippets library
	 *
	 * #loop
	 * #wpquery 
	 * #thumbURL
	 * #searchfilter
	 */


	/**
	 * The Loop
	 * #loop
	 */

	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post(); 
		endwhile;
	endif;


	/**
	 * WP Query
	 * #wpquery
	 *
	 * List of params https://codex.wordpress.org/Class_Reference/WP_Query
	 *
	 * WARNING : if "posts_per_page" param is not set Wordpress use reading preferences in admin
	 */

	$args = array(
		'post_type' => 'post'
	);
	$query = new WP_Query( $args );
	if ( $query->have_posts() ) :
		while ( $query->have_posts() ) :
			$query->the_post();
		endwhile;
	endif;
	wp_reset_postdata();


	/**
	 * Get post thumbnail URL
	 * #thumbURL
	 */

	$post_img_id = get_post_thumbnail_id();
	$post_img_array = wp_get_attachment_image_src($post_img_id, 'full', true);
	$post_img_url = $post_img_array[0];	


	/**
	 * Get ACF option repeater
	 * #optionACF
	 */

	if( have_rows('repeater', 'option') ):
    	while( have_rows('repeater', 'option') ): the_row();
        	the_sub_field('title');
    	endwhile;
	endif;


	/**
	 * Filter search results
	 * #searchfilter
	 */

	function search_filter($query) {
	    if ($query->is_search && !is_admin() ) {
	        $query->set('post_type',array('post','page'));
	    }
	    return $query;
	}
	add_filter('pre_get_posts','search_filter');
?>