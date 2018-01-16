const React = require('react');
const SlideItem = require('./slideItem');

module.exports = React.createClass({
  getInitialState(){
    return({
      items: this.props.items,
      selected: 0,
      title: this.props.title,
      size: this.props.size,
      className: this.props.className
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      items: props.items,
      title: props.title,
      size: props.size,
      className: props.className
     })
  },

  next(){
    if( this.state.selected !== this.state.items.length - 1  ){
      this.state.items[ this.state.selected + 1 ].click()
      this.setState({ selected: this.state.selected + 1 })
    }else{
      this.state.items[ 0 ].click()
      this.setState({ selected: 0 })
    }
  },

  prev(){
    if( this.state.selected > 0 ){
      this.state.items[ this.state.selected - 1 ].click()
      this.setState({ selected: this.state.selected - 1 })
    }else{
      this.state.items[ this.state.items.length - 1 ].click()
      this.setState({ selected: this.state.items.length - 1 })
    }
  },

  items(){
    return this.state.items.map(
      function( el, index ){
        return(
          <SlideItem size = { this.state.size } selected = { this.state.selected } key = { index } el = { el } index = { index }/>
        )
      }.bind( this )
    );
  },

  getArrowStyle(){
    return({
      bottom: this.state.size.height / 2 + "vh"
    })
  },

  getSlide(){
    return({
      height: this.state.size.height + "vh"
    })
  },

  getArrow(){
    return({
      bottom: (this.state.size.height / 2) + 15 + "vh"
    })
  },

  render(){
    return(
      <div className = {`slider ${this.state.className}`}>
        <div className = "prev" onClick = { this.prev } style = { this.getArrow() }/>
          <div className = "step">{ this.state.title.name.toUpperCase() }</div>
        {
          this.items()
        }
        <div className = "next" onClick = { this.next } style = { this.getArrow() }/>
      </div>
    )
  }
})
