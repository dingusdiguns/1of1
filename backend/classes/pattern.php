<?php
require_once(dirname(__FILE__).'/AbstractClass.php' );

class Pattern extends AbstractClass{
  public function __construct( $index ){
    $this->idx = $index;
    $this->path = "./assets/images/patterns/".$index.".png";
    $validation = $this->checkValidations( $index );
    if( $validation ){
      $instanceVariables = $this->getParams( array( "idx", "path" ) );
      AbstractClass::fuck( "Pattern", $instanceVariables);
    }
  }

  public function checkValidations( $index ){
    $pattern = AbstractClass::find(  array( "idx" => $index ), "Pattern" );
    if( !$pattern ){
      return true;
    }
  }
}
?>
