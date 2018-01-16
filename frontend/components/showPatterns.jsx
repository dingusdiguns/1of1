const React = require('react');
const Pattern = require('./pattern')

module.exports = React.createClass({
  getInitialState(){
    return({
      clicked: this.props.clicked,
      patterns: this.props.patterns,
      cut: this.props.cut,
      shelfLeft: 0
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      clicked: props.clicked,
      patterns: props.patterns,
      cut: props.cut
    })
  },

  getStyle(){
    if( this.state.clicked && this.state.cut ){
      return({
        height: "20vh"
      })
    }
  },



  dragStart( e ){
    this.setState({ scrollStart: e.touches[0] })
  },

  drag( e ){
    let diff = e.touches[0].clientX - this.state.scrollStart.clientX
    this.setState({ shelfLeft: this.state.shelfLeft + diff, scrollStart: e.touches[0] })
  },


  getShelfStyle(){
    return({
      left: this.state.shelfLeft + "px"
    })
  },

  changePattern( path ){
    this.props.click( this.state.clicked, path );
  },

  mapPatterns(){
    return this.state.patterns.map(
      function( el, index ){
        return(
          <Pattern click = { this.changePattern } key = { index } el = { el } index = { index }></Pattern>
        )
      }.bind( this )
    );
  },

  render(){
    return(
      <div className = "showPatterns" style = { this.getStyle() }>
        <div className = "shelf" onTouchStart = { this.dragStart } onTouchMove = { this.drag } onTouchEnd = { this.dragEnd } style = { this.getShelfStyle() }>
          <div className = "num">{ this.state.clicked }</div>
          {
            this.mapPatterns()
          }
        </div>
      </div>
    )
  }
})
