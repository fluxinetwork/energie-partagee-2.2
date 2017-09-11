<?php
$rows_capital = get_field('repartition_du_capital');
$count_financer = 0;

$array_citoyen_labels = array();
$array_prive_labels = array();
$array_citoyen_datas = array();
$array_prive_datas = array();

$total_capital = 0;
$citoyen_perc = 0;

if(!empty($rows_capital)){

	$nb_financer = count( get_field('repartition_du_capital') );
	$unite_perc = 100 / $nb_financer;

	// Count Loop
	foreach($rows_capital as $row){
		$id_financer='';
		$id_financer_data='';
		$total_capital = $total_capital + $row['capital'];	
	}
	 
	// Data loop
	foreach($rows_capital as $row){
		$id_financer='';
		$id_financer_data='';
							
		if($row['financement_prive'] == 1):
			$type_financer = ' prive';
			$count_financer ++;
			$jauge_length = ($row['capital'] * 100) / $total_capital;			
			$id_financer = 'id="segment-prive-' . $count_financer . '"';						
			$array_prive_labels [] = '<div class="graphbar__segment' . $type_financer . '" ' . $id_financer . ' style="width:'.$jauge_length.'%;"></div>';
			$id_financer_data = 'id="financer-prive-' . $count_financer . '"';
			$array_prive_datas [] = '<li class="financer' . $type_financer . '" ' . $id_financer_data . '><div class="dot"></div><div class="financer__infos"><span class="legende">' . $row['nom_financeur'] . '</span><span class="data-capital" data-capital="' . $row['capital'] .'"></span></div></li>';
		else:
			$jauge_length = ($row['capital'] * 100) / $total_capital;
			$citoyen_perc = $citoyen_perc + $jauge_length ;
			$type_financer = ' citoyen';						
			$array_citoyen_labels [] = '<div class="graphbar__segment' . $type_financer . '" style="width:'.$jauge_length.'%;"></div>';
			$array_citoyen_datas [] = '<li class="financer' . $type_financer . '"><div class="dot"></div><div class="financer__infos"><span class="legende">' . $row['nom_financeur'] . '</span><span class="data-capital" data-capital="' . $row['capital'] .'"></span></div></li>';
		endif;				
				
	}
	
	// Output	
	
	?>
    
    <aside class="repartition">
       <h3 class="h3">Répartition du capital</h3>
    
       <p><?php echo get_field('text_intro_capital'); ?></p>       
                 
       <div class="graphbar wrap-extend">			
		<?php   
		   // Print citoyen first
			foreach ($array_citoyen_labels as $key => $val) {
				echo $val;
			}
			// Print prive next
			foreach ($array_prive_labels as $key => $val) {
				echo $val;
			}		   
		?>   	
       </div>          
       
       
    	<div class="wrap-extend">
    		<?php $percent_pos = (round($citoyen_perc)>90) ? 50 : round($citoyen_perc); ?>
    		<div class="pointe--up" style="left:<?php echo ($percent_pos-1);?>%;"></div>
    	</div>
    
        <div class="infosbloc">          
          <h4>Capital citoyen à <span class="percent"><?php echo round($citoyen_perc);?>%</span></h4>
          <ul>
          <?php   
               // Print citoyen first
				foreach ($array_citoyen_datas as $key => $val) {
					echo $val;
				}
				// Print prive next
				foreach ($array_prive_datas as $key => $val) {
					echo $val;
				}	  
          ?>
          </ul>      
        </div>
    </aside>
<?php } ?>