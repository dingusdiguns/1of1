<?php
    require_once(dirname(__FILE__).'/router.php' );
    require_once(dirname(__FILE__).'/views/index.php' );
    require_once( dirname(__FILE__).'/backend/controllers/paymentController.php' );
    require_once( dirname(__FILE__).'/backend/controllers/userController.php' );

    $router = new Router('/1of1/');

    $router->addDefault(function(){
      echo Indexmu::getIndex();
    });

    $router->addRoute( "addCardInfo/",
      function( $data ){
        echo PaymentController::addCard( $data["card"] );
      }
    );

    $router->addRoute( "login/",
      function( $data ){
        echo UserController::login( $data["user"] );
      }
    );

    $router->addRoute( "getCurrent/",
      function(){
        echo UserController::login( $data["user"] );
      }
    );

    $router->checkRoutes();
?>
