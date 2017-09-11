//*********************************************
    //   Soumettre un projet
    //*********************************************
	var typeEnergie, stadeProjet;
	
	if($('#soumettre_projet').length > 0){	

		// Datepicker
		var TODAY = new Date(2013,3,20,10,30);
		$('#mise_en_service').pickadate({
			monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			today: 'aujourd\'hui',
			clear: 'effacer',
			formatSubmit: 'dd/mm/yy',
			close: 'Fermer'
		});
		
		// validation Js du form
		var messageRadio = "Veuillez sélectionner une réponse";
		
		$("#soumettre_projet").validate({
			rules: {
				email_contact:{	required: true,	email: true	},
				connu_comment: { required: true	},
				collectif: { required: true	},
				stade_projet: {	required: true },
				entite_porteuse: { required: true },
				projet_formalise: { required: true },
				actions_sensibilisation: { required: true }, 
				dispositions_securisant: { required: true },
				montant_financement: { required: true },
				projet_visible: { required: true },
				code_postal: { required: true, number: true },
				code_postal_contact: { number: true },
				tel_1_contact : { required: true, digits: true },
				tel_2_contact : { digits: true },
				puissance_prevue : { required: true, number: true },
				unites_production : { required: true, number: true },
				objectif_production : { number: true },
				montant_investissement : { required: true, number: true },
				montant_financement : { number: true, range: [50000, 500000] },
				fonds_disponibles : { number: true },
				part_endettement : { number: true, max: 100 },
				site_web_projet : { url: true }
			},
			messages: {				
				connu_comment: { required: messageRadio },
				collectif: { required: messageRadio },
				stade_projet: { required: messageRadio },
				entite_porteuse: { required: messageRadio },
				projet_formalise: { required: messageRadio },
				actions_sensibilisation: { required: messageRadio },
				dispositions_securisant: { required: messageRadio },
				montant_financement: { required: messageRadio },
				projet_visible: { required: messageRadio }
			},
			submitHandler: function() {				
				sendForm();			
			}
		});	
		
		function sendForm(){
			if($('#submit.is-sending').length == 0){	
			$.ajax({
					url: themeURL+'/app/inc/inc_projet/soumettre_projet.php',
					type: 'POST',
					data: $('form#soumettre_projet').serialize(),
					dataType: 'json',
					beforeSend : function() {
						$('.btns-form #submit').addClass('is-sending').html('<i class="spinner"></i>');						
					},
					success: function(json) {		
						if(json.resultForm == 'yes') {  
							$('.btns-form #submit').remove();							                  	
							notify('<span class="valid-submit-form">Merci, votre projet vient a été correctement ajouté. Nous vous contacterons prochainement avant de le faire apparaitre sur notre site internet.</span>');						
						} else {
							$('.btns-form #submit').removeClass('is-sending').html('Envoyer'); 														
							notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre formulaire. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');	
						}						
					},
                    error: function(){
						$('#submit').removeClass('is-sending').html('Envoyer');
                        notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre formulaire. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');
                    }          
				});
			}
		}
	
		// affichage conditionnel
		typeEnergie = $('#source_energie').val();
		
		stadeProjet = $('input[name=stade_projet]').index($('input[name=stade_projet]:checked')) + 1;		
		
		hideShowForm();	
				
		$('#source_energie').change(function(){		
			typeEnergie = $(this).val();			
			if(typeEnergie == 14){
				$('#source_energie_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#source_energie_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}			
			hideShowForm();	
		});
		
		$('input[name=stade_projet]').change(function(){		
			stadeProjet = $('input[name=stade_projet]').index(this);			
			stadeProjet = stadeProjet + 1;				
			hideShowForm();	
			//refreshWaypoints();	
		});	
		
		// champs obtionnels/conditionnels (si autres, si oui, etc...)		
		
		$('input[name=connu_comment]').change(function(){			
			if($('input[name=connu_comment]:checked').val() == "Autres"){
				$('#connu_autre').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#connu_autre').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});
		
		$('input[name=collectif]').change(function(){			
			if($('input[name=collectif]:checked').val() == "Autres"){
				$('#autre_collectif').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#autre_collectif').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});		
		
		$('input[name=entite_porteuse]').change(function(){			
			if($('input[name=entite_porteuse]:checked').val() == "oui"){
				$('#nom_entite_porteuse').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#nom_entite_porteuse').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});	
		
		/*$('input[name=projet_formalise]').change(function(){			
			if($('input[name=projet_formalise]:checked').val() == "Oui"){
				$('#fichier_projet_formalise').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#fichier_projet_formalise').addClass('sub-hide-item').attr('disabled', true);
				$('#fichier_projet_formalise').replaceWith( $('#fichier_projet_formalise').val('').clone( true ) );
			}
		});	*/
		
		$('input[name=actions_sensibilisation]').change(function(){			
			if($('input[name=actions_sensibilisation]:checked').val() == "oui"){
				$('#actions_sensibilisation_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#actions_sensibilisation_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});	
		
		$('input[name=dispositions_securisant]').change(function(){			
			if($('input[name=dispositions_securisant]:checked').val() == "oui"){
				$('#dispositions_securisant_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#dispositions_securisant_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});
		
		$('input[name=demande_financement]').change(function(){			
			if($('input[name=demande_financement]:checked').val() == "oui"){
				$('#montant_financement').removeClass('sub-hide-item').attr('disabled', false);
				$('#montant_financement_label').removeClass('sub-hide-item');
			}
			else{
				$('#montant_financement').addClass('sub-hide-item').attr('disabled', true).val('');
				$('#montant_financement_label').addClass('sub-hide-item');
			}
		});
		
		
	}
	
	function hideShowForm(){
		
		if(stadeProjet != "" && stadeProjet != 0){			
			
			if(stadeProjet == 2 ||  stadeProjet == 3){
					
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3, .item-2-6').removeClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 1){
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3').removeClass('hide-item');
				$('.item-2-6').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 4){
				
				$('.item-1-6, .item-1-5, .item-1-4, .item-2-6').removeClass('hide-item');		
				$('.item-1-3').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 5){
				
				$('.item-1-6, .item-1-5, .item-2-6').removeClass('hide-item');	
				$('.item-1-4, .item-1-3').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 6){
							
				$('.item-1-6, .item-2-6').removeClass('hide-item');					
				$('.item-1-5, .item-1-4, .item-1-3').addClass('hide-item');
				
				disableCleaner();
				
			}
			
			else{
				
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3, .item-2-6').addClass('hide-item');			
			}
			
			
		}	
			
		// type energie 
		if(typeEnergie != 12){
			$('.type-eco-energ').addClass('sub-hide-item');
			$('.type-non-eco-energ').removeClass('sub-hide-item');
			
			$('#puissance_prevue, #unites_production, #objectif_production').removeClass('hide-item').attr('disabled', false);			
			$('#objectif_economie').addClass('hide-item').attr('disabled', true).val('');
		}
		else{
			$('.type-eco-energ').removeClass('sub-hide-item');
			$('.type-non-eco-energ').addClass('sub-hide-item');
			
			$('#puissance_prevue, #unites_production, #objectif_production').addClass('hide-item').attr('disabled', true).val('');			
			$('#objectif_economie').removeClass('hide-item').attr('disabled', false);	
		}
		
		if(typeEnergie == 14){
			$('#source_energie_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#source_energie_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		
		// champs autres etc...
		// connu comment
		if($('input[name=connu_comment]:checked').val() != "Autres"){
			$('#connu_autre').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		else{
			$('#connu_autre').removeClass('sub-hide-item').attr('disabled', false);				
		}
		// collectif
		if($('input[name=collectif]:checked').val() != "Autres"){
			$('#autre_collectif').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		else{
			$('#autre_collectif').removeClass('sub-hide-item').attr('disabled', false);				
		}
		// entite_porteuse
		if($('input[name=entite_porteuse]:checked').val() == "Autres"){
			$('#nom_entite_porteuse').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#nom_entite_porteuse').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		
		// envoie de fichier formalisé
		/*if($('input[name=projet_formalise]:checked').val() == "Oui"){
			$('#fichier-projet_formalise').removeClass('sub-hide-item');
		}
		else{
			$('#fichier_projet_formalise').addClass('sub-hide-item');
			$('#fichier_projet_formalise').replaceWith( $('#fichier_projet_formalise').val('').clone( true ) );
		}*/
		// actions_sensibilisation
		if($('input[name=actions_sensibilisation]:checked').val() == "oui"){
			$('#actions_sensibilisation_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#actions_sensibilisation_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		// dispositions_securisant
		if($('input[name=dispositions_securisant]:checked').val() == "oui"){
			$('#dispositions_securisant_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#dispositions_securisant_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		// demande_financement
		if($('input[name=demande_financement]:checked').val() == "oui"){
			$('#montant_financement').removeClass('sub-hide-item').attr('disabled', false);
			$('#montant_financement_label').removeClass('sub-hide-item');
		}
		else{
			$('#montant_financement').addClass('sub-hide-item').attr('disabled', true).val('');
			$('#montant_financement_label').addClass('sub-hide-item');
		}
	}	
	
	function disableCleaner(){		
		// initialise les champs pour la validation (en fonction de l'état d'avancement du projet)				
		$('input:text.hide-item, textarea.hide-item').each(function( index ) {						
			$(this).attr('disabled', true);
			$(this).val('');			
		});
		
		$('input:radio.hide-item').each(function( index ) {			
			$(this).attr('disabled', true);
			$(this).prop('checked', false );			
		});
		
		$('select.hide-item').each(function( index ) {			
			$(this).attr('disabled', true);
			//$(this).val('');			
		});
		
		$('input:text, textarea, input:radio, select').not('.hide-item').each(function( index ) {		
			$(this).attr('disabled', false);
		});
		
	}