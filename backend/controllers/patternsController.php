<?php
require_once( dirname(__FILE__).'../../classes/pattern.php' );

class PatternsController{
  public function getPatterns(){
    $patterns = AbstractClass::all( "Pattern" );
    echo json_encode( $patterns );
  }

}

?>
