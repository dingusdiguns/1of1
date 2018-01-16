const React = require('react')

module.exports = React.createClass({
  getInitialState(){
    return({
      el: this.props.el,
      index: this.props.index
    })
  },

  componentWillReceiveProps( props ){

  },

  render(){
    return(
      <div className = "select-style-container"></div>
    )
  }
})
