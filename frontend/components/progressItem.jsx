  const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      active: this.props.active,
      name: this.props.name
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      active: props.active
    })
  },

  click(){
    if( this.state.active ){
      this.props.wipe( this.props.click );
    }
  },

  getStyle(){
    if( this.state.active ){
      return({
        backgroundImage: `url('./assets/images/icons/reg/${ this.state.name.toLowerCase() }.png')`
      })
    }else{
      return({
        backgroundImage: `url('./assets/images/icons/hover/${ this.state.name.toLowerCase() }.png')`
      })
    }
  },

  getHover(){
    return({
      backgroundImage: `url('./assets/images/icons/reg/${ this.state.name.toLowerCase() }.png')`
    })
  },

  getLineStyle(){
    if( this.state.name.toLowerCase() === "pay" ){
      return({
        display: "none"
      })
    }
  },

  render(){
    return(
      <div className = "progressItem">
        <div className = "stage" onClick = { this.click }>
          <div className = "icon" style = { this.getStyle() }>
            <div className = "hover" style = { this.getHover() }/>
            <div className = "line" style = { this.getLineStyle() }/>
          </div>
        </div>
      </div>
    )
  }
})
