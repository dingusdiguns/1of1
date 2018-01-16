const React = require('react');
const Option = require('./option');
module.exports = React.createClass({
  getInitialState(){
    return({
      name: this.props.name,
      options: this.props.options,
      offset: 0,
      start: {}
    })
  },

  dragStart( e ){
    this.setState({ start: e.touches[0].clientX })
  },

  dragEnd( e ){
    this.setState({ start: {} })
  },

  drag( e ){
    let start = this.state.start;
    let offset = this.state.offset + ( e.touches[0].clientX - this.state.start );
    if( offset > - 180 && offset < 0 ){
      this.setState({ offset: e.touches[0].clientX - this.state.start })
    }
  },

  options(){
    return this.state.options.map(
      function( el, index ){
        return(
          <Option clickOption = { this.props.clickOption } image = { el } name = { this.state.name } offset = { this.state.offset } key = { index } index = { index } ></Option>
        )
      }.bind( this )
    );
  },

  render(){
    return(
      <div className = "row" onTouchMove = { this.drag } onTouchStart = { this.dragStart } onTouchEnd = { this.dragEnd }>
        <div className = "label">
          {
            this.state.name
          }
        </div>
        <div className = "slidable">
          {
            this.options()
          }
        </div>
      </div>
    )
  }
})
