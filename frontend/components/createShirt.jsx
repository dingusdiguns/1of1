const React = require('react')
const Style = require('./style');
const Scroll = require('./scroll')
const ChoosePattern = require('./choosePattern')
const StyleInterface = require('./styleInterface')
const CutInterface = require('./cutInterface.jsx')
const Arrows = require('./arrows');

module.exports = React.createClass({
  getInitialState(){
    return({
      style: false,
      cut: false,
      styleIndex: 0,
      cutIndex: 0,
      choosePattern: false,
      chosenPatterns: false,
      showPatterns: false,
      chosenPatterns: {},
      styles: [
        {
          name: "Long Sleeve",
          path: "./assets/images/shirt_final/long/1/1.png"
        },
        {
          name: "Short Sleeve",
          path: "./assets/images/shirt_final/normal/1/1.png"
        },
        {
          name: "Tank Top",
          path: "./assets/images/shirt_final/tank/1/1.png"
        },
      ],
      cuts: [
        { name: "1 Piece",
          masks: [
            "./assets/images/masks/1/1.png"
          ]
        },
        { name: "2 Piece",
          masks: [
            "./assets/images/masks/2/1.png",
            "./assets/images/masks/2/2.png"
          ]
        },
        { name: "3 Piece",
          masks: [
            "./assets/images/masks/3/1.png",
            "./assets/images/masks/3/2.png",
            "./assets/images/masks/3/3.png"
          ]
        },
        {
          name: "3 Piece Alt",
          masks: [
            "./assets/images/masks/4/1.png",
            "./assets/images/masks/4/2.png",
            "./assets/images/masks/4/3.png"
          ]
        }
      ],
      patterns: [
        { name: "", path: "./assets/images/patterns/1.png" },
        { name: "", path: "./assets/images/patterns/2.png" },
        { name: "", path: "./assets/images/patterns/3.png" },
        { name: "", path: "./assets/images/patterns/4.png" }
      ]
    })
  },

  setChosen( num, path ){
    this.state.chosenPatterns[ num ] = path;
    this.setState({ chosen: this.state.chosen })
  },

  componentWillReceiveProps( props ){
    this.setState({  });
  },

  styleFalse(){
    if( this.state.style ){
      this.setState({ style: false, choosePattern: false });
    }
  },

  cutFalse(){
    if( this.state.cut ){
      this.setState({ cut: false });
    }
  },

  styleStyle(){
    if( this.state.style ){
      return({
        opacity: 0
      })
    }
  },

  chooseStyle(){
    return(
      <div className = "page" style = { this.styleStyle() }>
        <div className = "pageTitle"> Choose A Style </div>
        <div className = "scroll-gallery">
          <Arrows right = { this.addStyleScroll } left = { this.subStyleScroll }></Arrows>
          {
            this.mapStyle()
          }
        </div>
        <StyleInterface setStyle = { this.setStyleIndex } choose = { this.state.style } selected = { this.state.styles[this.state.styleIndex] }></StyleInterface>
      </div>
    )
  },

  cutArrows(){
    if( !this.state.cut ){
      return(
        <div>
          <div className = "left-arrow" onClick = { this.subCutScroll }></div>
          <div className = "right-arrow" onClick = { this.addCutScroll }></div>
        </div>
      )
    }
  },

  chooseCut(){
    return(
      <div className = "page" style = { this.cutStyle() }>
        <div className = "pageTitle"> Choose A Cut </div>
        <div className = "scroll-gallery">
          <Arrows right = { this.addCutScroll } left = { this.subCutScroll }></Arrows>
          {
            this.mapCut()
          }
        </div>
        <CutInterface setCut = { this.setCutIndex } choose = { this.state.cut } selected = { this.state.cuts[ this.state.cutIndex ] }></CutInterface>
      </div>
    )
  },

  setStyle( style ){
    this.setState({ style: style })
  },

  setCut( cut ){
    this.setState({ cut: cut })
  },

  setCutIndex( index ){
    this.setState({ cutIndex: index })
  },

  setStyleIndex( index ){
    this.setState({ styleIndex: index })
  },

  addStyleScroll(){
    if( this.state.styleIndex + 1 <= this.state.styles.length - 1 ){
      this.setState({ styleIndex: this.state.styleIndex + 1 },
      function(){
        console.log( this.state.styleIndex );
      });
    }
  },

  subStyleScroll(){
    if( this.state.styleIndex - 1 >= 0 ){
      this.setState({ styleIndex: this.state.styleIndex - 1 },
      function(){
        console.log(this.state.styleIndex);
      });
    }
  },

  addCutScroll(){
    if( !this.state.cut && this.state.cutIndex + 1 <= this.state.cuts.length - 1 ){
      this.setState({ cutIndex: this.state.cutIndex + 1 },
      function(){
        console.log( this.state.cutIndex );
      });
    }
  },

  subCutScroll(){
    if( !this.state.cut && this.state.cutIndex - 1 >= 0 ){
      this.setState({ cutIndex: this.state.cutIndex - 1 },
      function(){
        console.log(this.state.cutIndex);
      });
    }
  },

  nextStep(){
    if( !this.state.cut && !this.state.style ){
      this.setState({ style: this.state.styles[ this.state.styleIndex ] })
    }else if( this.state.style && !this.state.cut ){
      this.setState({ cut: this.state.cuts[ this.state.cutIndex ], choosePattern: true, accesorize: false })
    }else if( this.state.cut && this.allFilled() ){
      this.setState({ choosePattern: false, accesorize: true })
    }
  },

  allFilled(){
    let keys = Object.keys( this.state.chosenPatterns );
    if( keys.length === this.state.cut.masks.length ){
      return true;
    }
    return false;
  },

  prevStep(){
    if( this.state.style && !this.state.cut ){
      this.setState({ cut: false, style: false })
    }else if( this.state.style && this.state.cut ){
      this.setState({ cut: false, style: this.state.style })
    }
  },

  mapStyle(){
    return this.state.styles.map(
      function( el, index ){
        return(
          <Scroll opacity = { this.state.style } back = { this.styleFalse } key = { index } next = { this.nextStep } prev = { this.prevStep } scrollIndex = { this.state.styleIndex } add = { this.addStyleScroll } sub = { this.subStyleScroll } select = { this.setStyle }  el = { el } index = { index }></Scroll>
        )
      }.bind( this )
    )
  },

  mapCut(){
    let cuts;
    if( this.state.style.name === "Long Sleeve" ){
      cuts = [
        {
          name: "1 piece",
          images: [
            {
              path: "./assets/images/shirt_final/long/1/1.png",
              animation: { begin: { left: "-40px" }, end: { left: "0px" } }
            }
          ]
        },
        {
          name: "2 piece",
          images: [
            {
              path: "./assets/images/shirt_final/long/2/1.png",
              animation: { begin: { left: "-40px" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/long/2/2.png",
              animation: { begin: { left: "200px" }, end: { left: "0px" } }
            }
          ]
        },
        {
          name: "3 piece",
          images: [
            {
              path: "./assets/images/shirt_final/long/3/1.png",
              animation: { begin: { top: "10px" }, end: { top: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/long/3/2.png",
              animation: { begin: { top: "50px" }, end: { top: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/long/3/3.png",
              animation: { begin: { top: "90px" }, end: { top: "0px" } }
            }
          ]
        },
        {
          name: "4 piece",
          images: [
            {
              path: "./assets/images/shirt_final/long/4/1.png",
              animation: { begin: { left: "-40" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/long/4/2.png",
              animation: { begin: { left: "40px" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/long/4/3.png",
              animation: { begin: { top: "90px" }, end: { top: "0px" } }
            }
          ]
        },
      ];
    }else if( this.state.style.name === "Short Sleeve" ){
      cuts = [
        {
          name: "1 piece",
          images: [
            {
              path: "./assets/images/shirt_final/normal/1/1.png",
              animation: { begin: { left: "-40px" }, end: { left: "0px" } }
            }
          ]
        },
        {
          name: "2 piece",
          images: [
            {
              path: "./assets/images/shirt_final/normal/2/1.png",
              animation: { begin: { left: "-40px" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/normal/2/2.png",
              animation: { begin: { left: "200px" }, end: { left: "0px" } }
            }
          ]
        },
        {
          name: "3 piece",
          images: [
            {
              path: "./assets/images/shirt_final/normal/3/1.png",
              animation: { begin: { top: "10px" }, end: { top: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/normal/3/2.png",
              animation: { begin: { top: "50px" }, end: { top: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/normal/3/3.png",
              animation: { begin: { top: "90px" }, end: { top: "0px" } }
            }
          ]
        },
        {
          name: "4 piece",
          images: [
            {
              path: "./assets/images/shirt_final/normal/4/1.png",
              animation: { begin: { left: "-40" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/normal/4/2.png",
              animation: { begin: { left: "40px" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/normal/4/3.png",
              animation: { begin: { top: "90px" }, end: { top: "0px" } }
            }
          ]
        },
      ];
    }else if( this.state.style.name === "Tank Top" ){
      cuts = [
        {
          name: "1 piece",
          images: [
            {
              path: "./assets/images/shirt_final/tank/1/1.png",
              animation: { begin: { left: "-40px" }, end: { left: "0px" } }
            }
          ]
        },
        {
          name: "2 piece",
          images: [
            {
              path: "./assets/images/shirt_final/tank/2/1.png",
              animation: { begin: { left: "-40px" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/tank/2/2.png",
              animation: { begin: { left: "200px" }, end: { left: "0px" } }
            }
          ]
        },
        {
          name: "3 piece",
          images: [
            {
              path: "./assets/images/shirt_final/tank/3/1.png",
              animation: { begin: { top: "10px" }, end: { top: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/tank/3/2.png",
              animation: { begin: { top: "50px" }, end: { top: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/tank/3/3.png",
              animation: { begin: { top: "90px" }, end: { top: "0px" } }
            }
          ]
        },
        {
          name: "4 piece",
          images: [
            {
              path: "./assets/images/shirt_final/tank/4/1.png",
              animation: { begin: { left: "-40" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/tank/4/2.png",
              animation: { begin: { left: "40px" }, end: { left: "0px" } }
            },
            {
              path: "./assets/images/shirt_final/tank/4/3.png",
              animation: { begin: { top: "90px" }, end: { top: "0px" } }
            }
          ]
        },
      ];
    }
    if( cuts ){
      return cuts.map(
        function( el, index ){
          return(
            <Scroll key = { el.path } lock = { this.state.cut } opacity = { this.state.cut } back = { this.cutFalse } next = { this.nextStep } prev = { this.prevStep } scrollIndex = { this.state.cutIndex } add = { this.addCutScroll } sub = { this.subCutScroll } select = { this.setCut }  el = { el } index = { index }></Scroll>
          )
        }.bind( this )
      )
    }else{
      return(
        <Scroll key = { "./assets/images/shirt_final/tank/4/1.png" } lock = { this.state.cut } opacity = { this.state.cut } back = { this.cutFalse } next = { this.nextStep } prev = { this.prevStep } scrollIndex = { this.state.cutIndex } add = { this.addCutScroll } sub = { this.subCutScroll } select = { this.setCut }  el = { {
          path: "./assets/images/shirt_final/tank/1/1.png",
          animation: { begin: { left: "-40px" }, end: { left: "0px" } }
        } } index = { 0 }></Scroll>
      )
    }
  },

  getStyleContainerStyle(){
    if( this.state.style && !this.state.cut ){
      return({
        top: "-70vh"
      })
    }else if( this.state.cut ){
      return({
        top: "-140vh"
      })
    }
  },

  cutStyle(){
    if( ( this.state.cut || !this.state.style  ) ){
      return({
        opacity: 0
      })
    }
  },

  patternStyle(){
    if( !this.state.cut ){
      return({
        opacity: 0
      })
    }else if( this.state.showPatterns ){
      return({
        marginTop: "-10vh"
      })
    }
  },

  toggleShow( index ){
    if( this.state.showPatterns === index ){
      this.setState({ showPatterns: false })
    }else{
      this.setState({ showPatterns: index })
    }
  },



  choosePattern(){
    return(
      <div className = "page" style = { this.patternStyle() }>
        <ChoosePattern setChosen = { this.setChosen } toggleShow = { this.toggleShow } showPatterns = { this.state.showPatterns } next = { this.nextStep } prev = { this.prevStep } style = { this.state.style } cut = { this.state.cut } patterns = { this.state.patterns }></ChoosePattern>
        <div className = "pageTitle"> Choose Your Patterns </div>
      </div>
    )
  },

  render(){
    return(
      <div className = "create-shirt" style = { this.getStyleContainerStyle() }>
        {
          this.chooseStyle()
        }
        {
          this.chooseCut()
        }
        {
          this.choosePattern()
        }
      </div>
    )
  }
})
