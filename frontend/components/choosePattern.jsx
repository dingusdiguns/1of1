const React = require('react');
const PatternInterface = require('./patternInterface')
const Convert = require('../util/convert')
const Mask = require('../util/mask')

module.exports = React.createClass({
  getInitialState(){
    return({
      cut: this.props.cut,
      style: this.props.style,
      patterns: this.props.patterns,
      chosen: {},
      showPatterns: this.props.showPatterns
    })
  },

  componentDidMount(){
    let canvas = document.createElement("canvas");
    canvas.style.pointerEvents = "none";
    let ctx = canvas.getContext("2d");
    canvas.width = this.refs.container.offsetWidth;
    canvas.height = window.innerHeight;
    this.refs.container.appendChild( canvas );
    this.setState({ canvas: canvas, ctx: ctx })
  },

  componentWillReceiveProps( props ){
    if( !this.state.cut ){
      this.setState({
        style: props.style,
        cut: props.cut,
        showPatterns: props.showPatterns
      }, this.shirt)
    }else{
      this.setState({
        style: props.style,
        cut: props.cut,
        showPatterns: props.showPatterns
      })
    }
  },


  clear(){
    this.state.ctx.clearRect( 0,0, this.state.canvas.width, this.state.canvas.height );
  },

  dragStart( e ){
    if( !this.state.pattern ){
      this.setState({ startTime: new Date().getTime() ,touch: e.touches[0] })
    }
  },

  drag( e ){
    if( !this.state.pattern ){
      this.setState({ move: e.touches[0] })
    }
  },

  dragEnd(){
    let time = new Date().getTime();
    if( (time - this.state.startTime) / 1000 > .1 ){
      let diffX = this.state.touch.clientX - this.state.move.clientX;
      let diffY = this.state.touch.clientY - this.state.move.clientY;
      if(
        this.state.move &&
        this.state.touch &&
        ( Math.abs( diffX ) > 80 ||  Math.abs( diffY ) > 40 )
      ){
        if( Math.abs( diffX ) > Math.abs( diffY ) ){

        }else{
          console.log(diffY);
          if( !this.state.showPatterns ){
            if( diffY > 0 ){
              this.props.next();
            }else{
              this.props.prev();
            }
          }else{
            this.props.toggleShow( this.state.showPatterns )
          }
        }
      }
    }
  },

  changePattern( num, path ){
    let pattern = new Image();
    pattern.src = path;
    pattern.onload = () => { this.setState({ patternLoaded: pattern }, this.checkLoaded) }
    let mask = new Image();
    mask.src = this.state.cut.masks[ num - 1 ];
    mask.onload = () => { this.setState({ maskLoaded: mask }, this.checkLoaded) }
    let original = new Image();
    original.src = this.state.style.path;
    original.onload = () => { this.setState({ original: original }, this.checkLoaded) }
    this.props.setChosen( num, path );
  },

  checkLoaded(){
    if( this.state.patternLoaded && this.state.maskLoaded && this.state.original ){
      let mask = this.state.maskLoaded;
      let pattern = this.state.patternLoaded;
      let original = this.state.original;
      Mask.maskImage( pattern, mask, original, 35, 38.5, this.state.canvas, this.state.ctx );
      this.setState({ patternLoaded: false, maskLoaded: false, original: false })
    }
  },

  toggleShow( index ){
    this.props.toggleShow( index );
  },

  shirt( callback ){
    if( this.state.cut ){
      let image = new Image();
      let height = Convert.vhToPx( 38.5 );
      let y = Convert.vhToPx( 35 );
      this.clear();
      image.onload = ( result ) => {
        let asp = image.width / image.height
        let x =(window.innerWidth - ( asp * height )) / 2
        this.state.ctx.drawImage( image, x, y, asp * height, height  );
        if( callback ){
          callback
        }
      }
      image.src = this.state.style.path;
    }
  },

  render(){
    return(
      <div className = "scroll" ref = "container" onTouchStart = { this.dragStart } onTouchEnd = { this.dragEnd } onTouchMove = { this.drag } style = {{ zIndex: -1 }}>
        <PatternInterface toggleShow = { this.toggleShow } showPatterns = { this.state.showPatterns } changePattern = { this.changePattern } cut = { this.state.cut } patterns = { this.state.patterns }></PatternInterface>
      </div>
    )
  }
})
