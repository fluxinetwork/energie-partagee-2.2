<footer class="footer section js-footer">
    <div class="wrap-n">
        <div class="box">
            <div class="box__half">
                <h5 class="s-title">Nous suivre</h5>
                <ul class="social social-footer">
                   <li><a href="https://www.facebook.com/EnergiePartagee.org" class="social--face" target="_blank"><i class="icon-facebook_40"></i></a></li>
                    <li><a href="https://twitter.com/EnergiePartagee" class="social--twit" target="_blank"><i class="icon-twitter_40"></i></a></li>
                    <li><a href="https://www.youtube.com/user/EnergiePartagee" class="social--yout" target="_blank"><i class="icon-youtube_40"></i></a></li>
                </ul>    
            </div>

            <div class="box__half footer-newsletter">
                <h5 class="s-title">Abonnement newsletter</h5>
                <div class="box">
                    <!--Zoho  Web-Optin Form Starts Here-->
                    <script type="text/javascript" src="https://campaigns.zoho.com/js/jquery.form.js"></script>
                    <script type="text/javascript" src="https://campaigns.zoho.com/js/optin_min.js"></script>
                    <script type="text/javascript">
                    var trackingText='ZCFORMVIEW';
                    $(document).ready( function($) {
                        $("#zc_trackCode").val(trackingText);
                            $("#fieldBorder").val($("[changeItem='SIGNUP_FORM_FIELD']").css("border-color"));
                            _setOptin(false,function(th){
                            /*Before submit, if you want to trigger your event, "include your code here"*/
                        });

                        /*Tracking Enabled*/ 
                        trackSignupEvent(trackingText);
                     });
                    </script>

                    <div id="SIGNUP_PAGE" class="c-zoho">
                        <div style="display:none;" id="errorMsgDiv">Veuillez corriger les champs en rouge</div>
                        <form method="POST" id="zcampaignOptinForm"  action="https://zc1.maillist-manage.com/campaigns/weboptin.zc" target="_zcSignup" class="c-zoho__form">
                            <div class="c-zoho__form__inputs">
                                <div class="c-zoho__form__inputs_item">
                                    <input name="LASTNAME" class="miniform__input" changetype="LASTNAME" changeitem="SIGNUP_FORM_FIELD" type="text" id="LASTNAME" placeholder="Nom" class="placeholder">
                                    <span style="display:none" id="dt_LASTNAME">1,false,1,Nom,2</span>
                                </div>

                                <div class="c-zoho__form__inputs_item">
                                    <input name="CONTACT_EMAIL" class="miniform__input" changetype="CONTACT_EMAIL" changeitem="SIGNUP_FORM_FIELD" type="text" id="CONTACT_EMAIL" placeholder="Votre e-mail">
                                    <span style="display:none" id="dt_CONTACT_EMAIL">1,true,6,E-mail du contact,2</span>
                                </div>
                            </div>
    
                            <div class="c-zoho__form__submit">
                                <button type="submit" name="SIGNUP_SUBMIT_BUTTON" id="zcWebOptin" class="miniform__submit"><i class="icon-check_64"></i></button>
                            </div>

                            <input type="hidden" id="fieldBorder" value="rgb(136, 136, 136)">
                            <input type="hidden" name="zc_trackCode" id="zc_trackCode" value="" onload="">
                            <input type="hidden" id="submitType" name="submitType" value="optinCustomView">
                            <input type="hidden" id="lD" name="lD" value="1335f10e64b3907c">
                            <input type="hidden" name="emailReportId" id="emailReportId" value="">
                            <input type="hidden" id="formType" name="formType" value="QuickForm">
                            <input type="hidden" name="zx" id="cmpZuid" value="1257ee213">
                            <input type="hidden" name="zcvers" value="2.0">
                            <input type="hidden" name="oldListIds" id="allCheckedListIds" value="">
                            <input type="hidden" id="mode" name="mode" value="OptinCreateView">
                            <input type="hidden" id="zcld" name="zcld" value="1335f10e64b3907c">
                            <input type="hidden" id="document_domain" value="zoho.com">
                            <input type="hidden" id="zc_Url" value="zc1.maillist-manage.com">
                            <input type="hidden" id="zc_formIx" name="zc_formIx" value="a6eab9f2d71532d68664dcd8fc40a842c98e811ca5f0889b"><!-- End of the campaigns hidden tags -->
                        </form>
                    </div>
                    <!--Zoho  Web-Optin Form Ends Here-->
                </div>
                <div class="box is-none"> 
                    <form class="miniform" method="post" action="http://ymlp.com/subscribe.php?id=gbuyheegmgb" target="_blank">
                        <input class="miniform__input" name="YMP0" id="newsletter_footer" type="email" value="" placeholder="Votre email" required aria-required="true">
                        <button type="submit" class="miniform__submit"><i class="icon-check_64"></i></button>
                    </form>  
                </div>     
            </div>     
        </div>
        
        <h5 class="s-title">Nos partenaires</h5>
        <ul class="box-logos box">
            <li class="box-logos__item"><span class="box-logos__logo"><img src="<?php echo get_template_directory_uri(); ?>/app/img/logos/energie-partagee-partenaire-ademe.png"></span></li>
            <li class="box-logos__item"><span class="box-logos__logo"><img src="<?php echo get_template_directory_uri(); ?>/app/img/logos/energie-partagee-partenaire-region-ile-de-france.jpg"></span></li>
            <li class="box-logos__item"><span class="box-logos__logo"><img src="<?php echo get_template_directory_uri(); ?>/app/img/logos/energie-partagee-partenaire-fondation-massif.png"></span></li>
            <li class="box-logos__item"><span class="box-logos__logo"><img src="<?php echo get_template_directory_uri(); ?>/app/img/logos/energie-partagee-partenaire-region-centre-val-loire.jpg"></span></li>
            <li class="box-logos__btn"><a class="button-round" href="<?php echo get_site_url(); ?>/nous-decouvrir/qui-sommes-nous/lassociation/#partenaires"><i class="icon-plus_64"></i></a></li> 
        </ul>
        
        <h5 class="s-title">Nos labels</h5>
        <ul class="labels box">
            <li class="labels__img">
                <a class="labels__label" href="<?php echo get_site_url(); ?>/devenir-actionnaire/les-actions-energie-partagee/"><img src="<?php echo get_template_directory_uri(); ?>/app/img/logos/logo-label-1.png"></a>
                <a class="labels__label" href="<?php echo get_site_url(); ?>/devenir-actionnaire/les-actions-energie-partagee/"><img src="<?php echo get_template_directory_uri(); ?>/app/img/logos/logo-label-2.png"></a>
            </li>
            <li class="labels__txt"><p class="p-ss">Énergie Partagée Investissement est agréée “Entreprise Solidaire” et ses actions bénéficient du label Finansol qui garantit la solidarité et la transparence de l'investissement.</p></li>
        </ul>
        
        <nav class="footer__nav">
           <a class="link" href="<?php echo get_site_url(); ?>/contact/">Contact</a>
           <a class="link" href="<?php echo get_permalink(968); ?>">Presse</a>
           <a class="link" href="<?php echo get_site_url(); ?>/mentions-legales/">Mentions légales </a>
        </nav>
        
    </div>    
</footer>