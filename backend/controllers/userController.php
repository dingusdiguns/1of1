<?php
require_once( dirname(__FILE__).'../../classes/user.php' );

class UserController{
  public function createUser( $data ){
    $email = $data["email"];
    $password = $data["password"];
    $user = new User( $email, $password );
  }
  // //
  public function currentUser(){
    session_start();
    if( isset(  $_SESSION["userCookie"] ) ) {
      $token = $_SESSION["userCookie"];
      $user = User::getUserBySessionToken( $token );
      echo json_encode( $user );
    }else{
      echo json_encode( array( "error"=> "no user" ) );
    }
  }
  //
  public function getUser(){
    $user = UserController::currentUser();
    echo json_encode( $user );
  }
  //
  public function login( $data ){
    $email = $data["email"];
    $password = $data["password"];
    $user = User::login( $email, $password );
    echo json_encode( $user );
  }
}

?>
