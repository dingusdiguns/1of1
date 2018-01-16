const React = require('react');
const Slider = require('./slider')

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      style: "short"
    })
  },

  clickTShirt(){
    if( this.state.style !== "short" ){
      this.setState({ style: "short" })
    }
  },

  nextStep(){
    if( this.state.style === "short" ){
      if( this.state.cut === "One" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/short/one")
        });
      }else if( this.state.cut === "Two" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/short/two")
        });
      }else if( this.state.cut === "Three" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/short/three")
        });
      }else{
        this.props.enable(() => {
          this.context.router.push("/choosePattern/short/threeAlt")
        });
      }
    }else if( this.state.style === "long" ){
      if( this.state.cut === "One" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/long/one")
        });
      }else if( this.state.cut === "Two" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/long/two")
        });
      }else if( this.state.cut === "Three" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/long/three")
        });
      }else{
        this.props.enable(() => {
          this.context.router.push("/choosePattern/long/threeAlt")
        });
      }
    }else{
      if( this.state.cut === "One" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/tank/one")
        });
      }else if( this.state.cut === "Two" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/tank/two")
        });
      }else if( this.state.cut === "Three" ){
        this.props.enable(() => {
          this.context.router.push("/choosePattern/tank/three")
        });
      }else{
        this.props.enable(() => {
          this.context.router.push("/choosePattern/tank/threeAlt")
        });
      }
    }
  },

  prevStep(){

    this.props.enableUp( () => {
        this.context.router.push('/landing');
    } );
  },

  clickLongSleeve(){
    if( this.state.style !== "long" ){
      this.setState({ style: "long" })
    }
  },

  clickTank(){
    if( this.state.style !== "tank" ){
      this.setState({ style: "tank" })
    }
  },

  clickTwo(){
    if( this.state.cut !== "Two" ){
      this.setState({ cut: "Two" })
    }
  },

  clickThree(){
    if( this.state.cut !== "Three" ){
      this.setState({ cut: "Three" })
    }
  },

  clickThreeAlt(){
    if( this.state.cut !== "Three Alt" ){
      this.setState({ cut: "Three Alt" })
    }
  },

  clickOne(){
    if( this.state.cut !== "One" ){
      this.setState({ cut: "One" })
    }
  },

  getCutItems(){
    if( this.state.style === "short" ){
      return(
        [
          { url: "./assets/images/cutImages/short/2.png", click: this.clickTwo, name: "Two Piece" },
          { url: "./assets/images/cutImages/short/3.png", click: this.clickThree, name: "Three Piece" },
          { url: "./assets/images/cutImages/short/4.png", click: this.clickThreeAlt, name: "Three Piece Alt" },
          { url: "./assets/images/cutImages/short/1.png", click: this.clickOne, name: "One Piece" }
        ]
      )
    }else if( this.state.style === "long" ){
      return(
        [
          { url: "./assets/images/cutImages/long/2.png", click: this.clickTwo, name: "Two Piece" },
          { url: "./assets/images/cutImages/long/3.png", click: this.clickThree, name: "Three Piece" },
          { url: "./assets/images/cutImages/long/4.png", click: this.clickThreeAlt, name: "Three Piece Alt" },
          { url: "./assets/images/cutImages/long/1.png", click: this.clickOne, name: "One Piece" }
        ]
      )
    }else{
      return(
        [
          { url: "./assets/images/cutImages/tank/2.png", click: this.clickTwo, name: "Two Piece" },
          { url: "./assets/images/cutImages/tank/3.png", click: this.clickThree, name: "Three Piece" },
          { url: "./assets/images/cutImages/tank/4.png", click: this.clickThreeAlt, name: "Three Piece Alt" },
          { url: "./assets/images/cutImages/tank/1.png", click: this.clickOne, name: "One Piece" }
        ]
      )
    }
  },

  render(){
    return(
      <div>
        <div className = "chooseStyle box" style = {{ animationDelay: ".1s" }}>
          <Slider items = {[
            { url: "./assets/images/animated/1.png", click: this.clickTShirt, name: "Short Sleeve" },
            { url: "./assets/images/animated/1 2.png", click: this.clickLongSleeve, name: "Long Sleeve" },
            { url: "./assets/images/animated/1 3.png", click: this.clickTank, name: "Tank Top" }
          ]} title = {{ name: "Style" }}  size = {{ height: "70" }}
          className = "styleSlider"
          />
        </div>
        <div className = "chooseCut box" style = {{ animationDelay: ".2s" }}>
          <Slider items = { this.getCutItems() } title = {{ name: "Cut" }}  size = {{ height: "25" }}
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
