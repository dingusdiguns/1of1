const Canv = require('./Canv');

module.exports = {

  canvases: {},

  showImage: function( canvas, type ){
    this.canvas = canvas;
    if( !canvases[ type ] ){
      canvases[ type ] = new Canv( canvas, type )
    }
    if( canvastype === "one" ){
      this.renderImage( canvas, 'images/shirts/one.png' );
    }
  },

  renderImage: function( canvas, image ){
    this.ctx = canvas.getContext("2d")
    var img = new Image();
    function start(){
    }
    img.src = image;
    img.onload = start.bind( this );
  },
}
