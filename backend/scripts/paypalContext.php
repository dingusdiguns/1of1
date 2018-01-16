<?php
require_once( dirname(__FILE__).'../../../vendor/autoload.php' );

  class Context{
    public function getContext(){
      $apiContext = new \PayPal\Rest\ApiContext(
              new \PayPal\Auth\OAuthTokenCredential(
                  'AcItMIDJH2eRzBS9e6NKgBELMsB9HFdwOc4uqCSzjgqviCeqzvw1QTXNtJjFtri43dQcoswGTeAvRa6T',     // ClientID
                  'EMHTdyjxE-nI8j8C3Y8HBdsKTHH8ENhw3YdnHhGRMBc0Y8N4MAfh9umly1FB36xG6iCog-H-ZiP4EhxW'      // ClientSecret
              )
      );

      $config = array(
          'mode' => 'sandbox',
          'acct1.UserName' => 'jb-us-seller_api1.paypal.com',
          'acct1.Password' => 'Fuckthis2012'
      );

      $apiContext->setConfig(
            $config
      );

      return $apiContext;
    }

  }

?>
