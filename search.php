<?php
/**
 * Search Results Template File
 *
 */
?>
<?php 
get_header();
$count = $wp_query->found_posts;
?>

<section class="wrap-main">
	<header class="header-bloc--page <?php if($count==0) { echo 'no-result'; } ;?>">
        <div class="header-bloc__content">
          <ul class="tags">     
              <li class="tag">Recherche</li>
              <li class="tag is-inactive"><?php echo get_search_query(); ?></li>     
          </ul>   

          <h1 class="h1">
             <?php 
                 $several = ($count<=1) ? '' : 's'; //pluriel
              
                 if ($count>0) : $output =  $count.' résultat'.$several;
                 else : $output = 'Aucun résultat';
                 endif;

                 echo $output;
               ?>        
          </h1>
        </div>
	</header>
  
	<?php if ( have_posts() ) : ?>    
    <article class="fluxi-content has-bg wrap-search fluxi-wrap">    
      <div id="search-filters" class="filtres wrap-extend">
        <h5 class="h5">Filtrer les résultats</h5>
        
         <!--<select class="postform" id="filter" name="filter">
            <option value="cat=-1">Aucun filtre</option>
            <option value="cpt=page">Pages</option>
            <option value="cpt=projets">Projets</option>
            <option value="cat=15">Actualités</option>            
            <option value="cat=16">Evènements</option>
            <option value="cat=20">Formations</option>
            <option value="cat=17">Presse</option>            
        </select> -->  
        
        <select class="postform" id="filter" name="filter">
            <option value="-1">Aucun filtre</option>
            <option value="page">Pages</option>
            <option value="projets">Projets</option>
            <option value="15">Actualités</option>            
            <option value="16">Evènements</option>
            <option value="20">Formations</option>
            <option value="17">Presse</option>            
        </select>  
        
      </div> 

    	<ul class="searchresults">
      	<?php while ( have_posts() ) : the_post(); 
          $post_id = $post->ID;
  				$the_post_type = get_post_type($post_id);	
  				$category_detail=get_the_category($post_id);
  				$cat_count=0;		
  			?>
        	<li class="searchresults__item">
              <ul class="tags">
                <?php   
                  // Post type
                  if($the_post_type == 'page'):
                    echo '<li class="tag"><a href="'.get_the_permalink().'">Page</a></li>';                          
                  elseif($the_post_type == 'projets'):
                    echo '<li class="tag"><a href="'.get_the_permalink(357).'">Projets</a></li>';                              
                  endif;  
    
                  // Show category and link it                            
                  foreach($category_detail as $cd){
                      $cat_count++;               
                      $cat_name = $cd->cat_name;
                      $cat_link = get_category_link( $cd->term_id );
      
                      //($cat_count > 1) ? print ', '  : '';
      
                      echo '<li class="tag"><a href="'.esc_url( $cat_link ).'" title="'.$cat_name.'">';           
                          echo $cat_name;           
                      echo '</a></li>';                
                  }
                ?>           
                <li class="tag is-inactive">
                  <time datetime="<?php the_time('Y-m-d'); ?>"><?php the_time('l d F'); ?></time>
                </li>
              </ul>  

              <a class="searchresults__link" href="<?php the_permalink(); ?>">            
                  <h3 class="searchresults__title"><?php the_title(); ?></h3>
              </a>   

              <?php 
			       
                // Description       
      			if( get_field('google_description') ) : 
      					echo '<p>'.get_field('google_description').'</p>';
      			endif;
			
              ?>
            </li>       
          
      	<?php endwhile; ?>   
      </ul>
        <?php
            $big = 999999999;
            echo '<div class="s-pagination">';
    				echo paginate_links( array(
    					'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
    					'format' => '?paged=%#%',
    					'current' => max( 1, get_query_var('paged') ),
    					'total' => $wp_query->max_num_pages,
              'prev_next'=> false
    				) );
            echo '</div>';
			?>
      <?php
      else : 
        include( TEMPLATEPATH.'/app/inc/inc_projet/duo-news.php' );
        include( TEMPLATEPATH.'/app/inc/inc_projet/top-credibility.php' );

      endif;
      ?>
    	</article>    
    </section>
<?php get_footer(); ?>
