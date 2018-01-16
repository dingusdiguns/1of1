const React = require('react');

module.exports = React.createClass({

  left( e ){
    e.stopPropagation();
    this.props.left();
  },

  right( e ){
    e.stopPropagation();
    this.props.right();
  },



  render(){
    return(
      <div className = "arrows-container" onTouchStart = { this.click }>
        <div className = "left" onTouchStart = { this.left }></div>
        <div className = "right" onTouchStart = { this.right }></div>
      </div>
    )
  }
})
