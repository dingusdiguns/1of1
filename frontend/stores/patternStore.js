const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const Constants = require('../constants/constants');
const PatternStore = new Store(AppDispatcher);

PatternStore.patterns = {}

PatternStore.getPatterns = function(){
  return this.patterns;
}

PatternStore.setPatterns = function( patterns ){
  for (var i = 0; i < patterns.length; i++) {
    let pattern = patterns[i];
    this.patterns[ pattern.id ] = pattern;
  }
}

PatternStore.__onDispatch = function( payload ){
  switch( payload.actionType ){
    case Constants.RECEIVEPATTERNS:
    this.setPatterns( payload.data );
    this.__emitChange();
    break;
  }
}

module.exports = PatternStore;
