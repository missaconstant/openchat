<?php

function dernierIdEnregistre($table,$bd){
    
    try { 
			$trouver = $bd->query("SELECT id$table FROM $table ORDER BY id$table DESC ") ; 
			$rows = $trouver->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_LAST);
			$trouver->closeCursor() ; 
			return $rows ; 
		} catch(Exception $ex) { 
			echo 'Erreur trouverDerneirEnregistre : ', $ex->getMessage() ; 
		}
        
    
}

//function calculerJoursDuMois($date){
//  $tableauDate = explode("-", $date);
//  
//  
//  $jours = cal_days_in_month(CAL_GREGORIAN, $tableauDate[1], $tableauDate[0]);
//    
//  return $jours;  
//}


function calculerCycleMensuel($datedebut1,$datedebut2){
   
$debut = strtotime($datedebut1);
$fin = strtotime($datedebut2);
$timeDiff = abs($fin - $debut);
$cycle = $timeDiff/86400; 
$cycleInt = intval($cycle);
     
  return $cycleInt;
    
}

function claculerCycle($cycleMensuel1,$cycleMensuel2,$cycleMensuel3){
    
  $cycle = intval(($cycleMensuel1+$cycleMensuel2+$cycleMensuel3)/3);
  return $cycle;
    
    
    
}



function calculerDebutProchaineMenstrue($date,$cycle){
    
    
$dateObj = new DateTime($date);
$dateObj->add(new DateInterval("P".$cycle."D")); // P1D means a period of 1 day
$menstrueProchaine = $dateObj->format('Y-m-d');
    
    
 return $menstrueProchaine ;
   
}



function calculerFinProchaineMenstrue($date,$dureeDerniereMenstrue ,$cycle){
    
    
$dateObj = new DateTime($date);
$dateObj->add(new DateInterval("P".$cycle."D")); // P1D means a period of 1 day
$menstrueProchaine = $dateObj->format('Y-m-d');
    
    
 return $menstrueProchaine ;
   
}

function calculerDateOvulation($menstrueProchaine){
    
//$dateOvulation = $menstrueProchaine - 14;
$dateObj = new DateTime($menstrueProchaine);
$dateObj->sub(new DateInterval("P14D")); // P1D means a period of 1 day
$dateOvulation = $dateObj->format('Y-m-d');

return $dateOvulation;  
    
       
}


function calculerPeriodeFertilite($dateOvulation){
    
$dateObjdebut = new DateTime($dateOvulation);
$dateObjdebut->sub(new DateInterval("P3D")); // P1D means a period of 1 day
$debutFertilite = $dateObjdebut->format('Y-m-d');

$dateObjFin = new DateTime($dateOvulation);
$dateObjFin->add(new DateInterval("P3D")); // P1D means a period of 1 day
$finFertilite = $dateObjFin->format('Y-m-d');
    
 //$debutFertilite = $dateOvulation-4;
 //$finFertilite = $dateOvulation+3;
 
 return array('debutFertilite'=>$debutFertilite,'finFertilite'=>$finFertilite);
    
}


// function calculerPeriodeProchaineRegle(){
    
    
    
    
// }
function intervalDate($debut, $fin)
{
	// Calculer la durée de règle
	$datetime1 = new DateTime($debut);
	$datetime2 = new DateTime($fin);
	$duree = $datetime1->diff($datetime2)->days; 
	return $duree;
}

function diffDate($datedebut, $datefin)
{
	$dureesejour = (strtotime($datefin) - strtotime($datedebut));  
	$dateRetour  = $dureesejour/86400;

	return $dateRetour;
}

function dateFormat($date)
{
	$date = explode("/", $date);
	$newDate = $date[2].'-'.$date[0].'-'.$date[1];
	return $newDate;
}

function dateFormat2($date)
{
	$date = explode("-", $date);
	$newDate = $date[2].'-'.$date[0].'-'.$date[1];
	return $newDate;
}



function dateEnFrancais($date)
{
	$date = explode("-", $date);
	$newDate = $date[2].'-'.$date[1].'-'.$date[0];
	return $newDate;
}


function dateEntier($date)
{
	$dateArray = explode("-", $date);

	$mois = Mois($dateArray[1]);
	// $jour = Jour($dateArray[2]);

	$dateRetour = $dateArray[2].' '.$mois.' '.$dateArray[0];
	return $dateRetour;

}

function Jour($jour)
{
	if($jour=='01')
		{ $jour="1";
	}elseif($jour=='02')
		{ $jour="2";
	}elseif($jour=='03')
		{ $jour="3";
	}elseif($jour=='04')
		{ $jour="4";
	}elseif($jour=='05')
		{ $jour="5";
	}elseif($jour=='06')
		{ $jour="6";
	}elseif($jour=='07')
		{ $jour="7";
	}
	$JourSemaine =array("", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
	return $JourSemaine[$jour];
}

function Mois($nbre)
{
	if($nbre=='01')
		{ $nbre="1";
	}elseif($nbre=='02')
		{ $nbre="2";
	}elseif($nbre=='03')
		{ $nbre="3";
	}elseif($nbre=='04')
		{ $nbre="4";
	}elseif($nbre=='05')
		{ $nbre="5";
	}elseif($nbre=='06')
		{ $nbre="6";
	}elseif($nbre=='07')
		{ $nbre="7";
	}elseif($nbre=='08')
		{ $nbre="8";
	}elseif($nbre=='09')
		{ $nbre="9";
	}
	$mois =array("", "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE");
	return $mois[$nbre];
}

// FOnction e creation de mot de passe
function passWord($nbre)
{
	$motdepasse = "";
	$Chiffre ="0123456789";
	for ($i=0; $i < $nbre; $i++) { 
		$caratere = mt_rand(0,$nbre);
		$motdepasse .= $caratere;
	}
	return $motdepasse;
}