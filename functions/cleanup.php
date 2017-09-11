<?php
// FLUXI CLEANUP 1.0 | 20/01/2016

/**
 * Disable admin top bar
 */
show_admin_bar( false );


/**
 * Disable admin bar
 */ 
show_admin_bar( false ); 


/**
 * Remove the toolbar logo
 */
function remove_wp_logo( $wp_admin_bar ) {
	$wp_admin_bar->remove_node( 'wp-logo' );
}
add_action( 'admin_bar_menu', 'remove_wp_logo', 999 );


/**
 * Disable error login return
 */
add_filter('login_errors', create_function('$no_login_error', "return 'Mauvais identifiants';"));


/**
 * Disable lost & reset password
 */
function disable_reset_lost_password() {
   	return false;
}
add_filter( 'allow_password_reset', 'disable_reset_lost_password');

function remove_lost_your_password($text) {
    return str_replace( array('Mot de passe oublié ?', 'Mot de passe oublié'), '', trim($text, '?') ); 
}
add_filter( 'gettext', 'remove_lost_your_password'  );
 
 
/**
 * Modify connection page logo and background
 */
function my_custom_login_logo() {
	 echo '<style type="text/css">.login h1 a {background-image:url('.get_bloginfo('template_directory').'/app/img/logo-login.png)!important; -webkit-background-size:122px auto!important;background-size:122px auto!important;width:inherit!important;height:132px;}</style>';
}
add_action('login_head', 'my_custom_login_logo');

function my_login_logo_url() {
 	return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
 	return 'Fluxi';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

function my_login_message( $message ) {
    if ( empty($message) ){
        return '<p style="text-align:center">Bienvenue sur l\'espace adhérents de l\'association Énergie Partagée. Si vous êtes souscripteur, vous pouvez vous connecter sur notre site de souscription en <a href="https://je-souscris.energie-partagee.org/" target="_blank">cliquant ici</a>.</p>';
    } else {
        return $message;
    }
}

add_filter( 'login_message', 'my_login_message' );

/**
 * Modify admin footer infos & credits
 */
function remove_footer_admin () {
	echo 'Propulsé par <a href="http://www.wordpress.org" target="_blank">WordPress</a> | Conception et création Thibaut Caroli et <a href="http://www.yannrolland.com" target="_blank">Yann Rolland</a>';
}
add_filter('admin_footer_text', 'remove_footer_admin');


/**
 * Deregister script wp-embed.js
 */
function my_deregister_scripts(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );


/**
 * Clean up wp_head()
 *
 * Remove unnecessary <link>'s
 * Remove inline CSS used by Recent Comments widget
 * Remove inline CSS used by posts with galleries
 * Remove self-closing tag and change ''s to "'s on rel_canonical()
 */
function head_cleanup() {
  // Originally from http://wpengineer.com/1438/wordpress-header/
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

  global $wp_widget_factory;
  remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));

  if (!class_exists('WPSEO_Frontend')) {
    remove_action('wp_head', 'rel_canonical');
    add_action('wp_head', 'custom_rel_canonical');
  }
}
function custom_rel_canonical() {
  global $wp_the_query;

  if (!is_singular()) {
    return;
  }

  if (!$id = $wp_the_query->get_queried_object_id()) {
    return;
  }

  $link = get_permalink($id);
  echo "\t<link rel=\"canonical\" href=\"$link\">\n";
}
add_action('init', 'head_cleanup');


/**
 * Remove the WordPress version from RSS feeds
 */
add_filter('the_generator', '__return_false');


/**
 * Clean up language_attributes() used in <html> tag
 *
 * Remove dir="ltr"
 */
function clean_luanguage_attributes() {
  $attributes = array();
  $output = '';

  if (is_rtl()) {
    $attributes[] = 'dir="rtl"';
  }

  $lang = get_bloginfo('language');

  if ($lang) {
    $attributes[] = "lang=\"$lang\"";
  }

  $output = implode(' ', $attributes);
  $output = apply_filters('clean_luanguage_attributes', $output);

  return $output;
}
add_filter('language_attributes', 'clean_luanguage_attributes');


