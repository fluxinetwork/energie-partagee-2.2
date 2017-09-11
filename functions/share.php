<?php

/** 
 * SHARING TOOLS
 *
 * 01. Open Graph meta
 * 02. Share buttons
 */


/** 
 * 01. Open Graph meta
 * WARNING !!! Default image to share and facebook profile id must be yours
 */

// Add Open Graph in the language attributes
function add_opengraph_doctype( $output ) {
	return $output . ' xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"';
}
add_filter('language_attributes', 'add_opengraph_doctype');

// Add Open Graph meta in head
function insert_fb_in_head() {
	global $post;
	$post_img_url = get_bloginfo('template_url').'/app/img/default_fb.jpg';

	if ( is_front_page() ) {

		echo '<meta property="og:type" content="website"/>';
        echo '<meta property="og:title" content="' .get_bloginfo('name'). '"/>';
        echo '<meta property="og:description" content="' .get_bloginfo('description'). '"/>';
       	echo '<meta property="og:url" content="' .get_bloginfo('url'). '"/>';

	} else {

		echo '<meta property="og:type" content="article"/>';
		echo '<meta property="og:title" content="' .get_the_title(). '"/>';
		echo '<meta property="og:description" content="' .get_field('google_description'). '"/>';
		echo '<meta property="og:url" content="' .get_permalink(). '"/>';

		$page_id = get_the_ID();
		$main_img = get_field('main_image', $page_id);
		if ( $main_img ) {
			$post_img_url = $main_img['sizes']['medium'];	
		}

	}

	echo '<meta property="og:image" content="'.$post_img_url.'"/>';
}
add_action( 'wp_head', 'insert_fb_in_head', 5 );


/** 
 * 02. Share buttons
 */

function get_socials($param = false) {
	global $post;
	$class;
	if ($param) {
		$class = $param;
	}
	echo'<ul class="social '.$param.'">			
           <li><button class="js-share social--fb" data-network="facebook" data-url="' . get_permalink() . '"><i class="icon-facebook_40"></i></button></li>
           <li><button class="js-share social--tw" data-network="twitter" data-url="' . get_permalink() . '"><i class="icon-twitter_40"></i></button></li>
         </ul>';	
} 