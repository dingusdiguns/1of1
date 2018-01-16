<?php
  require_once(dirname(__FILE__).'/AbstractClass.php' );
  require_once(dirname(__FILE__).'/category.php' );
  require_once(dirname(__FILE__).'/tagConnect.php' );
  require_once(dirname(__FILE__).'../../scripts/connect.php' );

//skew number

  class Post extends AbstractClass{
    public function __construct( $sku, $title, $color, $size, $gender, $category, $image ){
      $this->title = $title;
      $this->color = $color;
      $this->size = $size;
      $this->zzId = $sku;
      $this->getPath($image);
      $cat = new Category( $category );
      $this->category = $category;
      $this->popularity = 0;
      $validations = $this->checkValidations( "cool" );
      $instanceVariables = array(  "title", "color", "size", "category", "path", "popularity", "zzId" );
      $id = $this->fuck( self::class,
      $this->getParams( $instanceVariables ));
      $this->id = $id;
    }
    //
    protected function getPath( $image ){
      $name = $this->getName();
      file_put_contents('./assets/images/collection/'.$name.'.jpg', base64_decode( $image ));
      $this->path = './assets/images/collection/'.$name.'.jpg';
    }

    protected function getName(){
      $name = $this->genName();
      $exist = file_exists( './assets/images/collection/'.$name.'.png' );
      while( $exist !== false ){
        $name = $this->genName();
        $exist = file_exists( './assets/images/collection/'.$name.'.png' );
      }
      return $name;
    }

    protected function genName(){
      return random_int( 0,99999999 );
    }

    public function addTag( $tag ){

      $tag = new TagConnect( $tag, $this->id );
    }

    public function getPosts( $start, $num, $category, $tags ){
      if( sizeof( $tags ) === 0  && !$category ){
        $posts = AbstractClass::queryAndCount(
          "SELECT SQL_CALC_FOUND_ROWS *, Post.* FROM Post LIMIT ".$start.", ".$num
        );
        return $posts;
      }else if( $category !== "" ){
        $query = "SELECT SQL_CALC_FOUND_ROWS *, Post.*, count(Tag.id) as postcount from Post INNER JOIN Category ON Post.category = Category.name INNER JOIN tagConnect ON Post.id = TagConnect.post INNER JOIN tag ON TagConnect.tag = Tag.id WHERE";
        $query = $query." (Category.name='".$category."')";
        foreach( $tags as $index => $tag ){
          if( $index === 0 ){
            $query = $query."AND (Tag.name='".$tag."')";
          }else{
            $query = $query." OR ( Tag.name='".$tag."')";
          }
        }
        $query = $query."GROUP BY Post ORDER BY postcount DESC LIMIT ".$start.", ".$num;
        $posts = AbstractClass::queryAndCount(
          $query
        );
        $posts->count = AbstractClass::getTableSize("Post")->count;
        return $posts;
      }else{
        $query = "SELECT SQL_CALC_FOUND_ROWS *, Post.*, count(Tag.id) as postcount from Post INNER JOIN Category ON Post.category = Category.name INNER JOIN TagConnect ON Post.id = TagConnect.post INNER JOIN Tag ON TagConnect.tag = Tag.id WHERE";
        foreach( $tags as $index => $tag ){
          if( $index === 0 ){
            $query = $query." (Tag.name='".$tag."')";
          }else{
            $query = $query." OR ( Tag.name='".$tag."')";
          }
        }
        $query = $query."GROUP BY post ORDER BY postcount DESC LIMIT ".$start.", ".$num;
        $posts = AbstractClass::queryAndCount(
          $query
        );
        return $posts;
      }

    }

    public function deletePost( $id ){
      $post = AbstractClass::find( array( "id" => $id ), "Post" );
      unlink( $post->path );
      $post = AbstractClass::destroyIfExists( "Post", array( "id" => $id ) );
      return $post;
    }

    public function getTags( $id ){
      $tags = AbstractClass::childThrough(
        array(
          "name" => "Post",
          "on" => "id"
        ),
        array(
          "name" => "TagConnect",
          "first" => "Post",
          "second" => "Tag",
        ),
        array(
          "name" => "Tag",
          "on" => "id"
        ),
        "WHERE Post.id = ".$id
      );

      return $tags;

    }

    protected function checkValidations( $params ){
      return true;
    }
  }
?>