/**
 * Disable the emoji's
 */
if(!is_admin()){ 
  function disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );  
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );  
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
  }
  add_action( 'init', 'disable_emojis' );
}


/**
 * Clean up output of stylesheet <link> tags
 */
function clean_style_tag($input) {
  preg_match_all("!<link rel='stylesheet'\s?(id='[^']+')?\s+href='(.*)' type='text/css' media='(.*)' />!", $input, $matches);
  // Only display media if it is meaningful
  $media = $matches[3][0] !== '' && $matches[3][0] !== 'all' ? ' media="' . $matches[3][0] . '"' : '';
  return '<link rel="stylesheet" href="' . $matches[2][0] . '"' . $media . '>' . "\n";
}
add_filter('style_loader_tag', 'clean_style_tag');


/**
 * Add and remove body_class() classes
 */
function clean_body_class($classes) {
  // Add post/page slug
  if (is_single() || is_page() && !is_front_page()) {
    $classes[] = basename(get_permalink());
  }

  // Remove unnecessary classes
  $home_id_class = 'page-id-' . get_option('page_on_front');
  $remove_classes = array(
    'page-template-default',
    $home_id_class
  );
  $classes = array_diff($classes, $remove_classes);

  // Remove body class "blog" on homepage
  if ( !is_admin() && is_home() ){
      foreach($classes as &$str){
          if(strpos($str, "blog") > -1){
              $str = "";
          }
      }
  }

  return $classes;
}
add_filter('body_class', 'clean_body_class');


/**
 * Wrap embedded media as suggested by Readability
 *
 * @link https://gist.github.com/965956
 * @link http://www.readability.com/publishers/guidelines#publisher
 */
function media_embed_wrap($cache, $url, $attr = '', $post_ID = '') {
  return '<div class="entry-content-asset">' . $cache . '</div>';
}
add_filter('embed_oembed_html', 'media_embed_wrap', 10, 4);


/**
 * Remove unnecessary dashboard widgets
 *
 * @link http://www.deluxeblogtips.com/2011/01/remove-dashboard-widgets-in-wordpress.html
 */
function remove_dashboard_widgets() {
  remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
  remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
  remove_meta_box('dashboard_primary', 'dashboard', 'normal');
  remove_meta_box('dashboard_secondary', 'dashboard', 'normal');
}
add_action('admin_init', 'remove_dashboard_widgets');


/**
 * Remove unnecessary admin menu
 *
 */
function remove_menus () {
  global $menu;
  // $restricted = array(__('Dashboard'), __('Posts'), __('Media'), __('Links'), __('Appearance'), __('Tools'), __('Plugins'), __('Users'), __('Comments'));
  $restricted = array(__('Dashboard'), __('Links'), __('Comments'));
  end ($menu);
  while (prev($menu)){
      $value = explode(' ',$menu[key($menu)][0]);
      if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
  }
}
add_action('admin_menu', 'remove_menus');


/**
 * Clean up the_excerpt()
 */
function custom_excerpt_length($length) {
  return POST_EXCERPT_LENGTH;
}
add_filter('excerpt_length', 'custom_excerpt_length');


/**
 * Remove unnecessary self-closing tags
 */
function remove_self_closing_tags($input) {
  return str_replace(' />', '>', $input);
}
add_filter('get_avatar',          'remove_self_closing_tags'); // <img />
add_filter('comment_id_fields',   'remove_self_closing_tags'); // <input />
add_filter('post_thumbnail_html', 'remove_self_closing_tags'); // <img />


/**
 * Don't return the default description in the RSS feed if it hasn't been changed
 */
function remove_default_description($bloginfo) {
  $default_tagline = 'Un site utilisant WordPress';
  return ($bloginfo === $default_tagline) ? '' : $bloginfo;
}
add_filter('get_bloginfo_rss', 'remove_default_description');


