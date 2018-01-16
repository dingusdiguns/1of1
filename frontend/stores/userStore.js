const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const Constants = require('../constants/constants');
const UserStore = new Store(AppDispatcher);

UserStore.user = {}

UserStore.setUser = function( user ){
  this.user = user;
}

UserStore.removeUser = function(){
  this.user = {}
}

UserStore.getUser = function(){
  return this.user;
}


UserStore.__onDispatch = function( payload ){
  switch( payload.actionType ){
    case Constants.LOGIN:
    this.setUser( payload.data );
    this.__emitChange();
    break;
  }
}

module.exports = UserStore;
