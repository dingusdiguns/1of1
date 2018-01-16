function Letter( letter, mouseX, mouseY, cases, parent ){
  this.letter = letter;
  this.mouseX = mouseX;
  this.mouseY = mouseY;
  this.cases = cases;
  this.parent = parent;
  this.start();
}

Letter.prototype.mouseMove = function( x, y ){

  let mult = 400;
  let offsetX = ((x - ( window.innerWidth / 2 )) / mult)
  let offsetY = ((y - ( window.innerHeight / 2 )) / mult)
  let diff = (x - this.div.offsetLeft) / 20;
  this.mouseX = this.case.left + Math.floor(offsetX * this.case.scale);
  this.mouseY = this.case.top + Math.floor(offsetY * this.case.scale);
  this.div.style.transition = ".5s";
  this.div.style.transform = `rotateY(${ diff }deg)`
  this.div.style.left =  this.mouseX + "vw";
  this.div.style.top = this.mouseY + "vw";
},

Letter.prototype.fadeOut = function(){
  window.setTimeout(
    function(){
      this.div.style.transition = "3s";
      this.div.style.top = this.case.scale * -10+"vh";
    }.bind( this ), 100
  );
}

Letter.prototype.fadeIn = function(){
  window.setTimeout(
    function(){
      this.div.style.transition = "2s";
      this.div.style.top = this.case.top + "vh";
    }.bind( this ), 100
  );
},

Letter.prototype.start = function(){
  let letter = document.createElement("div");
  let c = this.getCase();
  this.case = c;
  letter.innerText = this.letter;
  letter.className = "letter";
  letter.style.transition = ".5s";
  letter.style.top = c.top + "vw";
  letter.style.left = c.left + "vw";
  letter.style.fontSize =  15 * c.scale + "px";
  this.parent.appendChild( letter );
  this.div = letter;
}

Letter.prototype.out = function(){

},

Letter.prototype.getCase = function(){
  let width = window.innerWidth;
  for (var i = 0; i < this.cases.length; i++) {
    let c = this.cases[i];
    if(
      ( c.max >= width && c.min < width)
      || ( c.max >= width && !c.min )
      || ( c.min < width && !c.max )
    ){
      return c;
    }
  }
}

module.exports = Letter;
