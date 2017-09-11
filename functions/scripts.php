<?php

/**
 * Register & enqueue styles
 *
 * If working with CSS components please set config vars CSS_COMPONENTS and THEME_DIRECTORY_NAME in config.php
 * Project specific css files auto loaded from components directory
 */

function enqueue_styles() {

    /* REGISTER */

    // common components
    wp_register_style( 'reset', get_template_directory_uri() . '/app/css/explode/base/reset.css', array(), null );
    wp_register_style( 'typography', get_template_directory_uri() . '/app/css/explode/base/typography.css', array(), null );
    wp_register_style( 'wrappers', get_template_directory_uri() . '/app/css/explode/base/wrappers.css', array(), null );
    wp_register_style( 'nav', get_template_directory_uri() . '/app/css/explode/base/nav.css', array(), null );
    wp_register_style( 'coolors', get_template_directory_uri() . '/app/css/explode/base/coolors.css', array(), null );
    wp_register_style( 'footer', get_template_directory_uri() . '/app/css/explode/base/footer.css', array(), null );
    wp_register_style( 'all_buttons', get_template_directory_uri() . '/app/css/explode/base/buttons.css', array(), null );
    wp_register_style( 'homepage', get_template_directory_uri() . '/app/css/explode/pages/homepage.css', array(), null );
    wp_register_style( 'page', get_template_directory_uri() . '/app/css/explode/pages/page.css', array(), null );
    wp_register_style( 'project', get_template_directory_uri() . '/app/css/explode/pages/project.css', array(), null );
    wp_register_style( 'single', get_template_directory_uri() . '/app/css/explode/pages/single.css', array(), null );
    wp_register_style( 'category', get_template_directory_uri() . '/app/css/explode/pages/category.css', array(), null );
    wp_register_style( 'search', get_template_directory_uri() . '/app/css/explode/pages/search.css', array(), null );
    
    // project specific components
    if(is_dir('wp-content/themes/'.THEME_DIRECTORY_NAME)){
        $files = array_slice(scandir('wp-content/themes/'.THEME_DIRECTORY_NAME.'/app/css/explode/components'), 2); 
        $slugs = array();
        foreach ($files as &$value) {        
            if(substr($value, -4,4) == '.css'){
                $file = $value;
                $slug = substr($value, 0,-4);     
                $slugs[] = $slug;      
                
                wp_register_style( $slug, get_template_directory_uri() . '/app/css/explode/components/'.$slug.'.css', array(), null );    
            }
        }
    }else{
        // Error display if THEME_DIRECTORY_NAME doesn't exist
        echo '<p style="position:fixed;top:0;left:0;width:100%;color:white;background:red none;padding:30px;z-index:15000">Your theme directory doesn\'t exist. Modify THEME_DIRECTORY_NAME in config.php</p>';
        
    }

    // main
    wp_register_style( 'css', get_template_directory_uri() . '/app/css/main.css', array(), null );
    wp_register_style( 'css-min', get_template_directory_uri() . '/app/css/main.min.css', array(), null );
    
    /* ENQUEUE */

    wp_enqueue_style('css');
    //wp_enqueue_style('css-min');

}
add_action('wp_enqueue_scripts', 'enqueue_styles', 100);


/**
 * Ajoute une feuille de style à l'admin
 
function load_admin_style() {   
    wp_enqueue_style( 'admin_css', THEME.'/app/css/admin-style.css', false, '1.0.0' );
}
add_action( 'admin_enqueue_scripts', 'load_admin_style' );*/


/**
 * Ajoute une feuille de style au MCE pour une mise en page équivalente au Front

function theme_add_editor_styles() {
    add_editor_style( THEME.'/app/css/editor-style.css' );
}
add_action( 'admin_init', 'theme_add_editor_styles' ); */


/**
 * Register & enqueue scripts
 */

function enqueue_scripts() { 

    /* GLOBAL */
    
    wp_register_script( 'modernizr', get_template_directory_uri() . '/app/js/vendors/modernizr-custom.min.js', array(), null, false );
    wp_register_script( 'jQuery', get_template_directory_uri() . '/app/js/vendors/jquery-1.11.3.min.js', array(), null, false );
    wp_register_script( 'imagesLoaded', get_template_directory_uri() . '/app/js/vendors/imagesloaded.min.js', array(), null, true );
    wp_register_script( 'waypoint', get_template_directory_uri() . '/app/js/vendors/waypoints.min.js', array(), null, true );    
    wp_register_script( 'mousewheel', get_template_directory_uri() . '/app/js/vendors/jquery.mousewheel.min.js', array(), null, true );
    
    /* FORMS */
    
    wp_register_script( 'form-stuff', get_template_directory_uri() . '/app/js/vendors/form.min.js', array(), null, true );
    wp_register_script( 'simpleselect', get_template_directory_uri() . '/app/js/vendors/simpleselect.js', array(), null, true );
    
    /* MAP */
    
    wp_register_script( 'googlemap-api', 'https://maps.googleapis.com/maps/api/js?key='.GOOGLE_MAP_API_KEY , array(), null, true );
    
    
    /* FLUXI CONTENT */ 
    
    wp_register_script( 'fitvids', get_template_directory_uri() . '/app/js/vendors/jquery.fitvids.min.js', array(), null, true );
    wp_register_script( 'lightslider', get_template_directory_uri() . '/app/js/vendors/lightslider.min.js', array(), null, true );
    wp_register_script( 'lightgallery', get_template_directory_uri() . '/app/js/vendors/galerie/lightgallery.min.js', array(), null, true );    
    wp_register_script( 'lg-fullscreen', get_template_directory_uri() . '/app/js/vendors/galerie/lg-fullscreen.min.js', array(), null, true );
    wp_register_script( 'lg-thumbnail', get_template_directory_uri() . '/app/js/vendors/galerie/lg-thumbnail.min.js', array(), null, true );
    wp_register_script( 'lg-video', get_template_directory_uri() . '/app/js/vendors/galerie/lg-video.min.js', array(), null, true );
    wp_register_script( 'isotope', get_template_directory_uri() . '/app/js/vendors/jquery.isotope.min.js', array(), null, true );
    
    wp_register_script( 'js-main', get_template_directory_uri() . '/app/js/main.js', array('modernizr','jQuery','waypoint','form-stuff','googlemap-api','fitvids','lightslider','lightgallery','lg-video','lg-fullscreen','lg-thumbnail','isotope', 'mousewheel'), null, true );
    
    wp_register_script( 'js-full', get_template_directory_uri() . '/app/js/full.js', array('jQuery'), null, true );
    
    // Ajax
    wp_localize_script( 'js-main-min', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    wp_localize_script( 'js-main', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    
    /* ENQUEUE */

    wp_enqueue_script('js-main');
    //wp_enqueue_script('js-full');

}
add_action('wp_enqueue_scripts', 'enqueue_scripts', 100);


/**
 * Google Analytics
 * UA-code is set in config.php
 */

function google_analytics() { ?>

    <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','<?php echo GOOGLE_ANALYTICS_ID; ?>');ga('send','pageview');
    </script>

<?php }

if (GOOGLE_ANALYTICS_ID && GOOGLE_ANALYTICS_ID != '') {
  add_action('wp_footer', 'google_analytics', 20);
}
