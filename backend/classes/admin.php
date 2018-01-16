<?php
  require_once(dirname(__FILE__).'/AbstractClass.php' );

  class Admin extends AbstractClass{
    public function __construct( $email, $password ){
      $validations = $this->checkValidations( array( "email" => $email, "password" => $password ) );
      if( $validations ){
        $this->email = $email;
        $this->passwordDigest = $this->digestPassword( $password );
        $this->sessionToken = $this->updateSessionToken( $this );
        $this->setCookie( $this->sessionToken );
        $instanceVariables = array( "email", "passwordDigest", "sessionToken" );
        $panel = $this->fuck( self::class,
        $this->getParams( $instanceVariables ));
      }
    }

    public function genSessionToken(){
      return random_int( 0,99999999 );
    }

    public function updateSessionToken( $user ){
      $sessionToken = Admin::genSessionToken();
      while( AbstractClass::find( array( "sessionToken" => $sessionToken ), "Admin" ) ){
        $sessionToken = Admin::genSessionToken();
      }
      AbstractClass::change("Admin", $user->id, array( "sessionToken" => $sessionToken ));
      return $sessionToken;
    }

    public function logout( $email ){
      $user = AbstractClass::find( array( "email" => $username ), "Admin" );
      Admin::updateSessionToken( $user );
    }

    public function findUser( $username, $password ){
      $user = AbstractClass::find( array( "email" => $username ), "Admin" );
      $digest = $user->passwordDigest;
      $verify = password_verify( $password, $digest );
      if( $verify ){
        $token = Admin::updateSessionToken( $user );
        Admin::setCookie( $token, $user );
        return $user;
      }else{
        return array( "error" => "Error: this is the wrong email / password combination" );
      }
    }

    public function setCookie( $sessionToken, $user ){
      session_start();
      $_SESSION["user"] = $sessionToken;
    }

    public function getUserBySessionToken( $sessionToken ){
      $user = AbstractClass::find( array( "sessionToken" => $sessionToken ), "Admin" );
      return $user;
    }

    protected function digestPassword( $password ){
      return password_hash($password, PASSWORD_BCRYPT);
    }


    protected function checkValidations( $params ){
      $email = $this->checkValidEmail( $params["email"] );
      $password = $this->checkPasswordValidations( $params["password"] );
      $exist = $this->find( array( "email" => $params["email"] ), "Admin" );
      if( $email && $password && $exist === false ){
        return true;
      }else if( $exist ){
        echo "Admin exists";
        return false;
      }else{
        return false;
      }
    }

    protected function checkValidEmail( $email ){
      if( strpos( $email, "@" ) ){
        if( strpos( $email, "." ) ){
          return true;
        }else{
          echo "valid emails must have '.' in them";
        }
      }else{
        echo "valid emails must have '@' in them";
      }
    }

    protected function checkPasswordValidations( $password ){
      if( strlen( $password ) > 6 ){
        return true;
      }else{
        echo "valid password length must be greater than 6";
      }
    }
  }
?>
