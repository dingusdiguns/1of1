const Letter = require("./letter")
let Land = function( parent ){
  this.parent = parent;
  this.letters = [];
  this.mouseX = 0;
  this.mouseY = 0;
  this.start();
}

Land.prototype.mouseMove = function( x, y ){
  this.mouseX = x;
  this.mouseY = y;
  for (var i = 0; i < this.letters.length; i++) {
    let letter = this.letters[i];
    letter.mouseMove( x, y );
  }
}

Land.prototype.fadeOut = function(){
  for (var i = 0; i < this.letters.length; i++) {
    let letter = this.letters[i];
    letter.fadeOut();
  }
},

Land.prototype.fadeIn = function(){
  for (var i = 0; i < this.letters.length; i++) {
    let letter = this.letters[i];
    letter.fadeIn();
  }
},

Land.prototype.start = function(){
  this.letters.push(
    new Letter(
      "B",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 15,
          top: 10,
          scale: 6
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "R",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 25,
          top: 10,
          scale: 8
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "I",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 40,
          top: 15,
          scale: 6
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "A",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 16,
          top: 18,
          scale: 15
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "N",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 33,
          top: 34,
          scale: 4
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "W",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 55,
          top: 28,
          scale: 5
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "O",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 62,
          top: 28,
          scale: 7
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "O",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 70,
          top: 25,
          scale: 4
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )

  this.letters.push(
    new Letter(
      "D",
      this.mouseX,
      this.mouseY,
      [
        {
          max: null,
          min: 1300,
          left: 75,
          top: 32,
          scale: 16
        },
        {
          max: 1300,
          min: 700,
          left: 1,
          top: 1,
          scale: 12
        }
      ],
      this.parent
    )
  )
}

module.exports = Land;
