<?php
	$url_parent_page = home_url().'/les-projets/nos-formations/';

	$main_img_add = get_field( 'add_image' );
	$main_image ='';
	
	if($main_img_add == 1):
		$main_image_obj = get_field( 'main_image' );
		$main_image = '<div class="wrap-extend wrap-extend--firstImg"><img class="img-responsive" src="'.$main_image_obj['url'].'"></div>';
	endif;
	
	$prev_post = get_adjacent_post( true, '', true ); 
	$next_post = get_adjacent_post( true, '', false );

  ?>
  <header class="header-bloc--page">  
  	<div class="header-bloc__content">  
	    <ul class="tags">
	    	 <li><a class="tag" href="<?php echo $url_parent_page; ?>">Formations</a></li>	         
	    </ul>  

	    <h1 class="h1 wrap-n">
	      <?php the_title(); ?>
	    </h1>
	    
	    <h4 class="h4"><span class="icon-calendar_20"></span><?php echo date_i18n('d F Y', strtotime(get_field('date_event', false, false)));?><span class="icon-pin_20"></span><?php echo get_field('ville_event');?></h4>    
	    
    </div>
  </header>
  
    <?php

    	$class = 'fluxi-wrap fluxi-content fitvids';
    	if (!$main_image) { $class .= ' has-bg'; }

		echo '<article class="'.$class.'">';
			echo $main_image;						
			get_description();
			get_socials();
    		the_content();

    		// Suggestion d'articles
			if ( !empty( $prev_post ) || !empty( $next_post )):
				echo '<aside class="suggestion"><div class="suggestion-posts wrap-anim ready-anim">';
					if ( !empty( $prev_post ) ): 
						echo '<div class="cat-nav"><h5 class="s-title">Précédent</h5><span class="reverse"><a href="'.get_permalink( $prev_post->ID ).'" class="button-round grey" title="'.$prev_post->post_title.'"><i class="icon-fleche_64"></i></a></span></div>';				
					endif;

					echo '<div class="cat-nav"><h5 class="s-title">Voir tout</h5><a href="'.$url_parent_page.'" class="button-round grey"><i class="icon-plus_64"></i></a></div>';

					if ( !empty( $next_post ) ):
						echo '<div class="cat-nav"><h5 class="s-title">Suivant</h5><a href="'.get_permalink( $next_post->ID ).'" class="button-round grey" title="'.$next_post->post_title.'"><i class="icon-fleche_64"></i></a></div>';		
					endif;
				 echo '</aside>';
			endif; 	 

    	echo '</article>';
    	
	?>


