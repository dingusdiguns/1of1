const React = require('react');

module.exports = React.createClass({
  componentDidMount(){
    window.setTimeout(
      this.props.disable, 1000
    );
  },

  getStyle(){
    if( this.props.reverse ){
      return({
        animationName: "wipeUp"
      })
    }else{
      return({
        animationName: "wipe"
      })
    }
  },

  render(){
    return(
      <div className = "wipe" style = { this.getStyle() }></div>
    )
  }
})
