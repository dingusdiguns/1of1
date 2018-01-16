<?php
require_once( dirname(__FILE__).'../../../vendor/autoload.php' );
require_once( dirname(__FILE__).'../../scripts/paypalContext.php' );
require_once( dirname(__FILE__).'/userController.php' );
require_once( dirname(__FILE__).'../../classes/user.php' );

class PaymentController{

  public function addCard( $card ){

    $type = $card["type"];
    $number = $card["number"];
    $expMonth = $card["expMonth"];
    $expYear = $card["expYear"];
    $cvv2 = $card["cvv2"];
    $first = $card["firstName"];
    $last = $card["lastName"];
    $user = UserController::currentUser();
    $context = Context::getContext();
    $creditCard = new \PayPal\Api\CreditCard();
    $creditCard->setType($type)
            ->setNumber($number)
            ->setExpireMonth($expMonth)
            ->setExpireYear($expYear)
            ->setCvv2($cvv2)
            ->setFirstName($firstName)
            ->setLastName($lastName);

    try {
            $creditCard->create($context);
            if( $user->email ){
              $card = User::addCard( $user->id, $creditCard->id, $type, $number );
              echo json_encode( $card );
            }
            echo json_encode( $creditCard );
    }
    catch (\PayPal\Exception\PayPalConnectionException $ex) {
            echo json_encode( $ex->getData() );
    }
  }


}

 ?>
