const React = require('react');
const Convert = require('../util/convert');

module.exports = React.createClass({
  render(){
    return(
      <div className = "head" style = {{
          width: Convert.vwToPx( 100 ) + "px"
        }}></div>
    )
  }
})
