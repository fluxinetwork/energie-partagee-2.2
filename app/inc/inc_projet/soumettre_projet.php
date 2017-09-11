<?php
session_start();

define('WP_USE_THEMES', false);
require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );

function html($string)
{
	return htmlspecialchars($string, ENT_QUOTES);
	// return utf8_encode(htmlspecialchars($string, ENT_QUOTES));
}

if (isset($_POST['nom_projet']) 
&& isset($_POST['source_energie'])
&& isset($_POST['ville_projet'])
&& isset($_POST['code_postal'])
&& isset($_POST['resum_description_projet'])
&& isset($_POST['nom_contact'])
&& isset($_POST['prenom_contact'])
&& isset($_POST['email_contact'])
&& isset($_POST['tel_1_contact'])
&& isset($_POST['connu_comment'])
&& isset($_POST['collectif'])
&& isset($_POST['origine_projet'])
&& isset($_POST['description_projet'])
&& isset($_POST['stade_projet'])
&& is_numeric($_POST['nom_token'])

) {
	$nom_projet = $_SESSION['nom_projet'] = html($_POST['nom_projet']);
	// source_energie
	if(isset($_POST['source_energie_detail']) && !empty($_POST['source_energie_detail'])){
		/////// !!!!!!
		// gestion de la catégorie 'Autres'
		//$source_energie = $_SESSION['source_energie'] = html($_POST['source_energie']).' : '.html($_POST['source_energie_detail']);
		$source_energie = $_SESSION['source_energie'] = html($_POST['source_energie']);
	}
	else{
		$source_energie = $_SESSION['source_energie'] = html($_POST['source_energie']);
	}	
	$ville_projet = $_SESSION['ville_projet'] = html($_POST['ville_projet']);
	$adresse_projet = $_SESSION['adresse_projet'] = html($_POST['adresse_projet']);
	$code_postal = $_SESSION['code_postal'] = html($_POST['code_postal']);
	$resum_description_projet = $_SESSION['resum_description_projet'] = html($_POST['resum_description_projet']);
	
	$nom_contact = $_SESSION['nom_contact'] = html($_POST['nom_contact']);
	$prenom_contact = $_SESSION['prenom_contact'] = html($_POST['prenom_contact']);
	$adresse_contact = $_SESSION['adresse_contact'] = html($_POST['adresse_contact']);
	$code_postal_contact = $_SESSION['code_postal_contact'] = html($_POST['code_postal_contact']);
	$ville_contact = $_SESSION['ville_contact'] = html($_POST['ville_contact']);	
	$email_contact = $_SESSION['email_contact'] = html($_POST['email_contact']);
	$tel_1_contact = $_SESSION['tel_1_contact'] = html($_POST['tel_1_contact']);
	$tel_2_contact = $_SESSION['tel_2_contact'] = html($_POST['tel_2_contact']);
	
	// connu comment
	if(isset($_POST['connu_autre']) && !empty($_POST['connu_autre'])){
		$connu_comment = $_SESSION['connu_comment'] = html($_POST['connu_comment']).' : '.html($_POST['connu_autre']);
	}
	else{
		$connu_comment = $_SESSION['connu_comment'] = html($_POST['connu_comment']);
	}
	// collectif
	if(isset($_POST['nom_collectif']) && !empty($_POST['nom_collectif'])){
		$collectif = $_SESSION['collectif'] = html($_POST['collectif']).' : '.html($_POST['nom_collectif']);		
	}
	else{
		$collectif = $_SESSION['collectif'] = html($_POST['collectif']);
	}
	if(isset($_POST['autre_collectif']) && !empty($_POST['autre_collectif'])){
		$collectif = $_SESSION['collectif'] = $collectif.' ('.html($_POST['autre_collectif']).')';
	}
	
	$description_territoire = $_SESSION['description_territoire'] = html($_POST['description_territoire']);
	$origine_projet = $_SESSION['origine_projet'] = html($_POST['origine_projet']);
	$description_projet = $_SESSION['description_projet'] = html($_POST['description_projet']);
	$stade_projet = $_SESSION['stade_projet'] = html($_POST['stade_projet']);
	
	// partie conditonnelle du formulaire
	// entité porteurse
	if(isset($_POST['entite_porteuse'])){
		$entite_porteuse = $_SESSION['entite_porteuse'] = html($_POST['entite_porteuse']);
	}else{
		$entite_porteuse ='';
	}
	
	if(isset($_POST['nom_entite_porteuse']) && !empty($_POST['nom_entite_porteuse'])){
		$nom_entite_porteuse = $_SESSION['nom_entite_porteuse'] = " / ".html($_POST['nom_entite_porteuse']);
	}
	else{
		$nom_entite_porteuse = '';
	}
	if(isset($_POST['principales_contrainte'])){
		$principales_contrainte = $_SESSION['principales_contrainte'] = html($_POST['principales_contrainte']);	
	}else{
		$principales_contrainte ='';
	}
	if(isset($_POST['puissance_prevue'])){
		$puissance_prevue = $_SESSION['puissance_prevue'] = html($_POST['puissance_prevue']);
	}else{
		$puissance_prevue ='';
	}
	if(isset($_POST['unite_energie'])){
		$unite_puissance = html($_POST['unite_energie']);
	}else{
		$unite_puissance ='';
	}	
	if(isset($_POST['unites_production'])){
		$unites_production = $_SESSION['unites_production'] = html($_POST['unites_production']);
	}else{
		$unites_production ='';
	}
	if(isset($_POST['unite_production'])){
		$type_unite_de_puissance = html($_POST['unite_production']);
	}else{
		$type_unite_de_puissance ='';
	}
	
	if(isset($_POST['objectif_production'])){
		$objectif_production = $_SESSION['objectif_production'] = html($_POST['objectif_production']);
	}else{
		$objectif_production ='';
	}
	$unite_production = html($_POST['unite_objectif_production']);
	
	if(isset($_POST['objectif_economie'])){
		$objectif_economie = $_SESSION['objectif_economie'] = html($_POST['objectif_economie']);
	}else{
		$objectif_economie ='';
	}
	
	if(isset($_POST['etude_opportunite'])){
		$etude_opportunite = $_SESSION['etude_opportunite'] = html($_POST['etude_opportunite']);
	}else{
		$etude_opportunite ='';
	}
	if(isset($_POST['etude_faisabilite'])){
		$etude_faisabilite = $_SESSION['etude_faisabilite'] = html($_POST['etude_faisabilite']);
	}else{
		$etude_faisabilite ='';
	}
	if(isset($_POST['projet_formalise'])){
		$projet_formalise = $_SESSION['projet_formalise'] = html($_POST['projet_formalise']);
	}else{
		$projet_formalise ='';
	}
	$energie_produite = $_SESSION['energie_produite'] = html($_POST['energie_produite']);
	$calendrier_projet = $_SESSION['calendrier_projet'] = html($_POST['calendrier_projet']);
	$mise_en_service = $_SESSION['mise_en_service'] = html($_POST['mise_en_service']);
	$mise_en_service_submit = $_SESSION['mise_en_service_submit'] = $_POST['mise_en_service_submit'];
	
	$qui_porte_projet = $_SESSION['qui_porte_projet'] = html($_POST['qui_porte_projet']);
	$mobilisation_projet = $_SESSION['mobilisation_projet'] = html($_POST['mobilisation_projet']);
	$collectivites_associes = $_SESSION['collectivites_associes'] = html($_POST['collectivites_associes']);
	if(isset($_POST['partenaires_associes'])){
		$partenaires_associes = $_SESSION['partenaires_associes'] = html($_POST['partenaires_associes']);
	}else{
		$partenaires_associes ='';
	}
	$objectifs_financiers = $_SESSION['objectifs_financiers'] = html($_POST['objectifs_financiers']);
	// actions de sensibilisation
	if(isset($_POST['actions_sensibilisation_detail']) && !empty($_POST['actions_sensibilisation_detail'])){
		$actions_sensibilisation = $_SESSION['actions_sensibilisation'] = html($_POST['actions_sensibilisation']).' : '.html($_POST['actions_sensibilisation_detail']);
	}
	else{
		$actions_sensibilisation = $_SESSION['actions_sensibilisation'] = html($_POST['actions_sensibilisation']);
	}
	
	// dispositions sécurisant
	if(isset($_POST['dispositions_securisant_detail']) && !empty($_POST['dispositions_securisant_detail'])){
		$dispositions_securisant = $_SESSION['dispositions_securisant'] = html($_POST['dispositions_securisant']).' : '.html($_POST['dispositions_securisant_detail']);
	}
	else if(isset($_POST['dispositions_securisant']) && !empty($_POST['dispositions_securisant'])){
		$dispositions_securisant = $_SESSION['dispositions_securisant'] = html($_POST['dispositions_securisant']);
	}else{
		$dispositions_securisant = '';
	}
	
	if(isset($_POST['montant_demande_financement'])){
		$besoin_aide = $_SESSION['besoin_aide'] = html($_POST['besoin_aide']);
	}else{
		$besoin_aide = '';
	}
	$commentaire_projet = $_SESSION['commentaire_projet'] = html($_POST['commentaire_projet']);
	if(isset($_POST['montant_investissement'])){
		$montant_investissement = $_SESSION['montant_investissement'] = html($_POST['montant_investissement']);
	}else{
		$montant_investissement ='';
	}
	if(isset($_POST['fonds_disponibles'])){
		$fonds_disponibles = $_SESSION['fonds_disponibles'] = html($_POST['fonds_disponibles']);
	}else{
		$fonds_disponibles ='';
	}
	if(isset($_POST['part_endettement'])){
		$part_endettement = $_SESSION['part_endettement'] = html($_POST['part_endettement']);
	}else{
		$part_endettement ='';
	}
	// dispositions sécurisant
	
	//$demande_financement = $_SESSION['demande_financement'];
	if(isset($_POST['montant_demande_financement'])){
		$montant_demande_financement = $_SESSION['montant_demande_financement'] = html($_POST['montant_financement']);
	}else{
		$montant_demande_financement ='';
	}
	if(isset($_POST['subventions_obtenues'])){
		$subventions_obtenues = $_SESSION['subventions_obtenues'] = html($_POST['subventions_obtenues']);
	}else{
		$subventions_obtenues ='';
	}
	
	$site_web_projet = $_SESSION['site_web_projet'] = html($_POST['site_web_projet']);
	$projet_visible = $_SESSION['projet_visible'] = html($_POST['projet_visible']);
	
	
	// Tableau des métas	
	
	$metas_tab = array(
		"ville" => $ville_projet,
		"adresse" => $adresse_projet.", ".$code_postal,		
		"nom" => $nom_contact,
		"prenom" => $prenom_contact,
		"adresse_contact" => $adresse_contact,
		"code_postal_contact" => $code_postal_contact,
		"ville_contact" => $ville_contact,
		"email" => $email_contact,
		"telephone" => $tel_1_contact,
		"telephone_2" => $tel_2_contact,
		"comment_avez_vous_connu_ep" => $connu_comment,
		"representez_vous_une_structure" => $collectif,
		"description_territoire" => $description_territoire,
		"origines_et_raisons" => $origine_projet,
		"description_projet" => $description_projet,
		"etapes_du_projet" => $stade_projet,
		"entite_porteuse_du_projet" => $entite_porteuse." ".$nom_entite_porteuse,
		"contraintes_et_atouts_du_projet" => $principales_contrainte,
		"puissance" => $puissance_prevue,
		"unite_puissance" => $unite_puissance,
		"equivalent_unites_puissance" => $unites_production,
		"type_unite_de_puissance" => $type_unite_de_puissance,
		"production" => $objectif_production,
		"unite_production" => $unite_production,
		"objectif_eco_energie" => $objectif_economie,
		"etude_dopportunite" => $etude_opportunite,
		"etude_de_faisabilite" => $etude_faisabilite,
		"dossier_detaille" => $projet_formalise,
		"que_faire_energie_produite" => $energie_produite,
		"calendrier_du_projet" => $calendrier_projet,
		"date_mise_en_service" => $mise_en_service_submit,
		"porteurs_du_projet" => $qui_porte_projet,
		"nombre_personnes_financement" => $mobilisation_projet,
		"collectivites_locales_projet" => $collectivites_associes,
		"autres_partenaires_projet" => $partenaires_associes,
		"objectif" => $objectifs_financiers,
		"actions_sensibilisation" => $actions_sensibilisation,
		"dispositions_securite_gouvernance_citoyenne" => $dispositions_securisant,
		//"bar" => $besoin_aide,
		"commentaires_libres" => $commentaire_projet,
		"montant_total_investissement" => $montant_investissement,
		"fonds_prores_societe" => $fonds_disponibles,
		"part_endettement" => $part_endettement,
		"demande_financement_epi" => $montant_demande_financement,
		"subventions_sollicitees" => $subventions_obtenues,
		"sit_internet" => $site_web_projet,
		"autorisation_projet_public" => $projet_visible
		
	);

	//Taxo
	$custom_tax = array(
		'type_energie' => array(
			$source_energie
		)
	);
	
	// Create post object
	$insert_projet = array(
	  'post_title' => $nom_projet,
	  'post_content' => '*****',
	  'post_excerpt' => $resum_description_projet,
	  'post_status' => 'pending',
	  'post_author' => 1,
	  'post_type' => 'projets',
	  //'post_category' => array($source_energie)
	  'tax_input' => $custom_tax
	);
	
	// Insert the project into the database
	$the_post_id = wp_insert_post( $insert_projet );	
	
	foreach( $metas_tab as $key => $value ){  		
		add_post_meta($the_post_id, $key, $value, true);
	}
	
	// Envoie du mail de notification	
	$multiple_to_recipients = array('arno.foulon@energie-partagee.org','justine.peullemeulle@energie-partagee.org','marc.mossalgue@energie-partagee.org','olivier.berland@energie-partagee.org');				
	$headers = 'From: energie-partagee.org <contact@energie-partagee.org>' . "\r\n";
	$sujet_mail = 'Nouveau projet : '.$nom_projet;
	$contenu_mail = '<h3>Nom du projet : '.$nom_projet.'</h3><p>'.$resum_description_projet.'</p><h3>Contact :</h3><p>'.$nom_contact.' '.$prenom_contact.',<br />'.$email_contact.'</p>';
														
	add_filter( 'wp_mail_content_type', 'set_html_content_type' );							
	wp_mail( $multiple_to_recipients, $sujet_mail, $contenu_mail, $headers);
	remove_filter( 'wp_mail_content_type', 'set_html_content_type' );			
	
	// Réponse Json
	$reponse_json = array('resultForm' => 'yes');	
	echo json_encode($reponse_json);
	
}
else{
	$reponse_json = array('resultForm' => 'no');
	echo json_encode($reponse_json);
}

// Typage du message mail
function set_html_content_type() 
{							
	return 'text/html';
}

?>