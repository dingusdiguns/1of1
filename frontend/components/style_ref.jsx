const React = require('react');
const Canv = require('../util/Canv');
module.exports = React.createClass({
  getInitialState(){
    return({
      style: this.props.type,
      title: this.props.type,
      chosen: this.props.chosen,
      pattern: this.props.pattern,
      index: this.props.index,
      scroll: this.props.scroll
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ scroll: props.scroll, pattern: props.pattern, chosen: props.chosen, order: props.order })
    this.state.canvas.placeImage();
    if( props.pattern ){
      if( props.chosen["A"] ){
        if( this.state.style === "one" ){
          this.state.canvas.applyTex( 0, 0, 100, 100, props.chosen[ "A" ] )
        }else if( this.state.style === "two" ){
          this.state.canvas.applyTex( 0, 0, 50, 100, props.chosen[ "A" ] )
        }else if( this.state.style === "three" ){
          this.state.canvas.applyTex( 0, 0, 100, 44, props.chosen[ "A" ] )
        }else if( this.state.style === "four" ){
          this.state.canvas.applyTex( 0, 0, 50, 58, props.chosen[ "A" ] )
        }
      }
      if( props.chosen["B"] ){
        if( this.state.style === "two" ){
          this.state.canvas.applyTex( 50, 0, 100, 100, props.chosen[ "B" ] )
        }else if( this.state.style === "three" ){
          this.state.canvas.applyTex( 0, 44, 100, 27, props.chosen[ "B" ] )
        }else if( this.state.style === "four" ){
          this.state.canvas.applyTex( 50, 0, 100, 58, props.chosen[ "B" ] )
        }
      }
      if( props.chosen["C"] ){
        if( this.state.style === "three" ){
          this.state.canvas.applyTex( 0, 69, 100, 26, props.chosen[ "C" ] )
        }else if( this.state.style === "four" ){
          this.state.canvas.applyTex( 0, 58, 100, 100, props.chosen[ "C" ] )
        }
      }
    }

  },

  componentDidMount(){
    let canvas = document.getElementById( `canvas${this.state.style}` );
    this.setState({ canvas: new Canv( canvas, this.state.style ) });
  },

  getStyle(){
    return({
      left: ( this.state.index + this.state.scroll ) * 100 + "vw"
    })
  },

  getTitleStyle(){
    if( this.state.pattern ){
      return({
        left: ( this.state.index + this.state.scroll ) * 100 + "vw",
        top: "-10vh"
      })
    }else{
      return({
        left: ( this.state.index + this.state.scroll ) * 100 + "vw"
      })
    }
  },

  getTitle(){
    return(
      <div className = "style-title" style = { this.getTitleStyle() }>
        {
          "BWOOD"
        }
        <br></br>
        {
          this.state.title
        }
        <br></br>
        {"05.20.17"}

      </div>
    )
  },

  getStructure(){
    if( this.state.style === "one" ){
      return(
        <div className = "style-container" style = { this.getStyle() }>
          <div className = "shadow"></div>
          <canvas className = "canvas" id = {`canvas${this.state.style}`} ></canvas>
        </div>
      )
    }else if( this.state.style === "two" ){
      return(

        <div className = "style-container" style = { this.getStyle() }>
          <div className = "shadow"></div>
          <canvas className = "canvas" id = {`canvas${this.state.style}`} ></canvas>
        </div>
      )
    }else if( this.state.style === "four" ){
      return(
        <div className = "style-container" style = { this.getStyle() }>
          <div className = "shadow"></div>
          <canvas className = "canvas" id = {`canvas${this.state.style}`}></canvas>
        </div>
      )
    }else{
      return(
        <div className = "style-container" style = { this.getStyle() }>
          <div className = "shadow"></div>
          <canvas className = "canvas" id = {`canvas${this.state.style}`} ></canvas>
        </div>
      )
    }
  },


  render(){

    return(
      <div>
      {
        this.getTitle()
      }
      {
        this.getStructure()
      }
      </div>
    )
  }
})
