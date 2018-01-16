const Mask = require('./mask');

function Canv( canvas, type ){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.type = type
  this.img = new Image
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight / 2;
  this.getImage();
}

Canv.prototype.getImage = function(){
  if( this.type === "one" ){
    this.img.src = "images/shirts/one.png"
    this.img.onload = this.placeImage.bind( this )
  }else if( this.type === "two" ){
    this.img.src = "images/shirts/two.png"
    this.img.onload = this.placeImage.bind( this )
  }else if( this.type === "four" ){
    this.img.src = "images/shirts/four.png"
    this.img.onload = this.placeImage.bind( this )
  }else{
    this.img.src = "images/shirts/three.png"
    this.img.onload = this.placeImage.bind( this )
  }

},

Canv.prototype.placeImage = function(){
  let asp = this.img.width / this.img.height;
  let width = this.canvas.height * asp;
  let diff = ( window.innerWidth - width ) / 2
  this.ctx.drawImage(
    this.img,
    0,
    0,
    this.img.width,
    this.img.height,
    diff,
    0,
    this.canvas.height * asp,
    this.canvas.height
  );
},

Canv.prototype.applyTex = function( startX, startY, endX, endY, path ){
  let img = new Image();
  let mask = new Mask( startX, startY, endX, endY, img, this.canvas, this.ctx );
  img.src = path;
  img.onload = mask.applyMask.bind( mask );
}

module.exports = Canv;
