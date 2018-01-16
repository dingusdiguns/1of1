  const React = require('react');
const Convert = require('../util/convert');

module.exports = React.createClass({
  getInitialState(){
    let x = Convert.vwToPx( this.props.x );
    let y = Convert.vhToPx( this.props.y );
    return({
      num: this.props.num,
      x: x,
      y: y
    })
  },

  dragStart( e ){
    e.stopPropagation()
    this.setState({ startTime: new Date().getTime() })
  },

  drag( e ){
    e.stopPropagation()
    if( !this.state.pattern ){
      this.setState({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  },

  dragEnd( e ){
    e.stopPropagation()
    let time = new Date().getTime()
    if( time - this.state.startTime < 200 ){
      this.click()
    }
  },

  click(){
    this.props.click( this.state.num );
  },

  render(){
    return(
      <div className = "tile" onTouchStart = { this.dragStart } onTouchEnd = { this.dragEnd } onTouchMove = { this.drag } style = {{ left: `${this.state.x}px`, top: `${this.state.y}px` }}>
        {
          this.state.num
        }
      </div>
    )
  }
})
