const React = require('react');
const ProgressItem = require('./progressItem');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      chooseStyle: this.props.chooseStyle,
      chooseCut: this.props.chooseCut,
      choosePattern: this.props.choosePattern,
      accesorize: this.props.accesorize,
      pay: this.props.pay
    })
  },

  componentWillReceiveProps(props){
    this.setState({
      chooseStyle: props.chooseStyle,
      chooseCut: props.chooseCut,
      choosePattern: props.choosePattern,
      accesorize: props.accesorize,
      pay: props.pay
    })
  },

  landing(){
    let active, wipe;
    if(
      this.state.chooseStyle ||
      this.state.chooseCut ||
      this.state.choosePattern ||
      this.state.accesorize ||
      this.state.pay
    ){
      active = true
      wipe = this.props.wipeUp
    }else{
      wipe = this.props.wipeDown
    }
    return(
      <ProgressItem wipe = { wipe } click = { this.pushLanding } name = "Landing" active = { true }  />
    )
  },

  chooseStyle(){
    let active, wipe;
    if(
      this.state.chooseStyle ||
      this.state.chooseCut ||
      this.state.choosePattern ||
      this.state.accesorize ||
      this.state.pay
    ){
      active = true
      wipe = this.props.wipeUp
    }else{
      wipe = this.props.wipeDown
    }
    return(
      <ProgressItem wipe = { wipe } click = { this.pushStyle } name = "Style" active = { active }  />
    )
  },

  chooseCut(){
    let active, wipe;
    if(
      this.state.chooseCut ||
      this.state.choosePattern ||
      this.state.accesorize ||
      this.state.pay
    ){
      active = true
      wipe = this.props.wipeUp
    }else{
      wipe = this.props.wipeDown
    }
    return(
      <ProgressItem wipe = { wipe } click = { this.pushStyle } name = "Cut" active = { active }  />
    )
  },

  choosePattern(){
    let active, wipe;
    if(
      this.state.choosePattern ||
      this.state.accesorize ||
      this.state.pay
    ){
      active = true
      wipe = this.props.wipeUp
    }else{
      wipe = this.props.wipeDown
    }
    return(
      <ProgressItem wipe = { wipe } click = { this.pushCut } name = "Pattern" active = { active }  />
    )
  },

  accesorize(){
    let active, wipe;
    if(
      this.state.accesorize ||
      this.state.pay
    ){
      active = true
      wipe = this.props.wipeUp
    }else{
      wipe = this.props.wipeDown
    }
    return(
      <ProgressItem wipe = { wipe } click = { this.pushAccesorize } name = "Additions" active = { active }  />
    )
  },

  pay(){
    let active, wipe;
    if(
      this.state.pay
    ){
      active = true
      wipe = this.props.wipeUp
    }else{
      wipe = this.props.wipeDown
    }
    return(
      <ProgressItem wipe = { wipe } click = { function(){
        debugger
      } } name = "Pay" active = { active }  />
    )
  },

  pushLanding(){
    this.context.router.push("/landing")
  },

  pushStyle(){
    this.context.router.push("/chooseStyle")
  },

  pushCut(){
    this.context.router.push("/chooseCut")
  },

  pushPattern(){
    this.context.router.push("/choosePattern")
  },

  pushAccesorize(){
    this.context.router.push("/Accesorize")
  },

  render(){
    return(
      <div className = "box progress">
        {
          this.landing()
        }
        {
          this.chooseStyle()
        }
        {
          this.chooseCut()
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
      </div>
    )
  }
})
