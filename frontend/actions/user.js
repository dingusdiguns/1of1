const Dispatcher = require('../dispatcher/dispatcher')
const Constants = require('../constants/constants');
const Api = require('../util/apiUtil');

module.exports = {
  login: function( user ){
    Api.login( user, this.receiveLogin );
  },

  getCurrentUser: function(){
    Api.getCurrentUser( this.receiveLogin );
  },

  receiveLogin( data ){
    Dispatcher.dispatch({
      actionType: Constants.LOGIN,
      data: data
    })
  }
}
