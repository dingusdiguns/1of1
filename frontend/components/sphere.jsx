const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      name: this.props.name,
      right: this.props.right
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      name: props.name,
      right: props.right
    })
  },

  getCircleStyle(){
    if( this.props.selected( this.state.name ) ){
      return({
        backgroundColor: "white",
        opacity: 1,
        marginRight: this.state.right
      })
    }else{
      return({
        backgroundColor: "transparent",
        border: "1px solid white",
        marginRight: this.state.right
      })
    }
  },

  render(){
    return(
      <div className = "circle long" style = { this.getCircleStyle() } onClick = { this.props.click }>
      </div>
    )
  }
})
