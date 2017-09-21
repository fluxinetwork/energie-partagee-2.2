
<?php if(is_home()){ echo '<article class="wrap-courtcircuit">'; }else{ echo '<aside class="wrap-courtcircuit">';}?>

  <img class="img-svg courtcircuit__logo" src="<?php echo get_template_directory_uri(); ?>/app/img/courtcircuit.svg">
  
  <div class="courtcircuit">
    <div class="box-asy__left">
      <h6 class="courtcircuit__text">Abonnez-vous à Court-Circuit, la newsletter d’Energie Partagée.</h6>
    </div>
    
    <div class="box-asy__right">
      <!--Zoho  Web-Optin Form Starts Here-->
      <script type="text/javascript" src="https://campaigns.zoho.com/js/jquery.form.js"></script>
      <script type="text/javascript" src="https://campaigns.zoho.com/js/optin_min.js"></script>
      <script type="text/javascript">
      var $ZC = jQuery.noConflict();
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

      <div id="SIGNUP_PAGE" class="c-zoho c-zoho--line">
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
