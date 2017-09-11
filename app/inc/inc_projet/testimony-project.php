<h3 class="h3">Message du porteur de projet</h3>
        
<div class="testimony">
	<div class="box-asy__left">															
		<img src="<?php echo $portrait_pdp['sizes']['thumbnail']; ?>" alt="<?php echo get_field('prenom') . ' ' . get_field('nom'); ?>">
		<h4 class="clone"><?php echo get_field('prenom') . ' ' . get_field('nom'); ?></h4>
	</div>
	<div class="box-asy__right">
        <?php if(!empty(get_field('temoignage'))):?> 				
			<p><?php echo get_field('temoignage'); ?></p>
        <?php endif; ?>  
        <h4><?php echo get_field('prenom') . ' ' . get_field('nom'); ?></h4>
	</div>									
</div>