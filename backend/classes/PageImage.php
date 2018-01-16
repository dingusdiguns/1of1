<?php
class PageImage extends AbstractClass{
  public function __construct( $path, $index, $pageName ){
    $this->pageName = $pageName;
    $this->path = $path;
    $this->index = $index;
    $path = AbstractClass::fuck(
      "PageImage",
      array(
        "path" => $path,
        "pageIndex" => $index,
        "pageName" => $pageName
      )
    );
    return $this;
  }

  public function remove( $id ){
    $image = AbstractClass::find( array( "id" => $id ), "PageImage" );
    unlink( $image->path );

  }

  protected function checkValidations( $params ){

  }
}
?>
