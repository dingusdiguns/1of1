
const getViewport = require('./getViewport')
module.exports = {
  width: getViewport()[0],
  height: getViewport()[1],
  setHeightWidth: function( ids ){
    for (var i = 0; i < ids.length; i++) {
      let id = ids[i]
      let thing = document.getElementById(id);
      thing.style.height = this.height + "px";
      thing.style.width = this.width + "px";
    }
  },
  vhToPx: function( vh ){
    return (( this.height / 100 ) * vh);
  },
  vwToPx: function( vw ){
    return (( this.width / 100 ) * vw);
  }
}
