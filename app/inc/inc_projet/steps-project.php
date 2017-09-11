<aside class="etapes">
  <h3 class="h3">Avancée du projet</h3>

  <div class="dotline wrap-extend">
    <div class="dotline__line">
      <div class="start"></div>
      <div class="end"></div>
    </div>
    
	<?php 
	
	// Steps project
	$is_active = false;
	$total_steps = 0;
	$count_steps_ok = 0;
	$pos_tri= '';
	
	$step_project = get_field('etapes_du_projet');
	
	$steps_field_key = "field_54087b8b8d8fe";
	$steps_field = get_field_object($steps_field_key);
	
	if( $steps_field ){
		echo '<div class="steps">';					
		foreach( $steps_field['choices'] as $k => $v ){
			
			$class_act='';			
			$total_steps++;
			
			if($k != $step_project):
				if($is_active):
					$class_act = ' is-inactive';
				else:
					$count_steps_ok++;
				endif;
			else:
				$is_active = true;
				$class_act = ' is-active';
				$count_steps_ok++;				
			endif;
			echo '<div class="dotline__step' . $class_act . '">
					  <span class="micro-legende">' . $v . '</span>
					  <div class="dot"></div>
					</div>';
		}
		echo '</div>';					
	}
	
	
	$step_perc = (100/$total_steps) * $count_steps_ok;
	
	if($count_steps_ok == 1):
		$pos_tri = 'left:8px';
	elseif($count_steps_ok == 2):	
		$pos_tri = 'left:20.3%';
	elseif($count_steps_ok == 3):	
		$pos_tri = 'left:39.4%';
	elseif($count_steps_ok == 4):	
		$pos_tri = 'left:58.4%';
	elseif($count_steps_ok == 5):	
		$pos_tri = 'left:77.5%';			
	else:
		$pos_tri = 'right:8px';
	endif;
	?>
    
  </div>
  
  <?php if(!empty(get_field('text_step_project'))):?> 
      <div class="infosbloc">
        <div class="pointe--up" style="<?php echo $pos_tri; ?>"></div>
        <?php if(!empty(get_field('title_step_project'))):?>
            <h4><?php echo get_field('title_step_project'); ?></h4>
        <?php endif;?>
        <p><?php echo get_field('text_step_project'); ?></p>
      </div>  
  <?php endif;?>
  
</aside>