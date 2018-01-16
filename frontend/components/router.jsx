const React = require('react');
const Landing = require('./landing');
const Wipe = require('./wipe')
const Progress = require('./progress')
const ChooseStyle = require('./chooseStyle')
const Hamburger = require('./hamburger');
const ChoosePattern = require('./choosePattern_2')

module.exports = React.createClass({
  getInitialState(){
    return({
      signIn: this.props.route.signIn,
      signUp: this.props.route.signUp,
      landing: this.props.route.landing,
      chooseStyle: this.props.route.chooseStyle,
      chooseCut: this.props.route.chooseCut,
      choosePattern: this.props.route.choosePattern,
      accesorize: this.props.route.accesorize,
      pay: this.props.route.pay,
      style: this.props.route.style,
      cut: this.props.route.cut

    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      signIn: props.route.signIn,
      signUp: props.route.signUp,
      landing: props.route.landing,
      chooseStyle: props.route.chooseStyle,
      chooseCut: props.route.chooseCut,
      choosePattern: props.route.choosePattern,
      accesorize: props.route.accesorize,
      pay: props.route.pay,
      style: props.route.style,
      cut: props.route.cut
    })
  },

  enableWipe( callback ){
    this.setState({ wipe: true })
    window.setTimeout(
      callback,
      500
    )
  },

  enableWipeUp( callback ){
    this.setState({ wipe: true, up: true })
    window.setTimeout(
      callback,
      500
    )
  },

  disableWipe(){
    this.setState({ wipe: false, up: false })
  },

  landing(){
    if( this.state.landing ){
      return(
        <Landing enable = { this.enableWipe }></Landing>
      )
    }
  },

  chooseStyle(){
    if( this.state.chooseStyle ){
      return(
        <ChooseStyle enable = { this.enableWipe } enableUp = { this.enableWipeUp }/>
      )
    }
  },

  choosePattern(){
    if( this.state.choosePattern ){
      return(
        <ChoosePattern enable = { this.enbaleWipe } enableUp = { this.enableWipeUp } cut = { this.state.cut } style = { this.state.style }/>
      )
    }
  },

  accesorize(){

  },

  pay(){

  },

  progress(){
    if( !this.state.landing ){
      return(
        <Progress menu = { this.state.menu } wipe = { this.enableWipe } wipeUp = { this.enableWipeUp } landing = { this.state.landing } chooseStyle = { this.state.chooseStyle } chooseCut = { this.state.chooseCut } choosePattern = { this.state.choosePattern } accesortize = { this.state.accesorize } pay = { this.state.pay }/>
      )
    }
  },

  prevAn(){
    if( this.state.wipe && this.state.up ){
      return(
        <Wipe disable = { this.disableWipe } reverse = { true }/>
      )
    }
  },

  nextAn(){
    if( this.state.wipe && !this.state.up ){
      return(
        <Wipe disable = { this.disableWipe }/>
      )
    }
  },

  menuClick(){
    this.setState({ menu: !this.state.menu })
  },

  hamburger(){
    return(
      <Hamburger click = { this.menuClick }/>
    )
  },

  render(){
    return(
      <div>
        {
          this.progress()
        }
        {
          this.prevAn()
        }
        {
          this.nextAn()
        }
        {
          this.landing()
        }
        {
          this.chooseStyle()
        }
        {
          this.choosePattern()
        }
        {
          this.accesorize()
        }
        {
          this.pay()
        }
        {
          this.hamburger()
        }
      </div>
    )
  }
})
