<?php get_header(); ?>

	<section class="section header-bloc--home">
    	<article class="header-bloc__content">
            <h1 class="h1">L'énergie par les citoyens,<br>pour les citoyens</h1>

            <?php if( have_rows('chiffres_cles', 'option') ): ?>

                <ul class="key-nums">
                <?php while( have_rows('chiffres_cles', 'option') ): the_row(); ?>
                    
                    <li class="key-nums__item">
                        <span class="key-nums__item__num" data-number="<?php the_sub_field('chiffre_cle'); ?>">-</span>
                        <span class="key-nums__item__txt"><?php the_sub_field('texte_cle'); ?></span>
                    </li>

                <?php endwhile; ?>
                </ul>
            <?php endif; ?>           

            <div class="lightvideo"><a href="" data-src="https://www.youtube.com/watch?v=KGZhsemH57Y" class="button cta"><i class="icon-video_20"></i> Comprendre notre action</a></div>
        </article>
	</section>
    
    <?php include( TEMPLATEPATH.'/app/inc/inc_projet/sticky-post.php' ); ?>
    
    <section class="section wrap-l steps-intro">
        <h5 class="s-title">Énergie partagée en 3 étapes</h5>
        
        <?php if( have_rows('ep_3_steps', 'option') ): ?>

            <ul class="box box-flex">  

                <?php while( have_rows('ep_3_steps', 'option') ): the_row(); ?>                    
                    
                    <li class="box__item">
                        <div class="box__item__img"><img src="<?php the_sub_field('illustration_etape'); ?>"></div>
                        <span class="box__item__infos">
                            <p class="p-ss"><?php the_sub_field('texte_etape'); ?></p>       
                            <a class="f-btn" href="<?php the_sub_field('page_reliee'); ?>"><i class="icon-chevronright_32"></i><div><span class="txt"><?php the_sub_field('texte_lien'); ?></span></div></a>
                        </span> 
                    </li>

                <?php endwhile; ?>

            </ul> 

        <?php endif; ?>    

    </section>
    
    <?php include( TEMPLATEPATH.'/app/inc/inc_projet/trio-projects.php' ); ?>
    
    <?php include( TEMPLATEPATH.'/app/inc/inc_projet/duo-news.php' ); ?>
    
    <?php include( TEMPLATEPATH.'/app/inc/inc_projet/court-circuit.php' ); ?>
    
    <?php include( TEMPLATEPATH.'/app/inc/inc_projet/top-credibility.php' ); ?>        

<?php get_footer(); ?>