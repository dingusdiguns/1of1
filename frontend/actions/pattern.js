const Dispatcher = require('../dispatcher/dispatcher')
const Constants = require('../constants/constants');
const Api = require('../util/apiUtil');

module.exports = {
  getPatterns: function(){
    Api.getPatterns( this.receivePatterns );
  },

  receivePatterns( data ){
    Dispatcher.dispatch({
      actionType: Constants.RECEIVEPATTERNS,
      data: data
    })
  }
}
