<?php
require_once(dirname(__FILE__).'/AbstractClass.php' );

class Card extends AbstractClass{
  public function __construct( $userId, $creditId, $type, $number ){
    $this->userId = $userId;
    $this->creditId = $creditId;
    $this->type = $type;
    $this->number = $this->lastFour( $number );
    $instanceVariables = array( "userId", "number", "type", "creditId" );
    AbstractClass::fuck( "Card",
      AbstractClass::getParams( $instanceVariables )
    );
  }

  public function lastFour( $number ){
    return substr( $number, -4 );
  }

  public function checkValidations( $params ){

  }
}
?>
