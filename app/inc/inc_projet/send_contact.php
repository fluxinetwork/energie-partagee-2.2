<?php

session_start();

define('WP_USE_THEMES', false);
require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
	
function html($string)
{
	return htmlspecialchars($string, ENT_QUOTES);		
}
	
if (isset($_POST['nom']) and isset($_POST['prenom']) and isset($_POST['email']) and isset($_POST['sujet']) and isset($_POST['message']) and is_numeric($_POST['nom_token'])) {	
			// Création des variables du form
			$_SESSION['nom']=$_POST['nom'];					
			$_SESSION['prenom']=$_POST['prenom'];
			$_SESSION['email']=$_POST['email'];
			$_SESSION['sujet']=$_POST['sujet'];
			$_SESSION['message']=$_POST['message'];
			if (isset($_POST['autres_sujet']) and !empty($_POST['autres_sujet'])){
				$_SESSION['autres_sujet']=html($_POST['autres_sujet']);
			}else{
				$_SESSION['autres_sujet']='';	
			}
			
			// Test variables vides
			if (!empty($_POST['nom']) and !empty($_POST['prenom']) and !empty($_POST['email']) and !empty($_POST['sujet']) and !empty($_POST['message']) and is_numeric($_POST['nom_token'])) { 			
			
				$_SESSION['nom']=html($_SESSION['nom']);
				$_SESSION['prenom']=html($_SESSION['prenom']);
				$_SESSION['email']=html($_SESSION['email']);
				$_SESSION['sujet']=html($_SESSION['sujet']);	
				$_SESSION['message']=html($_SESSION['message']);		
				
			// Envoie du mail
			
				if($_SESSION['sujet']=='Informations sur la souscription'){
					$mail_recever = 'souscription@energie-partagee.org';
				}else{
					$mail_recever = 'association@energie-partagee.org';
				}
											
				$multiple_to_recipients = array($mail_recever);				
				$headers = 'From: energie-partagee.org <'.$mail_recever.'>' . "\r\n";
				$sujet_mail = $_SESSION['sujet'].' / '.$_SESSION['autres_sujet'];
				$contenu_mail = '<h3>Demande de contact : '.$_SESSION['sujet'].', '.$_SESSION['autres_sujet'].'</h3><p>'.$_SESSION['nom'].' '.$_SESSION['prenom'].',<br />'.$_SESSION['email'].'</p><h3>Message :</h3><p>'.$_SESSION['message'].'</p>';
														
				add_filter( 'wp_mail_content_type', 'set_html_content_type' );							
				wp_mail( $multiple_to_recipients, $sujet_mail, $contenu_mail, $headers);
				remove_filter( 'wp_mail_content_type', 'set_html_content_type' );	
				
				$reponse_json = array('resultForm' => 'yes');	
				echo json_encode($reponse_json);
					
			}
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