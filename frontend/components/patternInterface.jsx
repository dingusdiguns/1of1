const React = require('react');
const Tile = require('./tile')
const ShowPatterns = require('./showPatterns');

module.exports = React.createClass({
  getInitialState(){
    return({
      cut: this.props.cut,
      patterns: this.props.patterns,
      showPatterns: this.props.show
    })
  },

  componentWillReceiveProps( props ){
    if( !props.cut ){
      this.setState({
        cut: props.cut,
        patterns: props.patterns,
        showPatterns: false,
        showPatterns: props.showPatterns
      })
    }else{
      this.setState({
        cut: props.cut,
        showPatterns: props.showPatterns,
        patterns: props.patterns
      })
    }
  },

  one(){
    return(
      <div className = "button-container">
        <Tile click = { this.click } num = {1} x = { 10 } y = { 30 } ></Tile>
      </div>
    )
  },

  two(){
    return(
      <div className = "button-container">
        <Tile click = { this.click } num = {1} x = { 10 } y = { 30 } ></Tile>
        <Tile click = { this.click } num = {2} x = { 70 } y = { 50 } ></Tile>
      </div>
    )
  },

  three(){
    return(
      <div className = "button-container">
        <Tile click = { this.click } num = {1} x = { 10 } y = { 30 } ></Tile>
        <Tile click = { this.click } num = {2} x = { 70 } y = { 45 } ></Tile>
        <Tile click = { this.click } num = {3} x = { 10 } y = { 60 } ></Tile>
      </div>
    )
  },

  four(){
    return(
      <div className = "button-container">
        <Tile click = { this.click } num = {1} x = { 10 } y = { 30 } ></Tile>
        <Tile click = { this.click } num = {2} x = { 70 } y = { 45 } ></Tile>
        <Tile click = { this.click } num = {3} x = { 10 } y = { 60 } ></Tile>
      </div>
    )
  },

  tiles(){
    if( this.state.cut ){
      if( this.state.cut.name === "1 Piece" ){
        return(
          <div>
            {
              this.one()
            }
          </div>
        )
      }else if( this.state.cut.name === "2 Piece" ){
        return(
          <div>
            {
              this.two()
            }
          </div>
        )
      }else if( this.state.cut.name === "3 Piece" ){
        return(
          <div>
            {
              this.three()
            }
          </div>
        )
      }else if( this.state.cut.name === "3 Piece Alt" ){
        return(
          <div>
            {
              this.four()
            }
          </div>
        )
      }
    }
  },

  click( index ){
    this.props.toggleShow( index );
  },

  changePattern( num, path ){
    this.props.changePattern( num, path );
  },

  setPatternsFalse(){
    this.setState({ showPatterns: false });
  },

  render(){
    return(
      <div>
        {
          this.tiles()
        }
        <ShowPatterns click = { this.changePattern } cut = { this.state.cut } clicked = { this.state.showPatterns } patterns = { this.state.patterns } ></ShowPatterns>
      </div>
    )
  }
})
