<?php

/**
 * Add ACF metabox to JSON REST API return
 *
 * 01. Put ACF fields slugs in $fields
 * 02. Optional : set the json node name to access data
 

$fields[];
$node_name = 'acf';

if ( sizeof($fields) > 0 ) {
	function custom_json_api_prepare_post( $post_response, $post, $context, $node_name ) {
		$array[];
		foreach ($fields as $key => $field) {
			if ( get_field($field, $post['ID']) ) {
		 		array_push($array, get_field($field, $post['ID'], true));
		 	}
		}
		$post_response[$node_name] = $array;
	    return $post_response;
	}
	add_filter( 'json_prepare_post', 'custom_json_api_prepare_post', 10, 3 );
}
*/

function remove_extra_data_json( $data, $post, $context ) {
  // We only want to modify the 'view' context, for reading posts
  if ( $context !== 'view' || is_wp_error( $data ) ) {
    return $data;
  }  
  
  // Here, we unset any data we don't want to see on the front end: 
  /*
  unset( $data['guid'] );
  unset( $data['modified'] );
  unset( $data['modified_gmt'] );
  unset( $data['status'] );
  unset( $data['type'] );
  unset( $data['content'] );
  unset( $data['author'] );
  unset( $data['excerpt'] );
  unset( $data['comment_status'] );
  unset( $data['ping_status'] );
  unset( $data['format'] );
  unset( $data['modified_tz'] );
  unset( $data['date_tz'] );
  
  unset( $data['meta'] );
  unset( $data['terms'] );
  */
  // continue unsetting whatever other fields you want

  return $data;
}

add_filter( 'json_prepare_post', 'remove_extra_data_json', 10, 3 );


