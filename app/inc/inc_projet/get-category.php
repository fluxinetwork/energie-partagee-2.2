<?php
	$loop = 0;
?>

<section class="wrap-main actualites">

	 

  <header class="header-bloc--page">
  	<div class="header-bloc__content">
		<?php custom_breadcrumbs(); ?>

	    <h1 class="h1">
			<?php the_title(); ?>
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
				if( have_rows('elements_page') ):
					echo '<article class="wrap-n fluxi-content--cat">';
						require_once locate_template('/app/inc/inc_projet/fluxi-content/builder.php');
					echo '</article>';
		
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

			endif;
			wp_reset_postdata();
			?>
       </div>

       <?php if($total_post_count > $cat_ppp && $cat_id != 20): ?>
	       <div class="wrap-l al-c">
	       		<button type="button" class="button green js-more" data-cat="<?php echo $cat_id;?>">Charger plus</button>
	       </div>
       <?php endif; ?>
	<?php
		if( have_rows('elements_page') && $total_post_count > 0):
			echo '<article class="wrap-n fluxi-content--cat">';
				//require_once locate_template('/app/inc/inc_projet/fluxi-content/builder.php');
				the_content();
			echo '</article>';
		endif;			
	?>
	</div>
	

</section>