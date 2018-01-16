const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      username: this.props.username,
      password: this.props.passwords
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ username: props.username, password: props.password })
  },

  changePassword( e ){
    let password = e.target.value;
    this.props.changePassword( password );
  },

  changeUsername( e ){
    let email = e.target.value;
    this.props.changeUsername( email );
  },

  render(){
    return(
      <div>
        <div className = "login-container">
          <div className = "login-label"> Email </div>
          <input placeholder = "email" className = "login-input" onChange = { this.changeUsername } value = { this.state.username }></input>
          <div className = "login-label"> Password </div>
          <input  className = "login-input"  value = { this.props.password } value = { this.state.password } onChange = { this.changePassword } type = "password"></input>
          <div onClick = { this.props.submit } className = "submit-button">Submit</div>
        </div>
      </div>
    )
  }
})
