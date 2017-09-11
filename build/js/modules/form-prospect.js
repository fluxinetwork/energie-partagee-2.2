/* 
 * Add prospect and send information mail 
 * Return HTML
 */
function initSendMailPorspect (){
	
	$('#mailing_prospect button').attr('disabled',false);
			
	$('body').on('submit', 'form#mailing_prospect', function(e){  
			  
		e.preventDefault();	

		$('#mailing_prospect .button-round i').attr('class','spinner');

		 $.ajax({
			type: 'POST',
			dataType: 'JSON',
			url: ajax_object.ajax_url,
			data: $(this).serialize()+'&action=send_mail_prospect',
			success: function(data){
				$('#mailing_prospect .button-round i').attr('class','icon-check_64');
				$('#mailing_prospect button').attr('disabled',true);							
				if(data[0].validation == 'error'){					
					$('#mailing_prospect button').attr('disabled',false);
				}					
				$('.notify').html('<span class="'+data[0].validation+'">'+data[0].message+'</span>');							
				
			},
			error : function(jqXHR, textStatus, errorThrown) {								
				//console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
			}
	
		});
		return false; 
		
			  
	});
		
}
