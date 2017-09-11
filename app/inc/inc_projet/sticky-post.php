<?php
$sticky = get_option( 'sticky_posts' );
$args_sticky = array(
	'posts_per_page' => 1,
	'post_status' => 'publish',
	'post__in'  => $sticky,
	'ignore_sticky_posts' => 1
);
$query_sticky = new WP_Query( $args_sticky );
if ( isset($sticky[0]) ):
	if ( $query_sticky->have_posts() ) : while ( $query_sticky->have_posts() ) : $query_sticky->the_post(); ?>

        <section class="wrap-bg highlight">
            <article class="wrap-n">
                <h6 class="lighter">Actualité importante</h6>
                <h1 class="h1"><?php the_title(); ?></h1>
                <div class="box">
                    <div class="box__solo">
                    <p class="highlight-txt">
                        <?php echo get_field('google_description'); ?>
                    </p>
                   </div> 
                    <div class="box__fixe"><a class="button-round" href="<?php the_permalink(); ?>"><i class="icon-fleche_64"></i></a></div>
                </div>            
            </article>
        </section>
    
	<?php endwhile; endif; wp_reset_postdata(); ?>
<?php endif; ?>