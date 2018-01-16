<?php
require_once(dirname(__FILE__).'/AbstractClass.php' );

class Text extends AbstractClass{
  public function __construct( $text, $index, $pageName ){
    $this->pageName = $pageName;
    $this->text = $text;
    $this->index = $index;
    $text = AbstractClass::fuck(
      "Text",
      array(
        "pageName" => $pageName,
        "text" => $text,
        "pageIndex" => $index
      )
    );
    return $text;
  }
  protected function checkValidations( $params ){

  }
}
?>
