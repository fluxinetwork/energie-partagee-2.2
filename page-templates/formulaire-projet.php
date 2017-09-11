<?php
/*
Template Name: Formulaire projets
*/
?>
<?php get_header(); ?>

<section class="wrap-main">
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post();

  $main_img_add = get_field( 'add_image' );
  $main_image ='';

  if ( has_post_thumbnail() && $main_img_add == 0) :
    $post_img_id = get_post_thumbnail_id();
    $post_img_array = wp_get_attachment_image_src($post_img_id, 'large', true);
    $post_img_url = $post_img_array[0];

    $main_image = '<div class="wrap-extend"><img class="img-responsive" src="'.$post_img_url.'"></div>';
  elseif($main_img_add == 1):
    $main_image_obj = get_field( 'main_image' );
    $main_image = '<div class="wrap-extend"><img class="img-responsive" src="'.$main_image_obj['url'].'"></div>';
  endif;
  
  

  ?>
  <header class="header-bloc--page">
    <div class="header-bloc__content">
      <?php custom_breadcrumbs(); ?>
      
      <h1 class="h1 wrap-n">
        <?php the_title(); ?>
      </h1>
    </div>
  </header>
  <?php endwhile; endif; ?>

  <article class="fluxi-wrap has-bg fluxi-content">

      <?php 
        get_description();
        get_socials();
      ?>

        <form class="cmxform" action="" method="post" name="soumettre_projet" id="soumettre_projet" enctype="multipart/form-data">
          <fieldset id="form-part-1">
            <legend class="section-title h3">Le projet en bref</legend>

            <p>
              <label for="nom_projet">Nom de votre projet<abbr class="require-form" title="obligatoire">*</abbr></label>
              <input name="nom_projet" id="nom_projet" type="text" value="<?php if(!empty($_SESSION['nom_projet'])) echo $_SESSION['nom_projet']; ?>" required>
            </p>

            <p>
              <label for="source_energie">Source d’énergie<abbr class="require-form" title="obligatoire">*</abbr></label>
              <span class="wrap-input-select--left">
                <span class="fakeInput"></span>
                <select name="source_energie" id="source_energie" required>
                  <option value="">Sélectionnez</option>
                  <option value="8">Biomasse</option>
                  <option value="12">Économies d'énergie</option>
                  <option value="13">Éolien</option>
                  <option value="6">Géothermie</option>
                  <option value="5">Micro-hydroélectricité</option> 
                  <option value="9">Réseau de chaleur</option>            
                  <option value="2">Solaire photovoltaïque</option>
                  <option value="3">Solaire thermique</option>
                  <option value="14">Autre</option>
                </select>
              </span>
              <input class="sub-hide-item" name="source_energie_detail" id="source_energie_detail" type="text" placeholder="Si autre, précisez" value="<?php if(!empty($_SESSION['source_energie_detail'])) echo $_SESSION['source_energie_detail']; ?>" disabled>
              <label for="source_energie" class="error"></label>
            </p>
            
            <p>
              <label for="adresse_projet">Adresse du projet</label>
              <input name="adresse_projet" id="adresse_projet" type="text" value="<?php if(!empty($_SESSION['adresse_projet'])) echo $_SESSION['adresse_projet']; ?>" >
            </p>
            
            <span class="flex-inputs flex-inputs--miniLeft">
              <div class="flex-inputs__margin"></div>

              <p>
                <label for="code_postal">Code postal<abbr class="require-form" title="obligatoire">*</abbr></label>
                <input name="code_postal" id="code_postal" type="text" value="<?php if(!empty($_SESSION['code_postal'])) echo $_SESSION['code_postal']; ?>" required>
              </p>

              <p>
                <label for="ville_projet">Ville du projet<abbr class="require-form" title="obligatoire">*</abbr></label>
                <input name="ville_projet" id="ville_projet" type="text" value="<?php if(!empty($_SESSION['ville_projet'])) echo $_SESSION['ville_projet']; ?>" required>
              </p>
            </span>

            <p>
              <label for="resum_description_projet">Votre projet en une phrase<abbr class="require-form" title="obligatoire">*</abbr></label>
              <textarea name="resum_description_projet" id="resum_description_projet" placeholder="Cette présentation courte servira à présenter votre projet sur le site internet." required><?php if(!empty($_SESSION['resum_description_projet'])) echo $_SESSION['resum_description_projet']; ?></textarea>
            </p>
          </fieldset>

          <fieldset id="form-part-2">
            <legend class="section-title h3">Personne contact du projet</legend>

            <span class="flex-inputs">
              <div class="flex-inputs__margin"></div>

              <p>
                <label for="nom_contact">Nom<abbr class="require-form" title="obligatoire">*</abbr></label>
                <input name="nom_contact" id="nom_contact" type="text" value="<?php if(!empty($_SESSION['nom_contact'])) echo $_SESSION['nom_contact']; ?>" required>
              </p>

              <p>
                <label for="prenom_contact">Prénom<abbr class="require-form" title="obligatoire">*</abbr></label>
                <input name="prenom_contact" id="prenom_contact" type="text" value="<?php if(!empty($_SESSION['prenom_contact'])) echo $_SESSION['prenom_contact']; ?>" required>
              </p>

            </span>

            <p>
              <label for="adresse_contact">Adresse</label>
              <input name="adresse_contact" id="adresse_contact" type="text" value="<?php if(!empty($_SESSION['adresse_contact'])) echo $_SESSION['adresse_contact']; ?>" >
            </p>

            <span class="flex-inputs flex-inputs--miniLeft">
              <div class="flex-inputs__margin"></div>

              <p>
                <label for="code_postal_contact">Code Postal</label>
                <input name="code_postal_contact" id="code_postal_contact" type="text" value="<?php if(!empty($_SESSION['code_postal_contact'])) echo $_SESSION['code_postal_contact']; ?>" >
              </p>

              <p>
                <label for="ville_contact">Ville</label>
                <input name="ville_contact" id="ville_contact" type="text" value="<?php if(!empty($_SESSION['ville_contact'])) echo $_SESSION['ville_contact']; ?>" >
              </p>

            </span>

            <p>
              <label for="email_contact">Email<abbr class="require-form" title="obligatoire">*</abbr></label>
              <input name="email_contact" id="email_contact" type="email" value="<?php if(!empty($_SESSION['email_contact'])) echo $_SESSION['email_contact']; ?>" required>
            </p>

            <span class="flex-inputs">
              <div class="flex-inputs__margin"></div>

              <p>
                <label for="tel_1_contact">Téléphone 1<abbr class="require-form" title="obligatoire">*</abbr></label>
                <input name="tel_1_contact" id="tel_1_contact" type="text" value="<?php if(!empty($_SESSION['tel_1_contact'])) echo $_SESSION['tel_1_contact']; ?>" required>
              </p>

              <p>
                <label for="tel_2_contact">Téléphone 2</label>
                <input name="tel_2_contact" id="tel_2_contact" type="text" value="<?php if(!empty($_SESSION['tel_2_contact'])) echo $_SESSION['tel_2_contact']; ?>">
              </p>
            </span>

            <p>
              <label for="connu_comment">Comment avez-vous connu Energie Partagée ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <label for="connu_rad_1" class="block">
                <input type="radio" name="connu_comment" value="Réseau ou autre projet" id="connu_rad_1" required >
                <span class="radio__label">Réseau ou autre projet</label>
              <label for="connu_rad_2" class="block">
                <input name="connu_comment" type="radio" value="Bouche à oreille" id="connu_rad_2" >
                <span class="radio__label">Bouche à oreille</span></label>
              <label for="connu_rad_3" class="block">
                <input name="connu_comment" type="radio" value="Presse" id="connu_rad_3" >
                <span class="radio__label">Presse</span></label>
              <label for="connu_rad_4" class="block">
                <input name="connu_comment" type="radio" value="Internet" id="connu_rad_4" >
                <span class="radio__label">Internet</span></label>
              <label for="connu_rad_5" class="block">
                <input name="connu_comment" type="radio" value="Interventions publiques" id="connu_rad_5" >
                <span class="radio__label">Interventions publiques</span></label>
              <label for="connu_rad_6" class="block">
                <input name="connu_comment" type="radio" value="Autres" id="connu_rad_6" >
                <span class="radio__label">Autre</span></label>
              <input class="sub-hide-item" name="connu_autre" type="text" placeholder="Si  autre, précisez" value="<?php if(!empty($_SESSION['connu_autres'])) echo $_SESSION['connu_autres']; ?>" id="connu_autre" >
              <label for="connu_comment" class="error"></label>
            </p>

            <p>
              <label for="collectif">Représentez-vous un collectif, une association, une société de projet pour ce projet ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <label for="collectif_1" class="block">
                <input name="collectif" type="radio" value="Collectif" id="collectif_1" required >
                  <span class="radio__label">Collectif</span></label>
              <label for="collectif_2" class="block">
                <input name="collectif" type="radio" value="Association" id="collectif_2" >
                  <span class="radio__label">Association</span></label>
              <label for="collectif_3" class="block">
                <input name="collectif" type="radio" value="Société de projet" id="collectif_3" >
                  <span class="radio__label">Société de projet</span></label>
              <label for="collectif_4" class="block">
                <input name="collectif" type="radio" value="Autres" id="collectif_4" />
                  <span class="radio__label">Autre</span></label>
              <label for="collectif" class="error"></label>
              <input class="sub-hide-item" id="autre_collectif" name="autre_collectif" type="text" placeholder="Si autre, précisez" value="<?php if(!empty($_SESSION['autre_collectif'])) echo $_SESSION['autre_collectif']; ?>" >
              <input name="nom_collectif" type="text" placeholder="Quel est son nom ?" value="<?php if(!empty($_SESSION['nom_collectif'])) echo $_SESSION['nom_collectif']; ?>" >
            </p>
          </fieldset>

          <fieldset id="form-part-3">
            <legend class="section-title h3">Détails du projet</legend>

            <h4 class="h4">Contexte local</h4>

            <p>
              <label for="description_territoire">Décrivez le territoire sur lequel vous souhaitez implanter le projet ? </label>
              <textarea name="description_territoire" id="description_territoire" placeholder="Exemple : Urbain /rural, niveau social, dynamiques et spécificités locales..."><?php if(!empty($_SESSION['description_territoire'])) echo $_SESSION['description_territoire']; ?></textarea>
            </p>

            <p>
              <label for="origine_projet">Comment est né le projet (origine, raisons) ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <textarea name="origine_projet" id="origine_projet" placeholder="Quelles sont les valeurs qui guident votre projet ?" required><?php if(!empty($_SESSION['origine_projet'])) echo $_SESSION['origine_projet']; ?></textarea>
            </p>

            <p>
              <label for="description_projet">Décrivez votre projet<abbr class="require-form" title="obligatoire">*</abbr></label>
              <textarea name="description_projet" id="description_projet" placeholder="Ici, vous pouvez détailler..." required><?php if(!empty($_SESSION['description_projet'])) echo $_SESSION['description_projet']; ?></textarea>
            </p>

            <p>
              <label for="stade_projet">A quel stade du projet en êtes vous ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <label for="stade_projet_1" class="block">
                <input name="stade_projet" type="radio" value="idee" id="stade_projet_1" >
                <span class="radio__label">Idée</span></label>
              <label for="stade_projet_2" class="block">
                <input name="stade_projet" type="radio" value="structuration" id="stade_projet_2" >
                <span class="radio__label">Structuration</span></label>
              <label for="stade_projet_3" class="block">
                <input name="stade_projet" type="radio" value="etudes" id="stade_projet_3" >
                <span class="radio__label">Études</span></label>
              <label for="stade_projet_4" class="block">
                <input name="stade_projet" type="radio" value="autorisations" id="stade_projet_4" >
                <span class="radio__label">Autorisations</span></label>
              <label for="stade_projet_5" class="block">
                <input name="stade_projet" type="radio" value="realisation" id="stade_projet_5" >
                <span class="radio__label">Réalisation</span></label>
              <label for="stade_projet_6" class="block">
                <input name="stade_projet" type="radio" value="fonctionnement" id="stade_projet_6" >
                <span class="radio__label">Fonctionnement</span></label>
              <label for="stade_projet" class="error"></label>
            </p>
            
            <!-- *************************** Conditions --> 
            <!-- *************************** Conditions --> 
            <!-- *************************** Conditions --> 
            <!-- *************************** Conditions -->
            <p class="hide-item item-1-6"><label for="entite_porteuse">Y a t-il une entité porteuse du projet ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <label for="entite_porteuse_1" class="block">
                <input class="item-1-6" name="entite_porteuse" type="radio" value="non" id="entite_porteuse_1" disabled>
                 <span class="radio__label">Non</span></label>
              <label for="entite_porteuse_2" class="block">
                <input class="item-1-6" name="entite_porteuse" type="radio" value="oui" id="entite_porteuse_2" disabled>
                 <span class="radio__label">Oui</span></label>
              <input class="item-1-6 sub-hide-item" name="nom_entite_porteuse" type="text" placeholder="Quel est son nom ?" value="<?php if(!empty($_SESSION['nom_entite_porteuse'])) echo $_SESSION['nom_entite_porteuse']; ?>" id="nom_entite_porteuse" disabled>
              <label class="error" for="entite_porteuse"></label>
            </p>
            <p class="hide-item item-1-4">
              <label for="principales_contrainte">Avez-vous déjà identifié les principales contraintes et atouts du projet ?</label>
              <textarea class="item-1-4" name="principales_contrainte" id="principales_contrainte" placeholder="Exemple : soutien politique, potentiel local, dynamique citoyenne..." disabled><?php if(!empty($_SESSION['principales_contrainte'])) echo $_SESSION['principales_contrainte']; ?></textarea>
            </p>
            <h4 class="hide-item item-1-6 h4">Production</h4>
            <p class="hide-item item-1-6 type-non-eco-energ">
              <label for="puissance_prevue">Puissance prévue ou installée ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <span class="wrap-input-select">
                <input class="item-1-6" name="puissance_prevue" id="puissance_prevue" type="text" value="<?php if(!empty($_SESSION['puissance_prevue'])) echo $_SESSION['puissance_prevue']; ?>" required disabled>
                <select class="item-1-6" name="unite_energie" id="unite_energie" disabled>
              <?php
        $field_key = "field_53a9b0af72e19";
        $field = get_field_object($field_key);
        
        if( $field )
        {         
          foreach( $field['choices'] as $k => $v )
          {
            echo '<option value="' . $k . '">' . $v . '</option>';
          }         
        }
        ?>   
                </select>
              </span>
              <label for="puissance_prevue" class="error"></label>
            </p>
            <p class="hide-item item-1-6 type-non-eco-energ">
              <label for="unites_production">Nombre d'unités de production<abbr class="require-form" title="obligatoire">*</abbr></label>
              <span class="wrap-input-select">
                <input class="item-1-6" name="unites_production" id="unites_production" type="text" placeholder="Ex : 25" value="<?php if(!empty($_SESSION['unites_production'])) echo $_SESSION['unites_production']; ?>" required disabled>
                <select class="item-1-6" name="unite_production" id="unite_production" disabled>
                <?php
        $field_key = "field_53a9af1e525f3";
        $field = get_field_object($field_key);
        
        if( $field )
        {         
          foreach( $field['choices'] as $k => $v )
          {
            echo '<option value="' . $k . '">' . $v . '</option>';
          }         
        }
        ?>
                </select>
              </span>
              <label for="unites_production" class="error"></label>
            </p>
            <p class="hide-item item-1-6 type-non-eco-energ">
              <label for="objectif_production">Objectif de production annuelle</label>
              <span class="wrap-input-select">
                <input class="item-1-6" name="objectif_production" id="objectif_production" type="text" value="<?php if(!empty($_SESSION['objectif_production'])) echo $_SESSION['objectif_production']; ?>" disabled>
                <select class="item-1-6" name="unite_objectif_production" id="unite_objectif_production" disabled>
              
                <?php
        $field_key = "field_53aace8c3ce1e";
        $field = get_field_object($field_key);
        
        if( $field )
        {         
          foreach( $field['choices'] as $k => $v )
          {
            echo '<option value="' . $k . '">' . $v . '</option>';
          }         
        }
        ?>
                </select>
              </span>
              <label for="objectif_production" class="error"></label>
            </p>
            <p class="hide-item item-1-6 type-eco-energ">
              <label for="objectif_economie">Objectif annuel d’économie d’énergie</label>
              <input class="item-1-6" name="objectif_economie" id="objectif_economie" type="text" value="<?php if(!empty($_SESSION['objectif_economie'])) echo $_SESSION['objectif_economie']; ?>" disabled>
            </p>
            <h4 class="hide-item item-1-5 h4">Etat d’avancement</h4>
            <p class="hide-item item-1-5"><label for="etude_opportunite">Avez vous fait une étude d’opportunité ?</label>
              <label for="etude_opportunite_1" class="block">
                <input class="item-1-5" name="etude_opportunite" type="radio" value="non" id="etude_opportunite_1" disabled>
                 <span class="radio__label">Non</span></label>
              <label for="etude_opportunite_2" class="block">
                <input class="item-1-5" name="etude_opportunite" type="radio" value="oui" id="etude_opportunite_2" disabled>
                 <span class="radio__label">Oui</span></label>
            </p>
            <p class="hide-item item-1-5"><label for="etude_faisabilite">Avez vous fait une étude de faisabilité ?</label>
              <label for="etude_faisabilite_1" class="block">
                <input class="item-1-5" name="etude_faisabilite" type="radio" value="non" id="etude_faisabilite_1" disabled>
                 <span class="radio__label">Non</span></label>
              <label for="etude_faisabilite_2" class="block">
                <input class="item-1-5" name="etude_faisabilite" type="radio" value="oui" id="etude_faisabilite_2" disabled>
                 <span class="radio__label">Oui</span></label>
            </p>
            <p class="hide-item item-1-5"><label for="projet_formalise">Avez-vous déjà formalisé un projet détaillé ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <label for="projet_formalise_1" class="block">
                <input class="item-1-5" name="projet_formalise" type="radio" value="non" id="projet_formalise_1" disabled>
                 <span class="radio__label">Non</span></label>
              <label for="projet_formalise_2" class="block">
                <input class="item-1-5" name="projet_formalise" type="radio" value="oui" id="projet_formalise_2" disabled>
                 <span class="radio__label">Oui</span></label>
                 <label class="error" for="projet_formalise"></label>
              
              <!--<input class="sub-hide-item" name="fichier_projet_formalise" type="file" placeholder="Votre document" id="fichier_projet_formalise" disabled>-->
            </p>
            <p class="hide-item item-1-6">
              <label for="energie_produite">Que souhaitez-vous faire de l’énergie produite ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <textarea class="item-1-6" name="energie_produite" id="energie_produite" placeholder="Exemple : vendre à EDF, vendre à Enercoop, autoconsommation..." required disabled><?php if(!empty($_SESSION['energie_produite'])) echo $_SESSION['energie_produite']; ?></textarea>
            </p>
            <p class="hide-item item-1-6">
              <label for="calendrier_projet">Quel est le calendrier du projet ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <textarea class="item-1-6" name="calendrier_projet" id="calendrier_projet" placeholder="Quelles sont les prochaines étapes et leur date prévisionnelle ?" required disabled><?php if(!empty($_SESSION['calendrier_projet'])) echo $_SESSION['calendrier_projet']; ?></textarea>
            </p>
            <p class="hide-item item-1-6">
              <label for="mise_en_service">Date de mise en service</label>
              <input class="item-1-6" name="mise_en_service" id="mise_en_service" type="text" value="<?php if(!empty($_SESSION['mise_en_service'])) echo $_SESSION['mise_en_service']; ?>" disabled>
            </p>
          </fieldset>
          <fieldset id="form-part-4" class="hide-item item-1-6">
            <legend class="section-title h3">Principes du projet</legend>
            <div class="hide-item item-1-6">
              <h4 class="hide-item item-1-6 h4">Ancrage collectif et local</h4>
              <p class="hide-item item-1-6">
                <label for="qui_porte_projet">Qui porte le projet ?<abbr class="require-form" title="obligatoire">*</abbr></label>
                <textarea class="item-1-6" name="qui_porte_projet" id="qui_porte_projet" placeholder="Pouvez-vous présenter les personnes impliquées dans le projet ?" required disabled><?php if(!empty($_SESSION['qui_porte_projet'])) echo $_SESSION['qui_porte_projet']; ?></textarea>
              </p>
              <p class="hide-item item-1-6">
                <label for="mobilisation_projet">Combien de personnes avez-vous / espérez-vous mobiliser autour du financement du projet ?</label>
                <textarea class="item-1-6" name="mobilisation_projet" id="mobilisation_projet" placeholder="Et comment ? (rencontres, réunions...)" disabled><?php if(!empty($_SESSION['mobilisation_projet'])) echo $_SESSION['mobilisation_projet']; ?></textarea>
              </p>
              <p class="hide-item item-1-6">
                <label for="collectivites_associes">Les collectivités locales sont elles / seront-elles associés au projet ?</label>
                <textarea class="item-1-6" name="collectivites_associes" id="collectivites_associes" placeholder="De quelle manière ?" disabled><?php if(!empty($_SESSION['collectivites_associes'])) echo $_SESSION['collectivites_associes']; ?></textarea>
              </p>
              <p class="hide-item item-1-5">
                <label for="partenaires_associes">Y a t-il d’autres partenaires/acteurs locaux associés au projet ?</label>
                <textarea class="item-1-5" name="partenaires_associes" id="partenaires_associes" placeholder="Lequels ?" disabled><?php if(!empty($_SESSION['partenaires_associes'])) echo $_SESSION['partenaires_associes']; ?></textarea>
              </p>
              <h4 class="hide-item item-1-6 h4">Non spéculation</h4>
              <p class="hide-item item-1-6">
                <label for="objectifs_financiers">Quels sont vos objectifs financiers ?<abbr class="require-form" title="obligatoire">*</abbr></label>
                <textarea class="item-1-6" name="objectifs_financiers" id="objectifs_financiers" placeholder="Que souhaitez-vous faire des bénéfices dégagés par le projet ?" required disabled><?php if(!empty($_SESSION['objectifs_financiers'])) echo $_SESSION['objectifs_financiers']; ?></textarea>
              </p>
              <p class="hide-item item-1-6"><label for="actions_sensibilisation">Des actions de sensibilisation sont-elles prévues en marge du projet ?<abbr class="require-form" title="obligatoire">*</abbr></label>
                <label for="actions_sensibilisation_1" class="block">
                  <input class="item-1-6" name="actions_sensibilisation" type="radio" value="non" id="actions_sensibilisation_1" disabled>
                   <span class="radio__label">Non</span></label>
                <label for="actions_sensibilisation_2" class="block">
                  <input class="item-1-6" name="actions_sensibilisation" type="radio" value="oui" id="actions_sensibilisation_2" disabled>
                   <span class="radio__label">Oui</span></label>
                <textarea class="sub-hide-item" name="actions_sensibilisation_detail" id="actions_sensibilisation_detail" placeholder="Décrivez ces actions" disabled><?php if(!empty($_SESSION['actions_sensibilisation'])) echo $_SESSION['actions_sensibilisation']; ?></textarea>
                <label class="error" for="actions_sensibilisation"></label>
              </p>
              <h4 class="hide-item item-2-6 h4">Démocratie et transparence</h4>
              <p class="hide-item item-2-6"><label for="dispositions_securisant">Existe-t-il des dispositions sécurisant une gouvernance locale et citoyenne dans les statuts de la société d'exploitation ?<abbr class="require-form" title="obligatoire">*</abbr></label>
                <label for="dispositions_securisant_1" class="block">
                  <input class="item-2-6" name="dispositions_securisant" type="radio" value="non" id="dispositions_securisant_1" disabled>
                   <span class="radio__label">Non</span></label>
                <label for="dispositions_securisant_2" class="block">
                  <input class="item-2-6" name="dispositions_securisant" type="radio" value="oui" id="dispositions_securisant_2" disabled>
                   <span class="radio__label">Oui</span></label>
                <textarea class="sub-hide-item" name="dispositions_securisant_detail" id="dispositions_securisant_detail" placeholder="Décrivez ces dispositions" disabled><?php if(!empty($_SESSION['dispositions_securisant'])) echo $_SESSION['dispositions_securisant']; ?></textarea>
                  <label class="error" for="dispositions_securisant"></label>
              </p>
            </div>
          </fieldset>
          <fieldset id="form-part-5" class="hide-item item-2-6">
            <legend class="section-title h3">Investissement</legend>
            <div class="hide-item item-2-6">
              <p class="hide-item item-2-6">
                <label for="montant_investissement">Montant total de l’investissement (en €)<abbr class="require-form" title="obligatoire">*</abbr></label>
                <input class="item-2-6" name="montant_investissement" id="montant_investissement" type="text" value="<?php if(!empty($_SESSION['montant_investissement'])) echo $_SESSION['montant_investissement']; ?>" required disabled>
              </p>
              <p class="hide-item item-2-6">
                <label for="fonds_disponibles">Fonds propres disponibles au sein de la société actuelle (en €)</label>
                <input class="item-2-6" name="fonds_disponibles" id="fonds_disponibles" type="text" value="<?php if(!empty($_SESSION['fonds_disponibles'])) echo $_SESSION['fonds_disponibles']; ?>" disabled>
              </p>
              <p class="hide-item item-2-6">
                <label for="part_endettement">Part d’endettement prévue (en%)</label>
                <input class="item-2-6" name="part_endettement" id="part_endettement" type="text" value="<?php if(!empty($_SESSION['part_endettement'])) echo $_SESSION['part_endettement']; ?>" disabled>
              </p>
              <p class="hide-item item-2-6"><label for="demande_financement">Souhaitez-vous faire une demande de financement à Energie Partagée Investissement ?<abbr class="require-form" title="obligatoire">*</abbr></label>
                <label for="demande_financement_1" class="block">
                  <input class="item-2-6" name="demande_financement" type="radio" value="non" id="demande_financement_1" disabled>
                  <span class="radio__label"> Non</span></label>
                <label for="demande_financement_2" class="block">
                  <input class="item-2-6" name="demande_financement" type="radio" value="oui" id="demande_financement_2" disabled>
                   <span class="radio__label">Oui</span></label>
                <label for="montant_financement" class="sub-hide-item" id="montant_financement_label">Quel montant souhaitez-vous demander à EPI ? (en €)</label>
                <input class="sub-hide-item" name="montant_financement" id="montant_financement" type="text" placeholder="Min : 50 000 € / Max 500 000 €" value="<?php if(!empty($_SESSION['montant_demande_financement'])) echo $_SESSION['montant_demande_financement']; ?>" disabled>
              </p>
              <p class="hide-item item-2-6">
                <label for="subventions_obtenues">Subventions sollicitées et obtenues</label>
                <input class="item-2-6" name="subventions_obtenues" id="subventions_obtenues" type="text" placeholder="Précisez..." value="<?php if(!empty($_SESSION['subventions_obtenues'])) echo $_SESSION['subventions_obtenues']; ?>" disabled>
              </p>
            </div>
          </fieldset>
          <fieldset id="form-part-6">
            <legend class="section-title h3">Informations complémentaires</legend>
            <h4 class="hide-item item-1-3 h4">Accompagnement et déroulement</h4>
            <p class="hide-item item-1-3">
              <label for="besoin_aide">Avez-vous besoin d'être épaulé dans la définition / précision et développement de votre projet ?</label>
              <textarea class="item-1-3" name="besoin_aide" id="besoin_aide" placeholder="Sur quels points en particulier ?" disabled><?php if(!empty($_SESSION['besoin_aide'])) echo $_SESSION['besoin_aide']; ?></textarea>
            </p>
            <p>
              <label for="commentaire_projet">Commentaires libres sur le projet :</label>
              <textarea name="commentaire_projet" id="commentaire_projet"><?php if(!empty($_SESSION['commentaire_projet'])) echo $_SESSION['commentaire_projet']; ?></textarea>
            </p>
            <p>
              <label for="site_web_projet">Site web du projet</label>
              <input name="site_web_projet" type="text" placeholder="ex : http://monprojet.fr" value="<?php if(!empty($_SESSION['site_web_projet'])) echo $_SESSION['site_web_projet']; ?>">
            </p>
            <p><label for="projet_visible">Autorisez-vous à rendre publique votre fiche projet ?<abbr class="require-form" title="obligatoire">*</abbr></label>
              <label for="projet_visible_1" class="block">
                <input name="projet_visible" type="radio" value="non" id="projet_visible_1" >
                 <span class="radio__label">Non</span></label>
              <label for="projet_visible_2" class="block">
                <input name="projet_visible" type="radio" value="oui" id="projet_visible_2" >
                 <span class="radio__label">Oui</span></label>
                 <label for="projet_visible" class="error"></label>
            </p>
          </fieldset>
          <input name="nom_token" type="hidden" value="98648515">
          <div class="btns-form">
            <div class="notification"></div>
            <button type="submit" id="submit" class="button green button--solo">Envoyer</button>         

          </div>
        </form>
     
  </article>  
</section>    

<?php get_footer(); ?>  