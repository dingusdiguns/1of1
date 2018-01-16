<?php
require_once(dirname(__FILE__).'/AbstractClass.php' );
require_once(dirname(__FILE__).'/Text.php' );
require_once(dirname(__FILE__).'/PageImage.php' );


class Page extends AbstractClass{
  public function __construct( $name, $route ){
    $page = AbstractClass::find( array( "name" => $name ), "Page" );
    $this->name = $name;
    $this->route = $route;
    if( $page->name ){
      return $category->name;
    }else{
      $page = AbstractClass::fuck( "Page",
        array(
          "title" => $name,
          "name" => $name,
          "route" => $route
        )
      );
      return $this;
    }
  }

  public function createText( $text, $index, $pageName ){
    $page = AbstractClass::find( array( "name" => $pageName ), "Page" );
    $text = new Text( $text, $index, $page->id );
    return $text;
  }

  public function dropText( $name ){
    $page = AbstractClass::find( array( "name" => $name ), "Page" );
    $children = AbstractClass::getChildren( $page->id, "pageName", "Text" );
    foreach ($children as $index => $child) {
      AbstractClass::remove( $child->id, "Text" );
    }
  }

  public function dropImage( $pageName ){
    $page = AbstractClass::find( array( "name" => $pageName ), "Page" );
    $children = AbstractClass::getChildren( $page->name, "pageName", "PageImage" );
    foreach ($children as $index => $child) {
      PageImage::remove( $child->id );
      AbstractClass::remove( $child->id, "PageImage" );
    }
  }
  protected function genName(){
    return random_int( 0,99999999 );
  }

  protected function getName(){
    $name = Page::genName();
    $exist = file_exists( './assets/images/collection/'.$name.'.png' );
    while( $exist !== false ){
      $name = Page::genName();
      $exist = file_exists( './assets/images/collection/'.$name.'.png' );
    }
    return $name;
  }

  public function createImage( $image, $index, $pageName ){
    $name = Page::getName();
    file_put_contents('./assets/images/pages/'.$name.'.jpg', base64_decode( $image ));
    $page = AbstractClass::find( array( "name" => $pageName ), "Page" );
    $path = './assets/images/pages/'.$name.'.jpg';

    new PageImage( $path, $index, $pageName );
  }


  public function changeTitle( $page, $title ){
    AbstractClass::change( "Page", $page->id, array( "title" => $title ) );
  }

  protected function checkValidations( $params ){

  }
}

?>
