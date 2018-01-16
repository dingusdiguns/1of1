<?php
  class Connect{
    public static function getConnection(){
      // $servername = "auxabris.com";
      // $username = "fuckfuck";
      // $password = "Fuckthis2012";
      $servername = "localhost";
      $username = "root";
      $password = "root";

      // Create connection
      $conn = new mysqli($servername, $username, $password, "1of1");

      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }else {
      }
      return $conn;
    }
  }
?>
