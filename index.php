<?php


require_once(dirname(__FILE__).'/backend/scripts/connect.php' );
require_once(dirname(__FILE__).'/router.php' );
require_once(dirname(__FILE__).'/views/index.php' );

//
$r = new Router( "/1of1" );
$r->addDefault( function(){
  echo Indexmu::getIndex();
 });
$r->addRoute( "/getToken", function(){
});
$r->checkRoutes();

?>
