const React = require('react');

module.exports = React.createClass({
    getInitialState(){
      return({
        pattern: this.props.pattern
      })
    },
    componentWillReceiveProps( props ){
      this.setState({ pattern: props.pattern })
    },
    getStyle(){
      if( this.state.pattern ){
        return({
          bottom: "35vh"
        })
      }
    },
  render(){
    return(
      <div className = "background" style = { this.getStyle() }></div>
    )
  }
})
