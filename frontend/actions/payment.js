const Dispatcher = require('../dispatcher/dispatcher')
const Constants = require('../constants/constants');
const Api = require('../util/apiUtil');

module.exports = {
  createCard: function( cardInfo ){
    Api.makePayment( cardInfo, this.receiveCardCreation );
  },

  receiveCardCreation( data ){
    Dispatcher.dispatch({
      actionType: Constants.cardCreation,
      data: data
    })
  }
}
