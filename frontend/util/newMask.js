const Convert = require('./convert');
module.exports = {
  maskImage: function( pattern, mask, canvas, ctx ){
    mask = this.getMaskData( mask, canvas );
    pattern = this.getPatternData( pattern, canvas );
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imgData.data;
    for(var i=0; i<data.length; i+=4) {
      var red = mask[i];
      var green = mask[i+1];
      var blue = mask[i+2];
      var alpha = mask[i+3];
      if( alpha && alpha !== 0 ){
        alpha = mask[i+3]
        data[i] = (data[i] * pattern[i]) / 255;
        data[i+1] = (data[i+1] * pattern[i+1]) / 255;
        data[i+2] = (data[i+2] * pattern[i+2]) / 255;
        data[i+3] = (data[i+3] * pattern[i+3]) / 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  },

  getPatternData: function( pattern, canvas  ){
    let c = document.createElement("canvas");
    let ctx = c.getContext( "2d" );
    let height = Convert.vhToPx( 50.5 );
    let y = Convert.vhToPx( 27.5 );
    let asp = pattern.width / pattern.height
    let x =(window.innerWidth - ( asp * height )) / 2
    c.width = canvas.width;
    c.height = canvas.height;
    ctx.drawImage( pattern, x, y, asp * height, height  );
    let imgData = ctx.getImageData(0,0,c.width,c.height);
    let data = imgData.data;
    return data;
  },

  getMaskData: function( mask, canvas  ){
    let c = document.createElement("canvas");
    let ctx = c.getContext( "2d" );
    let height = Convert.vhToPx( 50.5 );
    let y = Convert.vhToPx( 27.5 );
    let asp = mask.width / mask.height
    let x =(window.innerWidth - ( asp * height )) / 2
    c.width = canvas.width;
    c.height = canvas.height;
    ctx.drawImage( mask, x, y, asp * height, height  );
    let imgData = ctx.getImageData(0,0,c.width,c.height);
    let data = imgData.data;
    return data;
  }
}
