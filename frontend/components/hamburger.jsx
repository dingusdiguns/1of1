const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      menu: this.props.menu
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      menu: props.menu
    })
  },

  getHamburger(){
    return({

    })
  },

  getBun1(){
    return({

    })
  },

  getBun2(){
    return({

    })
  },

  getBun3(){
    return({

    })
  },

  render(){
    return(
      <div className = "hamburger" onClick = { this.props.click } style = { this.getHamburger() }>
        <div className = "bun" style = { this.getBun1() }/>
        <div className = "bun" style = { this.getBun2() }/>
        <div className = "bun" style = { this.getBun3() }/>
      </div>
    )
  }
})
