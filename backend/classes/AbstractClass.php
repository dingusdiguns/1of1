<?php
require_once(dirname(__FILE__).'../../scripts/connect.php' );

abstract class AbstractClass
{
    abstract protected function checkValidations($params);
    public function find( $params, $className ){
      if( $rows > 0 ){
        $obj = mysqli_fetch_object($res);
        return $obj;
      }
      $connection = Connect::getConnection();
      $query = "SELECT * FROM ".$className." WHERE ";
      foreach( $params as $name => $value  ){
        $query = $query." ".$name." = '".$value."' AND";
      }
      $query = substr($query, 0, -3);
      $res = $connection->query($query);
      $rows = mysqli_num_rows( $res );
      if( $res && $rows > 0 ){
        $obj = mysqli_fetch_object($res);
        return $obj;
      }else{
        return false;
      }
    }

    public function remove( $id, $className ){
      $connection = Connect::getConnection();
      $query = "DELETE FROM ".$className." WHERE id=".$id;
      $res = $connection->query($query);
      return $res;
    }

    public static function all( $class ){
      $connection = Connect::getConnection();
      $query = 'SELECT * FROM 1of1.'.$class;
      $res = $connection->query($query);
      $output = array();
      while( $row = mysqli_fetch_object( $res ) ){
        array_push( $output, $row );
      }
      return $output;
    }

    public function drop( $className ){
      $connection = Connect::getConnection();
      $query = 'DROP Table '.$className;
      $res = $connection->query($query);

    }

    public function fuck( $className, $params ){
      $connection = Connect::getConnection();
      AbstractClass::checkTable( $className, $params );
      $query = 'INSERT INTO 1of1.'.$className.' (';
      foreach( $params as $name=>$value ){
          $query = $query.' '.$name.',';
      }
      $query = substr($query, 0, -1);
      $query = $query.') VALUE (';
      foreach( $params as $name=>$value ){
          $query = $query.' "'.$value.'",';
      }

      $query = substr($query, 0, -1);
      $query = $query.')';
      $res = $connection->query($query);
      $object = AbstractClass::find( $params, $className );
      return $object->id;
    }

    public function destroyIfExists( $className, $params ){
      $connection = Connect::getConnection();
      $query = "DELETE FROM ".$className." WHERE ";
      foreach( $params as $name => $value  ){
        $query = $query." ".$name." = '".$value."' AND";
      }
      $query = substr($query, 0, -4);
      $res = $connection->query($query);
      return $res;
    }

    public function getParentClass( $id, $parentClass, $names ){
      $connection = Connect::getConnection();
      $query = "SELECT * FROM ".$parentClass." WHERE id = '".$id."'";
      $res = $connection->query($query);
      $row = mysqli_fetch_object( $res );
      $obj = array();
      foreach( $names as $index=>$name ){
        $value = $row->$name;
        $key = $name;
        $obj[$key] = $value;
      }
      return $obj;
    }



    public function getTableSize( $tableName ){
      $connection = Connect::getConnection();
      $query = "SELECT Count(*) as count FROM ".$tableName;
      $res = $connection->query($query);
      $output = mysqli_fetch_object( $res );
      return $output;
    }

    public function getChildren( $id, $key, $childClass ){
      $connection = Connect::getConnection();
      $query = "SELECT * FROM ".$childClass." WHERE ".$key." = '".$id."'";
      $res = $connection->query($query);
      $num_rows = mysqli_num_rows($res);
      $output = array();
      while( $obj = mysqli_fetch_object( $res ) ){
        array_push( $output, $obj );
      }
      return $output;
    }

    public function query( $query ){
      $connection = Connect::getConnection();
      $res = $connection->query( $query );
      $output = array();
      while( $obj = mysqli_fetch_object( $res ) ){
        array_push( $output, $obj );
      }
      return $output;
    }

    public function queryAndCount( $query ){
      $connection = Connect::getConnection();
      $res = $connection->query( $query );
      $count = $connection->query( "Select FOUND_ROWS()" );
      $count = mysqli_fetch_object( $count );
      $output = array();
      $output["count"] = $count;
      while( $obj = mysqli_fetch_object( $res ) ){
        array_push( $output, $obj );
      }
      return $output;
    }

    public function findLike( $query, $param, $className ){
      $connection = Connect::getConnection();
      $query = "Select * FROM ".$className." WHERE ".$param." LIKE '".$query."%'";
      $res = $connection->query( $query );
      $output = array();
      while( $obj = mysqli_fetch_object( $res ) ){
        array_push( $output, $obj );
      }
      return $output;
    }

    public function checkTable( $className, $params ){
      $connection = Connect::getConnection();
      $query = "SHOW TABLES LIKE '".$className."'";
      $result = $connection->query($query);
      $tableExists = mysqli_num_rows($result) > 0;
      if( $tableExists ){
        return;
      }else{
        $newQ = "CREATE TABLE ".$className." ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,";
        foreach( $params as $name => $value ){
          $type = $this->getType($value);
          $newQ = $newQ." ".$name." ".$type." NOT NULL";
          if( $index != sizeof( $names ) - 1 ){
            $newQ = $newQ.",";
          }
        }
        $newQ = substr($newQ, 0, -1);
        $newQ = $newQ." )";
        $res = $connection->query( $newQ );
      }
    }

    public function childThrough( $parentClass, $connecting, $childClass, $where ){
      $connection = Connect::getConnection();
      $query = "Select * FROM ".$parentClass["name"];
      $query = $query." Inner Join ".$connecting["name"]." On ".$connecting["name"].".".$connecting["first"]." = ".$parentClass["name"].".".$parentClass["on"];
      $query = $query." Inner Join ".$childClass["name"]." On ".$childClass["name"].".".$childClass["on"]." = ".$connecting["name"].".".$connecting["second"];
      $query = $query." ".$where;

      $res = $connection->query( $query );
      $rows = mysqli_num_rows($res);
      $output = array();
      while( $obj = mysqli_fetch_object( $res ) ){
        array_push( $output, $obj );
      }
      return $output;
    }

    private function getType( $thing ){
      $type = gettype($thing);
      if( $type == string ){
        if( strlen( $thing ) < 60 ){
          return "VARCHAR(60)";
        }elseif( strlen( $thing ) < 200 ){
          return "VARCHAR(200)";
        }elseif( strlen( $thing ) < 600 ){
          return "VARCHAR(600)";
        }else{
          return "VARCHAR(7000)";
        }
      }else{
        return "INT(6) UNSIGNED";
      }
    }

    public function change( $className, $id, $data ){
      $connection = Connect::getConnection();

      $query = "UPDATE ".$className." SET ";
      foreach( $data as $key => $value ){
        if( $key !== 'id' ){
          $query = $query.$key." = '".$value."', ";
        }
      }
      $query = substr($query, 0, -2);
      $query = $query." WHERE id = ".$id;
      $res = $connection->query( $query );
    }



    public function getParams( $params ){
      $output = array();
      foreach ($params as &$value) {
        $param = get_object_vars( $this )[$value];
        $output[$value] = $param;
      }
      return $output;
    }



}
?>
