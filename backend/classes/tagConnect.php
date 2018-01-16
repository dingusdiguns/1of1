<?php
  require_once(dirname(__FILE__).'/AbstractClass.php' );
  require_once(dirname(__FILE__).'/tag.php' );

  class TagConnect extends AbstractClass{
    public function __construct( $tag, $id ){
      $this->tag = $this->getTagId( $tag );
      $this->post = $id;
      $validations = $this->checkValidations( 1 );
      if( $validations ){
        $instanceVariables = array( "post", "tag" );
        $id = $this->fuck( self::class,
        $this->getParams( $instanceVariables ));
        $this->$id = $id;
      }
    }

    protected function getTagId( $tag ){
      $tag = new Tag( $tag );
      return $tag->id;
    }

    protected function checkValidations( $params ){
      $connect = AbstractClass::find( array( "tag" => $this->tag, "post" => $this->post ), "tagConnect" );
      if( $connect !== false ){
        return false;
      }else{
        return true;
      }
    }
  }
?>
