<!doctype html>
<html lang="<?php echo get_locale() ?>" prefix="og: http://ogp.me/ns#">		
<head>
	
	<meta charset="<?php bloginfo('charset'); ?>">
    
    <meta name="description" content="<?php
    if ( is_front_page() ) :
		bloginfo('description');
	else:
		if( !empty(get_field('google_description')) ):
			echo esc_attr(get_field('google_description'));
		else:
			bloginfo('description');
		endif;
	endif;?>">
    
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

	<title><?php include( TEMPLATEPATH.'/app/inc/header/title.php' ); ?></title>
	
	<?php wp_head(); ?>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
	
</head>

<?php include( TEMPLATEPATH.'/app/inc/header/bodyclass.php' ); ?>
<body <?php body_class($bodyclass); ?>>
	
    <?php include( TEMPLATEPATH.'/app/inc/inc_projet/edit-link.php' ); ?>
    
	<div class="top-display">
    	<p class="p-ss">Pour aller sur le site de souscription, <a href="https://je-souscris.energie-partagee.org/" target="_blank">cliquez ici</a></p>
    </div>

	<div class="wrap-main">
    
		<header class="navbar <?php if (is_search()) : echo 'is-search'; endif; ?>">        
			<?php include( TEMPLATEPATH.'/app/inc/header/nav.php' ); ?>
		</header>
        
		