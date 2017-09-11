<?php 

$mail_prospect;     
$id_project;
$name_project;
$city_project;
$region_project;
$thumb_url;
$url_page_projet;

if ( $vars ) :       
      
  $mail_prospect = $vars[0];     
  $id_project = $vars[1];
  $name_project = $vars[2];
  $city_project = $vars[3]; 
  $region_project = $vars[4];
  $thumb_url = $vars[5];
  $url_page_projet = $vars[6];

endif;


$contenu_mail = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Energie Partagée - Soutenir un projet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">     
</head>
<body bgcolor="#ffffff" style="margin:0;">
    <table width="100%" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <table style="font-size:14px; font-family:Arial, sans-serif;" align="center" cellpadding="0" cellspacing="0" border="0" width="600">
                          <tr>
                            <td>
                              <table align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td>
                                    <img style="display:block" src="http://i.imgur.com/mlUTIDq.jpg" width="600" height="254" alt="Energie Partagée - logo">
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table align="center" cellpadding="0" cellspacing="0" border="0" width="600" bgcolor="#65C103" style="padding:0 50px 25px 50px; text-align:center; color:#fff; border-radius: 0 0 3px 3px;">
                                <tr>
                                  <td>
                                    <h2 style="font-size:24px; margin-bottom:5px; font-family: Lucida Grande, Arial, sans-serif;">C\'est l\'histoire de milliers de personnes</h2>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h3 style="font-size:17px; font-weight:normal; padding: 0 40px; margin-top: 0px; line-height: 20px;">qui choisissent de se mobiliser pour une autre énergie, pour leur territoire et pour la planète !</h3>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                              <tr>
                                    <td>
                                          <table align="center" cellpadding="0" cellspacing="0" width="600"  border="0" style="padding:25px 0 25px 0; text-align:center; color:#333;">
                                                <tr>
                                                      <td>
                                                            <p style="margin-bottom:5px;">Vous avez souhaité en                                                 savoir plus sur le                                                 projet</p>
                                                      </td>
                                                </tr>
                                                <tr>
                                                      <td>
                                                            <h1 style="font-size:25px; margin-top:0; margin-bottom:0;">'.$name_project.'</h1>
                                                      </td>
                                                </tr>
                                                <tr>
                                                      <td>
                                                            <p style="margin:5px;">Merci de votre intérêt !</p>
                                                      </td>
                                                </tr>
                                                <tr>
                                                      <td style="text-align:center">
                                                            <a href="'.$url_page_projet.'" style="width: 260px; display: inline-block; border-radius: 50%; overflow: hidden;"><img src="'.$thumb_url.'" style="width:100%;border-radius:3px; margin:12px 0 15px 0" /></a>
                                                      </td>
                                                </tr>
                                                 <tr>
                                                      <td>
                                                            <p style="margin-top:0; padding:0 40px;">Ce projet est actuellement <strong>en cours de collecte</strong>.<br>
                                                            Pour suivre les actualités et la progression du financement,  la                                                 meilleure chose à faire                                                 est de <strong>créer                                                 gratuitement</strong> un compte                                                 sur le site de                                                 souscription : </p>
                                                      </td>
                                                </tr>
                                                <tr>
                                                      <td>
                                                            <a href="https://je-souscris.energie-partagee.org/mon-compte/register" style="background-color:#75C800; padding:14px 18px; color:#fff; text-decoration:none; border-radius:10px; display:inline-block; font-weight:700; font-family: Lucida Grande, Arial, sans-serif;">Créez votre compte !</a>
                                                      </td>
                                                </tr>
                                          </table>
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <table align="center" cellpadding="0" cellspacing="0" border="0" width="600" style="padding:0 0 25px 0; text-align:center; color:#333;">
                                                <tr>
                                                      <td>
                                                            <p style="padding:0 40px;">En <strong>trois minutes</strong>, vous créez votre profil personnalisé et avez accès au contenu réservé à la communauté des souscripteurs Énergie Partagée.</p>
                                                      </td>
                                                </tr>
                                                <tr>
                                                      <td>
                                                            <table align="center" cellpadding="0" cellspacing="0" border="0" width="600" style="padding:0 50px 25px 50px; text-align:left; color:#333; margin-top:15px; padding:30px 40px; background:#eb6c1d; border-radius:3px; color:#fff;">
                                                                  <tr>
                                                                        <td>
                                                                              <p style="margin-top:0; font-weight:bold">Une fois connecté sur ce site, vous pouvez : </p>
                                                                              <ul style="text-align:left; line-height:20px;">
                                                                              <li>Suivre les dernières actualités des projets qui vous intéressent</li>
<li>Découvrir et contacter les autres souscripteurs près de chez vous</li>
<li>Échanger avec les porteurs de projets </li>
<li>Souscrire pour soutenir financièrement les projets qui en ont besoin…</li></ul>
                                                                              
                                                                        </td>
                                                                  </tr>

                                                            </table>
                                                      </td>
                                                </tr>

                                          </table>
                                    </td>
                              </tr>
                              
                              <tr width="600">
                                <td><p style="text-align:center; padding:0 40px;"><strong>Si vous ne souhaitez pas vous connecter</strong> sur notre site de souscription, nous conservons votre adresse mail et nous vous contacterons pour vous informer de l\'avancement du projet que vous avez choisi de suivre.<br><br>
 À très bientôt sur notre site de souscription !<br><br>

L\'équipe Énergie Partagée. </p></td>
                              </tr>
                              <tr width="600">
                                <td style="display:block; padding:50px; background:#b7115b; text-align:center; margin-top:35px; border-radius:3px 3px 0 0;">
                                  <table align="center" cellpadding="0" cellspacing="0" border="0">
                                  
                                    <tr>
                                      <td width="600">
                                        <p style="color:#fff">En cas de difficulté à créer votre compte ou à finaliser votre souscription, 
écrivez-nous à <a style="color:#fff; text-decoration:none" href="mailto:souscription@energie-partagee.org">souscription@energie-partagee.org</a></p></td>
                                    </tr>
                                    
                                    <tr>
                                          <td align="left" width="210" valign="top">
                                            
                                            <img style="display:block; margin:20px auto 30px; border-radius:3px;" src="http://i.imgur.com/kL09BuF.jpg" width="190" height="95" alt="Logo Finansol et agrément Entreprise Solidaire">
                                            
                                            <p style="color:#fff; text-align:center; margin-bottom:40px">Énergie Partagée Investissement est agréée “Entreprise Solidaire” et ses actions bénéficient du label Finansol qui garantit la solidarité et la transparence de l\'investissement.</p>
                                            
                                            <p style="color:#fff; text-align:center;"><a style="color:#fff; text-decoration:none" href="https://www.facebook.com/pages/Energie-Partag%C3%A9e/376460652377147" target="_blank">Facebook</a> - <a style="color:#fff; text-decoration:none" href="https://twitter.com/EnergiePartagee" target="_blank">Twitter</a></p>
                                          </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr width="600">  
                                <td><p style="text-align:center; padding:0 40px;"><em>NB : nous conservons votre adresse email pour vous adresser occasionnellement des messages d\'informations sur les projets et le mouvement Énergie Partagée. Pour vous désinscrire, merci de nous écrire à <a style="color:#75c800; text-decoration:none" href="mailto:contact@energie-partagee.org">contact@energie-partagee.org</a>.</em></p></td>
                              </tr> 
                        </table>
                  </td>
             </tr>
    </table>
</body>
</html>';
?>