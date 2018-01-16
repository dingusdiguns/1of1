<?php
  require_once(dirname(__FILE__).'/AbstractClass.php' );
  require_once(dirname(__FILE__).'/card.php' );

  class User extends AbstractClass{
    public function __construct( $email, $password ){
      $validations = $this->checkValidations( array( "email" => $email, "password" => $password ) );
      if( $validations ){
        $this->email = $email;
        $this->approval = false;
        $this->passwordDigest = $this->digestPassword( $password );
        $this->sessionToken = $this->updateSessionToken( $this );
        $this->setCookie( $this->sessionToken, $this );
        $instanceVariables = array( "email", "passwordDigest", "sessionToken", "approval" );
        $panel = AbstractClass::fuck( "User",
        AbstractClass::getParams( $instanceVariables ));
      }
      return $this;
    }

    public function approve( $sessionToken ){
      $user = AbstractClass::find( array( "sessionToken" => $sessionToken ), "User" );
      AbstractClass::change( "User", $user->id, array( "approval" => true ) );
    }

    public function genSessionToken(){
      return random_int( 0,99999999 );
    }

    public function updateSessionToken( $user ){
      $sessionToken = User::genSessionToken();
      while( AbstractClass::find( array( "sessionToken" => $sessionToken ), "User" ) ){
        $sessionToken = User::genSessionToken();
      }
      AbstractClass::change("User", $user->id, array( "sessionToken" => $sessionToken ));
      return $sessionToken;
    }

    public function logout( $email ){
      $user = AbstractClass::find( array( "email" => $email ), "User" );
      User::updateSessionToken( $user );
    }

    public function login( $email, $password ){
      $user = AbstractClass::find( array( "email" => $email ), "User" );
      $digest = $user->passwordDigest;
      $verify = password_verify( $password, $digest );
      if( $verify ){
        $token = User::updateSessionToken( $user );
        User::setCookie( $token, $user );
        return $user;
      }else{
        return array( "error" => "Error: this is the wrong email / password combination" );
      }
    }

    public function setCookie( $sessionToken, $user ){
      session_start();
      $_SESSION["userCookie"] = $sessionToken;

    }

    public function addCard( $userId, $creditCard, $type, $number ){
      $card = new Card( $userId, $creditCard, $type, $number );
      return $card;
    }

    public function getUserBySessionToken( $sessionToken ){
      $user = AbstractClass::find( array( "sessionToken" => $sessionToken ), "User" );
      return $user;
    }

    protected function digestPassword( $password ){
      return password_hash($password, PASSWORD_BCRYPT);
    }


    protected function checkValidations( $params ){
      $email = $this->checkValidEmail( $params["email"] );
      $password = $this->checkPasswordValidations( $params["password"] );
      $exist = AbstractClass::find( array( "email" => $params["email"] ), "User" );
      if( $email && $password && $exist === false ){
        return true;
      }else if( $exist ){
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
