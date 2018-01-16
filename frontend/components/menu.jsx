const React = require('react');
const Hamburger = require('./hamburger.jsx')

module.exports = React.createClass({
  getInitialState(){
    return({
      menu: this.props.menu
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ menu: props.menu })
  },

  getSidebar(){
    if( this.state.menu ){
      return({
        width: "100vw",
        left: "0vw"
      })
    }
  },

  createShirt(){
    this.props.createShirt();
  },

  pastOrders(){
    this.props.createShirt();
  },

  payment(){
    this.props.createShirt();
  },

  logOut(){
    this.props.logOut();
  },

  render(){
    return(
      <div>
        <Hamburger menu = { this.state.menu } click = { this.props.toggleMenu }></Hamburger>
        <div className = "sidebar" style = { this.getSidebar() }>
          <div>
            <div className = "logo">BWOOD</div>
            <div className = "link" onClick = { this.createShirt }>Create Shirt</div>
            <div className = "link" onClick = { this.pastOrders }>Past Orders</div>
            <div className = "link" onClick = { this.payment }>Payment</div>
            <div className = "link" onClick = { this.logOut }>Log Out</div>
          </div>
        </div>
      </div>
    )
  }
})
