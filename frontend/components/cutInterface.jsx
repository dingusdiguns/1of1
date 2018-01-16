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

  checkSelected( name ){
    console.log(this.state.selected.name);
    if( name === this.state.selected.name ){
      return true
    }else{
      return false
    }
  },

  oneClick(){
    this.props.setCut( 0 );
  },

  twoClick(){
    this.props.setCut( 1 );
  },

  threeClick(){
    this.props.setCut( 2 );
  },

  altClick(){
    this.props.setCut( 3 );
  },

  getStyle( numCircles ){
    if( this.state.choose ){
      return({
        opacity: 0,
        left: `${50 - ( numCircles * 4) }vw`
      })
    }else{
      return({
        opacity: 1,
        left: `${50 - ( numCircles * 4) }vw`
      })
    }
  },

  render(){
    return(
      <div className = "styleInterface" style = { this.getStyle( 4 ) }>
        <Sphere name = "1 Piece" right = "8vw" selected = { this.checkSelected } click = { this.oneClick }></Sphere>
        <Sphere name = "2 Piece" right = "8vw" selected = { this.checkSelected } click = { this.twoClick }></Sphere>
        <Sphere name = "3 Piece" right = "8vw" selected = { this.checkSelected } click = { this.threeClick }></Sphere>
        <Sphere name = "3 Piece Alt" right = "8vw" selected = { this.checkSelected } click = { this.altClick }></Sphere>
      </div>
    )
  }
})
