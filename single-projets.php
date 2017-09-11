<?php get_header(); ?>

  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); 
  
  	// Vidéo
	$video_header = get_field('video');	
  
  	//Location
	$location = get_field('coordonees_gps');
	if( !empty($location) ){
		$latitude = $location['lat'];
		$longitude = $location['lng'];
	}	
	// Taxo Slug		
	$terms = get_the_terms( $post->ID, 'type_energie' );
	if ( !empty( $terms ) ) {
		$term = array_shift( $terms );
		$taxoslug = $term->slug;
		$taxoname = $term->name;
	}
	
	$type_power = 'c-' . substr($taxoslug, 0, 5);
	
	// Status
	$field_stade = get_field_object('status_projet');
	$value_stade = get_field('status_projet');
	$label_stade = $field_stade['choices'][ $value_stade ];
	
	$url_call_to_action = get_field('url_call_to_action');	

	// Imgs
	$main_img_add = get_field( 'add_image' );
	$main_image ='';	
	$main_url ='';
	
	if ( has_post_thumbnail() && $main_img_add == 0) :
		$post_img_id = get_post_thumbnail_id();
		$post_img_array = wp_get_attachment_image_src($post_img_id, 'post-thumb', true);
		$post_img_url = $post_img_array[0];
		$main_url = $post_img_url;
		$main_image = '<div class="wrap-extend wrap-extend--firstImg"><img class="img-responsive" src="'.$post_img_url.'"></div>';
    $thumb_url_a = wp_get_attachment_image_src($post_img_id, 'post-thumb', true);
    $thumb_url = $thumb_url_a[0];
	elseif($main_img_add == 1):
    $main_image_obj = get_field( 'main_image' );
		$main_image = '<div class="wrap-extend wrap-extend--firstImg"><img class="img-responsive" src="'.$main_image_obj['sizes']['post-thumb'].'"></div>';
		$main_url = $main_image_obj['url'];
    $thumb_url = $main_image_obj['sizes']['thumbnail'];
	endif;

	// Img porteur de projet
	$portrait_pdp = get_field('portrait');
  // Mail porteur	de projet
  $contact_project = get_field('email');

  ?>
    <section class="wrap-main<?php echo ' ' . $type_power; ?>">
      <header class="header-bloc--page"> 
        <div class="header-bloc__content">
          <ul class="tags">   	
              <li class="tag is-inactive"><?php echo $taxoname;?></li>
              <li class="tag is-inactive"><?php echo $label_stade; ?></li>     
          </ul>    

          <h1 class="h1 wrap-n">
            <?php the_title(); ?>  
          </h1>
          
          <?php if( $video_header && $video_header != '0' && $video_header != '1'){ ?>
              <div class="lightvideo">
                <a class="button cta" data-src="<?php echo $video_header; ?>" href=""><i class="icon-video_20"></i> Voir la vidéo</a>
              </div> 
          <?php } ?>
        </div>
        
      </header>
        <article class="fluxi-wrap a-project">
        
            <?php echo $main_image; ?>
            
           <?php get_description(); ?>
           
            <?php include( TEMPLATEPATH.'/app/inc/inc_projet/following-project.php' ); ?>
            
            <?php include( TEMPLATEPATH.'/app/inc/inc_projet/map-project.php' ); ?>  
            
            <?php include( TEMPLATEPATH.'/app/inc/inc_projet/steps-project.php' ); ?>        
            
            <?php include( TEMPLATEPATH.'/app/inc/inc_projet/testimony-project.php' ); ?>      
            
            <?php include( TEMPLATEPATH.'/app/inc/inc_projet/capital-project.php' ); ?> 
            
            <?php	// FLUXI CONTENT	 		   
                if( have_rows('elements_page') && $value_stade != 'collecte'):
                    echo '<div class="fluxi-content fitvids" id="en-savoir-plus">';		
                        //require_once locate_template('/app/inc/inc_projet/fluxi-content/builder.php');
                        the_content();			
                    echo '</div>';
                endif; 		   
             ?> 
           
        </article>
    </section>    

	<?php include( TEMPLATEPATH.'/app/inc/inc_projet/trio-projects.php' ); ?>       
  
  <?php endwhile; ?>
  
  <?php else: ?>
    <section class="wrap-main">
      <header class="header-bloc">        
        <h1 class="h1 wrap-n">Le projet n'existe pas </h1>      
      </header>  
      <article class="fluxi-wrap a-project">
        <p>Le projet n'existe pas</p>
      </article>    
    </section>  
  <?php endif; ?>

<?php get_footer(); ?>
