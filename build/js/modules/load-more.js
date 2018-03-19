/*
 * Load more projects on trio-projects
 * Return JSON
 */
function initLoadMoreProjectsBtn (){
	$('.js-more-project').attr('disabled',false);
	$('.js-more-project').on( 'click', function ( e ) {
		e.preventDefault();
		$('.js-more-project').attr('disabled',true).html('<i class="spinner green"></i>');;
		loadMoreProjects();
	});
}

function loadMoreProjects(){

    offsetProject = offsetProject + 2;
	limiteProjectLoading++;

    var str = 'offset='+offsetProject+'&action=more_project_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        success: function(data){
            var sourceUrl;
            $.each(data, function(i){
                      
                var terms_nrj = data[i].classSlug;

                var $firstItem = $('.trio-card .box .box__half:eq(0)');
                var $secondItem = $('.trio-card .box .box__half:eq(1)');
                var content ='<a class="card card-project anim-out'+terms_nrj+'" href="'+data[i].permalink+'"><div class="card__img"><img class="img-reponsive" src="'+data[i].image+'"><i class="card__icon icon-uniE60F"></i></div><div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div></a>';
                sourceUrl = data[i].sourceUrl;

                if(i > 0){
                    $secondItem.find('.card-project').addClass('anim-out');
                    setTimeout(function() {
                        $secondItem.find('.card-project').remove();
                        $secondItem.append(content);
                        setTimeout(function() {
                            $secondItem.find('.card-project').removeClass('anim-out');
                        }, 50);
                    }, 220);

                }else{
                    $firstItem.find('.card-project').addClass('anim-out');
                    setTimeout(function() {
                        $firstItem.find('.card-project').remove();
                        $firstItem.append(content);
                        setTimeout(function() {
                            $firstItem.find('.card-project').removeClass('anim-out');
                        }, 50);
                    }, 220);
                }

            });

            if(limiteProjectLoading < 2){
                $('.js-more-project').attr('disabled',false).html('<i class="icon-chevronright_64"></i>');
            }else{
                $('.js-more-project').remove();
                $('.trio-card .box__fixe').append('<a href="'+sourceUrl+'" class="button-round grey"><i class="icon-plus_64"></i></a>');
            }

        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('.js-more-project').attr('disabled',false).html('<i class="icon-chevronright_64"></i>');
            //console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false;


}
/*
 * Load more projects on mobil page projects
 * Return JSON
 */
function initLoadMoreProjectsCardsBtn (){
    $('.js-more-procards').attr('disabled',false);
    $('.js-more-procards').on( 'click', function ( e ) {
        e.preventDefault();
        $('.js-more-procards').attr('disabled',true).html('<i class="spinner"></i>');
        loadMoreProjectsCards();
    });
}
function loadMoreProjectsCards(){

    offsetProject = offsetProject + 6;

    var nbTotalCards = $('.map-projects').data('nbcards');

    var str = 'offset='+offsetProject+'&posts_per_page=6&action=more_project_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,        
        success: function(data){

            $.each(data, function(i){

                nbloadedCards++;

                var categoryNRJ = (data[i].catSlug).substring(0, 5);

                var cardContent = '<article class="card-map c-'+categoryNRJ+' anim-out">';
                        cardContent += '<header class="card card-project">';
                            cardContent += '<a href="'+data[i].permalink+'">';
                                cardContent += '<div class="card__img" style="background-image:url('+data[i].image+')"><i class="card__icon"></i><span class="tag is-inactive">'+data[i].stadeName+'</span></div>';
                                cardContent += '<div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div>';
                            cardContent += '</a>';
                        cardContent += '</header>';
                    cardContent += '</article>';

                addCardContent('cardmap', cardContent, nbloadedCards-1, i);

                if(nbloadedCards < nbTotalCards-1){
                    $('.js-more-procards').attr('disabled',false).html('Charger plus');                    
                } else{
                    $('.js-more-procards').parent().hide(300);                   
                }
            });

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false;

}

/*
 * Load more news/event
 * Return HTML
 */
function initLoadMorePostsBtn (){
    $('.js-more').attr('disabled',false);

	$('.js-more').on( 'click', function ( e ) {
		e.preventDefault();
		$('.js-more').attr('disabled',true);

		var category = $(this).data('cat');

		loadPosts(category);
	});
}
/*
 * Load 
 * @param : category (number)
 */
function loadPosts(category){    

    var totalposts = $('.fluxi-content').data('totalposts');   

    var str = '&cat=' + category + '&offset=' + offsetPost + '&ppp=' + ppp + '&action=more_post_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        beforeSend : function() {
            $('.js-more').html('<i class="spinner"></i>');            
        },
        success: function(data){

            var $data = $(data);
            
            if($data.length != 0){
                $('.js-more').attr('disabled',false);
                $('.js-more').html('Charger plus');

                $.each(data, function(i){                     
                    
                    var $output = '<a class="card-news anim-out" href="'+data[i].permalink+'">';
                        $output += '<div class="card__img"><img class="img-responsive" src="'+data[i].img+'" alt="'+data[i].title+'"></div>';
                        $output += '<div class="card__infos">';
                            $output += '<span class="tag is-inactive">'+data[i].date+'</span>';
                            $output += '<h1 class="card__title">'+data[i].title+'</h1>';
                        $output += '</div>';
                    $output += '</a>';    

                    addCardContent ('posts', $output, offsetPost, i);
                    offsetPost ++;

                    if(offsetPost >= totalposts){
                        $('.js-more').attr('disabled',true).remove();                       
                    }
                    
                });
            } else{
                $('.js-more').attr('disabled',true).remove();                                         
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    

    return false;
}

/*
 * Add and animate content of ajax loaded object
 * @param : type (string) => string for modifier process
 * @param : content (jquery | html) => html or jquery element
 * @param : domId (number) => element index in the page
 * @param : factor (number) => index to factor the animation delay
 */
function addCardContent (type, content, domId, factor){
    if(type == 'cardmap'){
        $('.cards-map').append(content);
        setTimeout(function() {
            $('.cards-map').find('.card-map:eq('+domId+')').removeClass('anim-out');
        }, 200*factor);
    }else{
        $('.js-inject-news').append(content);
        setTimeout(function() {
            $('.card-news:eq('+(domId-2)+')').removeClass('anim-out');
        }, 200*factor);
    }

}



