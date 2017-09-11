<?php
	if(have_rows('bloc_publication')):	
		while( have_rows('bloc_publication') ): the_row(); 
			$image_publication = get_sub_field('image_publication');
			$titre_publication = get_sub_field('titre_publication');
			$descriptif_publication = get_sub_field('descriptif_publication');
			$url_publication = get_sub_field('url_publication');
			?>
			
			<article class="wrap-publication">
				<div class="publication">
					<div class="box-asy__left">
						<img alt="<?php echo $titre_publication; ?>" src="<?php echo $image_publication['sizes']['medium']; ?>" class="img_med">
					</div>
					<div class="box-asy__right">
						<h4><?php echo $titre_publication; ?></h4>
						<p><?php echo $descriptif_publication; ?></p>
						
					</div>
				</div>
				<a target="_blank" title="Consulter la publication" href="<?php echo $url_publication; ?>" class="f-btn--big">
				<i class="icon-download_64"></i>
				<div>
					<span class="txt">Consulter la publication</span>
				</div>
			</a>
			</article>

			<?php							 
		endwhile; 
	endif;	
?>
   


