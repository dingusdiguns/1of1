const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      name: this.props.el.name,
      path: this.props.el.path
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      name: props.el.name,
      path: props.el.path
    })
  },

  getStyle(){
    return({
      backgroundImage: `url('${ this.state.path }')`
    })
  },

  click(){
    this.props.click( this.state.path );
  },

  render(){
    return(
      <div className = "pattern" onClick = { this.click } style = { this.getStyle() }></div>
    )
  }
})
