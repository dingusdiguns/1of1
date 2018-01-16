const React = require('react');
const Land = require('../util/land')
const SignIn = require('./signIn');
const SignUp = require('./signUp');


module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      landing: false
    })
  },

  componentDidMount(){
    window.setTimeout( () => { this.refs.emblem.style.opacity = "1" }, 100 );
    let landing = new Land( this.refs.landing );
    this.setState({ landing: landing })
    window.setTimeout(
      function(){
        this.timeout = window.setInterval( this.triggerLand, 100 );
      }.bind( this ), 100
    );
  },

  triggerLand(){
    if( this.state.landing ){
      this.state.landing.mouseMove( this.state.mouseX, this.state.mouseY );
    }
  },


  out( callback ){
    window.clearInterval( this.timeout )
    this.state.landing.fadeOut();
  },

  in(){
    if( this.state.landing ){
      window.setTimeout(
        function(){
          this.timeout = window.setInterval( this.triggerLand, 100 );
        }.bind( this ), 1200
      );
      this.state.landing.fadeIn();
    }else{
      let landing = new Land( this.refs.landing );
      this.setState({ landing: true })
      this.timeout = window.setInterval( this.triggerLand, 100 );
    }
  },

  getContainerStyle(){
    return({ top: "50vh" })
  },


  mouseMove( e ){
    if( !this.state.signIn && !this.state.signUp ){
      this.setState({ mouseX: e.clientX, mouseY: e.clientY })
    }
  },

  getEmblemStyle(){

  },

  pushDesign(){
    this.context.router.push('/chooseStyle');
  },

  designClick(){
    this.out()
    this.props.enable(
      this.pushDesign
    );
  },

  render(){
    return(
      <div className = "landing" ref = "landing" onMouseMove = { this.mouseMove }>
        <div className = "emblem" ref = "emblem" style = { this.getEmblemStyle() }/>
        <div className = "login-container" style = { this.getContainerStyle() }>
          <button className = "login sign-in" onClick = { this.designClick } style = {{ animationDelay: ".2s" }}>Design Shirt</button>
        </div>
      </div>
    )
  }
})
