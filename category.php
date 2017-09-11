<?php get_header(); ?>
<?php
	$cat = get_the_category();
	$cat_id = $cat[0]->cat_ID;
	$cat_ppp = 12;	

	if ( $cat_id == 15 ) :
    	$title = 'Actualités';
    elseif ( $cat_id == 17 ) :
    	$title = 'Dans la presse';
    elseif ( $cat_id == 16 ) :
    	$title = 'Événements';
    elseif ( $cat_id == 19 ) :				
    	$title = 'Ateliers';
    elseif ( $cat_id == 20 ) :
    	$title = 'Formations';
	else : 
		$title = 'Actualités';
    endif;

	// Query
	if ( $cat_id == 16 || $cat_id == 20 || $cat_id == 19 ) :
		
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
	else :	
		$args_category = array(
			'post_status' => 'publish',
			'post_type' => 'post',
			'cat' => $cat_id,
			'posts_per_page' => $cat_ppp
		);	

		// Total posts
		$args_count = array(
			'post_status' => 'publish',
			'post_type' => 'post',
			'cat' => $cat_id 
		);
	endif;
	// Data query
	$query_category = new WP_Query( $args_category );
	// Count
	$posts_count = new WP_Query( $args_count );
	$total_post_count = $posts_count->found_posts;
?>

<section class="wrap-main actualites">

  <header class="header-bloc--page">
  	<div class="header-bloc__content">

	    <h1 class="h1">
			<?php echo $title; ?>
	    </h1>
    </div>
  </header>

	<div class="fluxi-content" <?php echo ' data-totalposts="'.$total_post_count.'"'; ?>>
		<div class="fluxi-wrap">
			<?php
			if ( $query_category->have_posts() ) :
				while ( $query_category->have_posts() ) : $query_category->the_post();

					// Thumb	
					$main_img_add = get_field( 'add_image' );
					if ($loop==0 || $loop==5) {
						$imgSize = 'post-thumb';
					} else {
						$imgSize = 'card--mini';
					}
					
					if ( has_post_thumbnail() && $main_img_add == 0) :
						$news_img_id = get_post_thumbnail_id();
						$news_img_array = wp_get_attachment_image_src($news_img_id, $imgSize, true);
						$news_img_url = $news_img_array[0];
						$news_img = '<img class="img-reponsive" src="'.$news_img_url.'">';
					elseif($main_img_add == 1):
						$main_image_obj = get_field( 'main_image' );
						$news_img = '<img class="img-reponsive '.$imgSize.'" src="'.$main_image_obj['sizes'][$imgSize].'">';
					endif;

					if($cat_id == 16 || $cat_id == 20):
						$date_news = date_i18n('d M', strtotime(get_field('date_event')));
					else:
						$date_news = get_the_time('d M');
					endif;

					$newsClass = 'card-news inverse-m';

					if ($loop==0) {
						$newsClass = 'card-news--expand';
					} else if ($loop ==1) {
						echo '<div class="wrap-pad js-inject-news">';
					} else if ($loop==5) {
						$newsClass = 'card-news--big';
						//include( TEMPLATEPATH.'/app/inc/category-more.php' );
					} else if ($loop > 5) {
						$newsClass = 'card-news';
					}
					?>

	                  <a class="<?php echo $newsClass; ?>" href="<?php echo the_permalink(); ?>">
	                  	<article>
		                  	<div class="card__img">
		                      	<?php echo $news_img; ?>
		                  	</div>
		                    <div class="card__infos">
		                      	<span class="tag is-inactive"><?php echo $date_news; ?></span>
		                      	<h1 class="card__title"><?php echo the_title(); ?></h1>
		                    </div>
	                    </article>
	                  </a>

					<?php
				$loop++;
				endwhile;
				
			else:				
		
				
				echo '<article class="wrap-n">';	
					if($cat_id == 16):
						echo '<h2 class="description">Il n\'y a pas d\'événements à venir pour le moment.</h2>';
					elseif($cat_id == 19):
						echo '<h2 class="description">Il n\'y a pas d\'ateliers à venir pour le moment.</h2>';
					elseif($cat_id == 20):
						echo '<h2 class="description">Il n\'y a pas de formations à venir pour le moment.</h2>';
					else:
						echo '<h2 class="description">Il n\'y a pas d\'articles pour le moment.</h2>';
					endif;
				echo '</article>';
			

			endif;
			wp_reset_postdata();
			?>
       </div>

       <?php if($total_post_count > $cat_ppp): ?>
	       <div class="wrap-l al-c">
	       		<button type="button" class="button green js-more" data-cat="<?php echo $cat_id;?>">Charger plus</button>
	       </div>
       <?php endif; ?>	
	</div>
	

</section>
<?php get_footer(); ?>
