const React = require('react');
const Loading = require('./loading');
const Opening = require('./opening')
const Login = require('./login');
const Head = require('./head');
const Background = require('./background');
const Test = require('./test');
const Payment = require('../actions/payment')
const User = require('../actions/user');
const UserStore = require('../stores/userStore');
const Menu = require('./menu');
const CreateShirt = require('./createShirt');

module.exports = React.createClass({
  getInitialState(){
    return({
      loading: true,
      status: "loading",
      pattern: false,
      createShirt: true,
      user: false,
      shirts: [
        { type: "Long Sleeve" },
        { type: "Short Sleeve" },
        { type: "TankTop" }
      ],
      email: "",
      password: "",
      chosen: {},
      scroll: 0,
      order: false,
      menu: false,
    })
  },

  componentDidMount(){
    this.userList = UserStore.addListener( this.__changeUser );
    User.getCurrentUser();
    window.setTimeout( function(){
      this.setState({ status: "opening" });
    }.bind( this ), 500 );
  },

  componentWillUnmount(){
    this.userList.remove();
  },

  __changeUser(){
    let user = UserStore.getUser();
    this.setState({ user: user });
  },

  changeUsername( email ){
    this.setState({ email: email })
  },

  changePassword( password ){
    this.setState({ password: password })
  },

  login(){
    User.login({ email: this.state.email, password: this.state.password });
  },

  createAccount(){
    User.createAccount({ email: this.state.email, password: this.state.password })
  },

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  },

  loading(){
    if( this.state.status === "loading" ){
      return(
        <Loading></Loading>
      )
    }else if( !this.state.user ){
      return(
        <Login email = { this.state.email } password = { this.state.password } changeUsername = { this.changeUsername } changePassword = { this.changePassword } submit = { this.login } ></Login>
      )
    }else{
      return(
        <div>
          <Menu payment = { this.payment } pastOrders = { this.pastOrders } logOut = { this.logout } createShirt = { this.createShirt } toggleMenu = { this.toggleMenu } menu = { this.state.menu }></Menu>
          {
            this.dom()
          }
        </div>
      )
    }
  },

  back(){
    this.setState({ pattern: false })
  },

  dom(){
    if( this.state.createShirt ){
      return(
        <CreateShirt></CreateShirt>
      )
    }
  },

  orderBack(){
    this.setState({ order: false });
  },



  goBack(){
    this.setState({ pattern: false });
  },

  order(){
    Payment.createCard({ type: "visa", number: 4417119669820331, expMonth: "11", expYear: "2093", cvv2: 4, firstName: "Oscar", lastName: "Robert" })
    this.setState({ order: true, table: false })
  },



  test(){
    return(
      <Test></Test>
    )
  },

  logOut(){
    User.logOut();
  },

  createShirt(){
    this.setAllFalse( function(){
      this.setState({ createShirt: true })
    });
  },

  payment(){
    this.setAllFalse( function(){
      this.setState({ payment: true })
    });
  },

  setAllFalse( callback ){
    this.setState({ createShirt: false, payment: false, pastOrders: false }, callback)
  },

  createShirt(){
    this.setAllFalse(
      function(){
        this.setState({ menu: false, createShirt: true  });
      }
    );
  },

  render(){
    return(
      <div>
        {
          this.loading()
          // this.test()
        }
      </div>
    )
  }
})
