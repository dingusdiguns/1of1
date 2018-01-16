const Convert = require('./convert');
module.exports = {
  maskImage: function( pattern, mask, original, y, height, canvas, ctx ){
    mask = this.getImageData( mask, canvas, y, height );
    pattern = this.getImageData( pattern, canvas, y, height );
    original = this.getImageData( original, canvas, y, height );
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imgData.data;
    for(var i=0; i<data.length; i+=4) {
      var red = mask[i];
      var green = mask[i+1];
      var blue = mask[i+2];
      var alpha = mask[i+3];
      if( alpha && alpha !== 0 ){
        data[i] = (original[i] * pattern[i]) / 255;
        data[i+1] = (original[i+1] * pattern[i+1]) / 255;
        data[i+2] = (original[i+2] * pattern[i+2]) / 255;
        data[i+3] = (original[i+3] );
      }
    }
    ctx.putImageData(imgData, 0, 0);
  },

  getImageData: function( image, canvas, targY, targHeight  ){
    let c = document.createElement("canvas");
    let ctx = c.getContext( "2d" );
    let height = Convert.vhToPx( targHeight );
    let y = Convert.vhToPx( targY );
    let asp = image.width / image.height
    let x =(window.innerWidth - ( asp * height )) / 2
    c.width = canvas.width;
    c.height = canvas.height;
    ctx.drawImage( image, x, y, asp * height, height  );
    let imgData = ctx.getImageData(0,0,c.width,c.height);
    let data = imgData.data;
    return data;
  }

}
