<nav class="nav is-hidden">

  <ul class="nav__primary no-pp">
  
    <?php if ( is_user_logged_in() ) :  ?>
      <li class="nav__item"><span class="nav__item__title">Espace adhérents</span>
        <ul class="nav__dropdown">
          <span class="container">              
            <?php 
              wp_list_pages( array(
                'title_li' => '',
                'depth'    => 1,
                'child_of' => get_id_by_slug('espace-adherents')
              ));
            ?>
          </span>
        </ul>
      </li>
    <?php endif; ?>

    <?php
    $main_menus = get_field('main_menu', 'option');
    if( $main_menus ): 
      foreach( $main_menus as $post_object):    
        $main_page_id = $post_object['main_page'];
        ?>
        <li class="nav__item"><span class="nav__item__title"><?php echo get_the_title($main_page_id); ?></span>
          <ul class="nav__dropdown">
            <span class="container">
              
              <?php 
                 wp_list_pages( array(
                    'title_li'    => '',
                    'depth'    => 1,
                    'child_of'    => $main_page_id
                ) );
              ?>

            </span>
          </ul>
        </li>      
      <?php 
      endforeach;    
    endif;
    ?>
  </ul>

  
  <?php    
  $secondary_menus = get_field('secondary_menu', 'option');
  if( $secondary_menus ):
    echo '<ul class="nav__secondary no-pp"> ';
      foreach( $secondary_menus as $post_object):    
        $main_page_id = $post_object['main_page'];
        ?>
        <li class="nav__item"><span class="nav__item__title"><?php echo get_the_title($main_page_id); ?></span>
          <ul class="nav__dropdown">
            <span class="container">
              <?php 
                 wp_list_pages( array(
                    'title_li'    => '',
                    'depth'    => 1,
                    'child_of'    => $main_page_id
                ) );
              ?>
            </span>
          </ul>
        </li>      
      <?php 
      endforeach; 
    echo '</ul>';  
  endif;
  ?>
 

  <div class="nav__pp">
    <button type="button" class="hamburger js-toggle-pp icon-hamburger_32"></button>
    <ul class="pp">
    </ul>
  </div>
</nav>
<div class="navbar__id">
  <a class="logo" href="<?php echo get_site_url(); ?>">
    <div class="logo__img">
      <img src="<?php echo get_template_directory_uri(); ?>/app/img/logo-illu-energie-partagee.png">
    </div>
    <div class="logo__title">
      <img src="<?php echo get_template_directory_uri(); ?>/app/img/logo-energie-partage.svg">    
    </div>
  </a>
  <ul class="navbar__id__social">
    <li><a href="https://www.facebook.com/EnergiePartagee.org" class="social--face" target="_blank"><i class="icon-facebook_26"></i></a></li>
    <li><a href="https://twitter.com/EnergiePartagee" class="social--twit" target="_blank"><i class="icon-twitter_26"></i></a></li>
    <li><a href="https://www.youtube.com/user/EnergiePartagee" class="social--yout" target="_blank"><i class="icon-youtube_26"></i></a></li>
  </ul>  
</div>
<form method="get" id="nav__search" class="nav__search" action="<?php bloginfo('url'); ?>/">
  <label class="is-hidden" for="s"><?php _e('Recherche :'); ?></label>
    <input type="text" class="nav__search__input js-search-input" value="<?php if (is_search()) : the_search_query(); endif; ?>" name="s" id="s" placeholder="Rechercher">
    <button type="submit" class="nav__search__submit icon-check_32 nav-bt" value="" id="nav__search__submit"></button>
    <button type="button" class="nav-bt nav__search__close js-toggle-search icon-close_32"></button>
</form>
<div class="navbar__buttons">
  <button type="button" class="nav-bt js-toggle-search icon-search_32"></button>
  <div class="connexion">
    <?php if (is_user_logged_in()) : $url = wp_logout_url(home_url()); ?>
      <a href="<?php echo $url; ?>/wp-login.php" class="nav-bt--txt icon-logout_32"><span>Déconnexion</span></button>
    <?php else : ?>
      <a href="#" class="js-choose-connexion nav-bt--txt icon-login_32"><span>Connexion</span></a>
    <?php endif; ?>
    <div class="connexion_adherents">
      <span>
        <p class="p-ss">Énergie Partagée Association</p>
        <a href="<?php bloginfo('url') ?>/wp-login.php" class="button cta">Accès adhérent</a>
      </span>
    </div>
    <div class="connexion_actionnaires">
      <span>
        <button class="js-close-connect nav-bt icon-close_32"2></button>
        <p class="p-ss">Énergie Partagée Investissement</p>
        <a href="https://je-souscris.energie-partagee.org/Security/login" class="button cta">Accès actionnaire</a>
      </span>
    </div>
  </div>
</div>
