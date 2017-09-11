<?php
$args_news = array(
	'post_type' => 'post',
	'post_status' => 'publish',
	'posts_per_page' => 2,
	'cat' => 15,
	'ignore_sticky_posts' => 1
);
$query_news = new WP_Query( $args_news );
?>

	<section class="section duo-card">
    	<div class="wrap-n">
        	<div class="box head__flex">
            	<div class="box__half">
            		<h5 class="s-title">Nos actualités</h5>
            	</div>
            	<div class="box__half">
                    <span class="lighter">Suivez-nous sur</span> 
                    <ul class="social news">
                      <li><a href="https://www.facebook.com/EnergiePartagee.org" class="social--face" target="_blank"><i class="icon-facebook_40"></i></a></li>
                       <li><a href="https://twitter.com/EnergiePartagee" class="social--twit" target="_blank"><i class="icon-twitter_40"></i></a></li>
                   </ul> 
           	  </div>
             	<div class="box__fixe"></div>
        	</div>
       
           <div class="box">
           <?php					
					if ( $query_news->have_posts() ) :
						while ( $query_news->have_posts() ) : $query_news->the_post();						
							
							// Thumb	
							$main_image_obj = get_field( 'main_image' );
							$news_img ='';
						
							if ( has_post_thumbnail() && empty($main_image_obj)) :
								$post_img_id = get_post_thumbnail_id();
								$post_img_array = wp_get_attachment_image_src($post_img_id, 'card--full', true);
								$post_img_url = $post_img_array[0];
						
								$news_img = '<img class="img-reponsive" src="'.$post_img_url.'">';
							elseif(!empty($main_image_obj)):
						
								$news_img = '<img class="img-reponsive" src="'.$main_image_obj['sizes']['card--full'].'">';
							endif;		
							
							// date
							$date_news = get_the_time('d M');                         
							
							?>
                            
                          <article class="box__half">
                              <a class="card card-news" href="<?php echo the_permalink(); ?>">
                                	 <div class="card__img">
                                   	<?php echo $news_img; ?>
                                  </div>
                                  <div class="card__infos">
                                   	<span class="tag is-inactive"><?php echo $date_news; ?></span>
                                   	<h1 class="card__title"><?php echo the_title(); ?></h1>
                                  </div>
                               </a>
                          </article>
                            
                  	<?php
				  
				            
						endwhile;
					endif;
					wp_reset_postdata();
				?>
                
                <div class="box__fixe"> 
                    <a class="button-round grey" href="<?php echo get_bloginfo ('url').'/nous-suivre/actualites/'; ?>"><i class="icon-plus_64"></i></a> 
                </div>
           </div>
       </div>
    </section>    