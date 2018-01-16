<?php
  require_once(dirname(__FILE__).'/AbstractClass.php' );
  class Category extends AbstractClass{
    public function __construct( $name ){
      $category = AbstractClass::find( array( "name" => $name ), "Category" );
      if( $category->id && $category->name ){
        return $category->name;
      }else{
        $name = AbstractClass::fuck( "Category", array( "name" => $name ) );
        return $name;
      }
    }

    public function getAllCategories(){
      $categories = AbstractClass::all( "Category" );
      return $categories;
    }

    protected function checkValidations( $params ){

    }
  }
?>
