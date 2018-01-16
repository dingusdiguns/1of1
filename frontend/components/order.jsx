const React = require('react');

module.exports = React.createClass({
  render(){
    return(
      <div>
        <div className = "backTable" onClick = { this.props.back }>Back</div>
      </div>
    )
  }
})
