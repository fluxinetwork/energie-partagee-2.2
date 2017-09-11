<?php

$ouput = '';

if ( $hasResults ) {

	$ouput .= '<a href="'. get_permalink(). '">';

	//$class = ( get_field('type_formation') == 'Formation' ) ? 'c-formation' : 'c-formation c-formation--webinaire';
	$class = 'c-formation';

	$date = '<div class="c-formation__meta__date">'. get_field('date_event') .'</div>';

	$meta = '<div class="c-formation__infos__meta">';
	//$meta .= '<span>'. get_field('type_formation') .'</span> - ';
	$meta .= get_field('ville_event');
	$meta .= '</div>';

	$title = get_the_title();

} else  {

	$class = 'c-formation c-formation--void';

	$date = '<div class="button-round grey"><i class="icon-plus_64"></i></div>';

	$meta = '';

	$title = 'Aucun résultat pour cette catégorie.';

}


$ouput .= '<article class="'. $class .'">';
	$ouput .= $date;
	$ouput .= '<div class="c-formation__infos">';
		$ouput .= $meta;
		$ouput .= '<h1 class="c-formation__infos__title">'. $title .'</h1>';
	$ouput .= '</div>';
$ouput .= '</article>';


if ( $hasResults ) {

	$ouput .= '</a>';

}

echo $ouput;

?>
