const React = require('react');
const Convert = require('../util/convert');

module.exports = React.createClass({
  render(){
    return(
      <div className = "loading" style = {{
          width: Convert.vwToPx( 100 ),
          height: Convert.vhToPx( 100 ) }}></div>
    )
  }
})
