const $ = require('jquery')
module.exports = {
  makePayment: function( cardInfo, callback ){
    $.ajax({
      url: `/1of1/addCardInfo/`,
      method: "Post",
      data: { card: cardInfo },
      success: function(data){
        cardInfo
        data = JSON.parse( data );
        callback( data );
      }
    })
  },

  login: function( user, callback ){
    $.ajax({
      url: `/1of1/login/`,
      method: "Post",
      data: { user: user },
      success: function(data){
        data = JSON.parse( data );
        callback( data );
      }
    })
  },

  getCurrentUser: function( callback ){
    $.ajax({
      url: `/1of1/getCurrent/`,
      method: "GET",
      success: function(data){
        if( !data.error ){
          data = JSON.parse( data );
          callback( data );
        }
      }
    })
  },

  getPatterns: function( callback ){
    $.ajax({
      url: `/1of1/getPatterns/`,
      method: "GET",
      success: function(data){
        if( !data.error ){
          data = JSON.parse( data );
          callback( data );
        }
      }
    })
  },
}
