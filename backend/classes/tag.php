<?php
  require_once(dirname(__FILE__).'/AbstractClass.php' );
  class Tag extends AbstractClass{
    public function __construct( $name ){
      $validations = $this->checkValidations( $name );
      $this->name = $name;
      if( $validations ){
        $instanceVariables = array( "name" );
        $id = $this->fuck( self::class,
        $this->getParams( $instanceVariables ));
        $this->id = $id;
      }else{
        $tag = AbstractClass::find( array( "name" => $name ), "Tag" );
        $this->id = $tag->id;
      }
    }

    public function getPosts( $name, $index ){
      $posts = AbstractClass::childThrough(
        array(
          "name" => "Tag",
          "on" => "id"
        ),
        array(
          "name" => "TagConnect",
          "first" => "tag",
          "second" => "post",
        ),
        array(
          "name" => "Post",
          "on" => "id"
        ),
        "WHERE Tag.name = '".$name."'"
      );

      return $posts;
    }

    public function autoFill( $query ){
      $tags = AbstractClass::findLike( $query, "name", "Tag" );
      return $tags;
    }

    protected function checkValidations( $params ){
      if( AbstractClass::checkTable( self::class, array( "name" => "awesome" ) ) || !AbstractClass::find( array( "name" => $params ), "Tag" ) ){
        return true;
      }else{
        return false;
      }
    }
  }
?>
