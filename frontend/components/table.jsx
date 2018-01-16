const React = require('react');
const Row = require('./row.jsx');

module.exports = React.createClass({
  getInitialState(){
    return({
      options: { "one": [ "images/patterns/one.png","images/patterns/two.png","images/patterns/three.png","images/patterns/four.png" ] },
      pattern: this.props.pattern
    })
  },

  componentDidMount(){
    window.setTimeout( function(){
      this.setState({ time: true });
    }.bind( this ), 500 );
  },

  rows(){
    if( this.state.pattern.type === "one" ){
      return(
        <div>
          <Row clickOption = { this.props.clickOption } name = {"A"} options = { this.state.options["one"]}></Row>
        </div>
      );
    }else if( this.state.pattern.type === "two" ){
      return(
        <div>
          <Row clickOption = { this.props.clickOption } name = {"A"} options = { this.state.options["one"]}></Row>
          <Row clickOption = { this.props.clickOption } name = {"B"} options = { this.state.options["one"]}></Row>
        </div>
      );
    }else if( this.state.pattern.type === "three" ){
      return(
        <div>
          <Row clickOption = { this.props.clickOption } name = {"A"} options = { this.state.options["one"]}></Row>
          <Row clickOption = { this.props.clickOption } name = {"B"} options = { this.state.options["one"]}></Row>
          <Row clickOption = { this.props.clickOption } name = {"C"} options = { this.state.options["one"]}></Row>
        </div>
      );
    }else{
      return(
        <div>
          <Row clickOption = { this.props.clickOption } name = {"A"} options = { this.state.options["one"]}></Row>
          <Row clickOption = { this.props.clickOption } name = {"B"} options = { this.state.options["one"]}></Row>
          <Row clickOption = { this.props.clickOption } name = {"C"} options = { this.state.options["one"]}></Row>
        </div>
      );
    }
  },

  order(){
    if( this.state.time ){
      this.props.order()
    }
  },

  render(){
    return(
      <div className = "table">
        {
          this.rows()
        }
        <div className = "backTable" onClick = { this.props.back }>Back</div>
        <div className = "orderButton" onClick = { this.order }>Order</div>
      </div>
    )
  }
})
