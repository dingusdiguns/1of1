
const React = require('react');
const Sphere = require('./sphere');

module.exports = React.createClass({
  getInitialState(){
    return({
      selected: this.props.selected,
      choose: this.props.choose
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      selected: props.selected,
      choose: props.choose
    })
  },

  getShortStyle(){
    if( this.state.selected.name === "Long Sleeve" ){
      return({
        backgroundColor: "white",
        opacity: 1,
        marginTop: "2vh"
      })
    }else{
      return({
        opacity: .2
      })
    }
  },

  getLongStyle(){
    if( this.state.selected.name === "Short Sleeve" ){
      return({
        backgroundColor: "white",
        opacity: 1,
        marginTop: "2vh"
      })
    }else{
      return({
        opacity: .2
      })
    }
  },

  getTankStyle(){
    if( this.state.selected.name === "Tank Top" ){
      return({
        backgroundColor: "white",
        opacity: 1,
        marginTop: "2vh"
      })
    }else{
      return({
        opacity: .2
      })
    }
  },

  shortClick(){
    this.props.setStyle( 1 );
  },

  longClick(){
    this.props.setStyle( 0 );
  },

  tankClick(){
    this.props.setStyle( 2 );
  },

  getStyle( numCircles ){
    if( this.state.choose ){
      return({
        opacity: 0,
        left: `${49 - ( numCircles * 4) }vw`
      })
    }else{
      return({
        opacity: 1,
        left: `${49 - ( numCircles * 4) }vw`
      })
    }
  },

  checkSelected( name ){
    if( name === this.state.selected.name ){
      return true
    }else{
      return false
    }
  },

  render(){
    return(
      <div className = "styleInterface" style = { this.getStyle( 3 ) }>
        <Sphere name = "Long Sleeve" right = "8vw" selected = { this.checkSelected } click = { this.longClick }></Sphere>
        <Sphere name = "Short Sleeve" right = "8vw" selected = { this.checkSelected } click = { this.shortClick }></Sphere>
        <Sphere name = "Tank Top" right = "8vw" selected = { this.checkSelected } click = { this.tankClick }></Sphere>
      </div>
    )
  }
})
