const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    if( this.props.selected === this.props.index ){
      this.props.el.click()
    }
    return({
      el: this.props.el,
      index: this.props.index,
      selected: this.props.selected,
      size: this.props.size
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      el: props.el,
      index: props.index,
      selected: props.selected,
      size: props.size
    })
  },

  getStyle(){
    if( this.state.selected === this.state.index ){
      return({
        left: "0px",
        backgroundImage: `url('${this.state.el.url}')`,
        backgroundSize: `auto ${ this.state.size.height }vh`
      })
    }else{
      return({
        opacity: 0,
        left: `${ 2000 * ( this.state.index - this.state.selected ) }px`,
        backgroundImage: `url('${this.state.el.url}')`,
        backgroundSize: `auto ${ this.state.size.height }vh`
      })
    }
  },

  getTypeStyle(){
    if( this.state.selected === this.state.index ){
      return({
        left: `0px`,
      })
    }else{
      return({
        left: `${ 200 * ( this.state.index - this.state.selected ) }px`,
      })
    }
  },

  render(){
    return(
      <div className = "slide-item" style = { this.getStyle() }>
        <div className = "type" style = { this.getTypeStyle() }>{ this.state.el.name }</div>
      </div>
    )
  }
})
