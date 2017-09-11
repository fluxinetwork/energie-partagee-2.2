<div class="map-holder wrap-extend">
  <div class="spinner bg-spin"></div>
  <div id="map" data-lat="<?php echo $latitude; ?>" data-lon="<?php echo $longitude; ?>" data-cat="<?php echo $taxoslug; ?>" data-title="<?php the_title(); ?>"></div>
  <div class="holder-card">
    <div class="p-details">
        <div class="p-details__nrg"><i class="icon-<?php echo $taxoslug;?>_100"></i></div>
        <ul class="p-details__infos">
          <li class="p-details__infos__loca">
							<strong><?php echo get_field('ville'); ?></strong>
              <span><?php echo get_field('departement'); ?></span>
          </li>
          <li class="p-details__infos__prod">
              <strong><?php echo get_field('equivalent_unites_puissance') . ' ' . get_field('type_unite_de_puissance'); ?></strong>
              <span><?php echo get_field('production') . ' ' . get_field('unite_production'); ?></span>
          </li>
        </ul>

        <p class="p-details__equi p-ss">Produit la consommation annuelle de <?php echo get_field('equivalent_production'); ?> foyers.</p>
    </div>

  </div>
</div>
