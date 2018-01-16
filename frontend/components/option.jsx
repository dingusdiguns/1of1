const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return{
      start: {},
      image: this.props.image,
      index: this.props.index,
      offset: this.props.offset,
      name: this.props.name
    }
  },

  componentWillReceiveProps( props ){
    let offset = props.offset;
    this.setState({ offset: props.offset });
  },

  touchStart(){
    this.setState({ start: new Date().getTime() })
  },

  touchEnd(){
    let start, end, seconds;
    start = this.state.start;
    end = new Date().getTime();
    seconds = ( end - start ) / 1000;
    console.log( seconds );
    if( seconds < .15 ){
      this.click();
    }
    this.setState({ start: {} })
  },

  click(){
    this.props.clickOption( this.state.name, this.state.image );
  },

  getStyle(){
    return({
      left: (this.state.index * ( window.innerHeight / 10 )) + this.state.offset + "px",
      backgroundImage: `url('${this.state.image}')`
    })
  },

  render(){
    return(
      <div className = "option" style = { this.getStyle() } onClick = { this.click } onTouchStart = { this.touchStart } onTouchEnd = { this.touchEnd } >

      </div>
    )
  }
})
