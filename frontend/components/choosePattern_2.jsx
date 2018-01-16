const React = require('react');
const Slider = require('./slider')
const Pattern = require('../actions/pattern')


module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      style: this.props.style,
      cut: this.props.cut
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      style: props.style,
      cut: props.cut
    })
  },

  componentDidMount(){

  },

  nextStep(){
    debugger
  },

  prevStep(){
    this.props.enableUp( () => {
        this.context.router.push('/chooseStyle');
    });
  },

  getPatternItems(){
    if( this.state.patterns ){
    }else{
      return([
        { url: "./assets/images/cutImages/tank/1.png", click: () => {}, name: "One Piece" }
      ])
    }
  },

  render(){
    return(
      <div>
        <div className = "chooseStyle box">

        </div>
        <div className = "chooseCut box">
          <Slider items = { this.getPatternItems() } title = {{ name: "Pattern" }}  size = {{ height: "25" }}
            className = "cutSlider"
            />
        </div>
        <div className = "prev-step box button" onClick = { this.prevStep }>Back</div>
        <div className = "next-step box button" onClick = { this.nextStep }>Next</div>
        <div className = "box button-space"/>
      </div>
    )
  }
})
