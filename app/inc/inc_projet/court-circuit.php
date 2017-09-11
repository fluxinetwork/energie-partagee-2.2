
<?php if(is_home()){ echo '<article class="wrap-courtcircuit">'; }else{ echo '<aside class="wrap-courtcircuit">';}?>

  <img class="img-svg courtcircuit__logo" src="<?php echo get_template_directory_uri(); ?>/app/img/courtcircuit.svg">
  
  <div class="courtcircuit">
    <div class="box-asy__left">
      <h6 class="courtcircuit__text">Abonnez-vous à Court-Circuit, la newsletter d’Energie Partagée.</h6>
    </div>
    
    <div class="box-asy__right">
      <form class="miniform" method="post" action="http://ymlp.com/subscribe.php?id=gbuyheegmgb" target="_blank">
        <input class="miniform__input" name="YMP0" id="courtcircuit_contact" type="email" value="" placeholder="Votre email" required aria-required="true">
        <button type="submit" class="miniform__submit"><i class="icon-check_64"></i></button>
      </form>
    </div>
  </div>

  <div class="form-sublink">
    <div class="wrap-link">
      <a href="<?php echo get_permalink(334); ?>" class="f-btn">
        <i class="icon-chevronright_32"></i>
        <div>
          <span class="txt">Voir tous les numéros</span>
        </div>
      </a>
    </div>
  </div>

</<?php if(is_home()){ echo 'article'; }else{ echo 'aside';}?>>
