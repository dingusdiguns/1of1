const React = require('react');
const Slider = require('./slider')
const Pattern = require('../actions/pattern')
const PatternStore = require('../stores/patternStore')
const Mask = require('../util/mask')
const RenderShirt = require('./renderShirt');


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

  alt(){
    if( this.state.cut === "Three Alt" ){
      return true
    }else{
      return false
    }
  },

  componentWillReceiveProps( props ){
    this.setState({
      style: props.style,
      cut: props.cut
    })
  },

  componentDidMount(){
    Pattern.getPatterns();
    this.listen = PatternStore.addListener( this.__changePatterns );
  },

  componentWillUnmount(){
    this.listen.remove();
  },

  __changePatterns(){
    let patterns = PatternStore.getPatterns();
    let one, two, three;
    let keys = Object.keys(patterns);
    if( this.state.cut === "Three" || this.state.cut === "ThreeAlt" ){
      one = patterns[keys[0]].path;
      two = patterns[keys[0]].path;
      three = patterns[keys[0]].path;
    }else if( this.state.cut === "Two" ){
      one = patterns[keys[0]].path;
      two = patterns[keys[0]].path;
    }else{
      one = patterns[keys[0]].path;
    }
    this.setState({ patterns: patterns, one: one, two: two, three: three })
  },

  nextStep(){
  },

  prevStep(){
    this.props.enableUp( () => {
        this.context.router.push('/chooseStyle');
    });
  },

  getItems( type ){
    if( this.state.patterns ){
      let keys = Object.keys( this.state.patterns );
      return keys.map(
        function( name, index ){
          let el = this.state.patterns[ name ]
          let callback;
          if( type === 1 ){
            callback = () => { this.setState({ one: el.path }) }
          }else if( type === 2 ){
            callback = () => { this.setState({ two: el.path }) }
          }else{
            callback = () => { this.setState({ three: el.path }) }
          }
          return({
            url: el.path, name: el.id, click: callback
          })
        }.bind( this )
      );
    }else{
      return([
        { url: "./assets/images/cutImages/tank/1.png", click: () => {}, name: "One Piece" }
      ])
    }
  },

  getInterface(){
    if( this.state.cut === "Three" || this.state.cut === "Three Alt" ){
      return(
        <div className = "pattern-container">
          <div className = "third box">
            <Slider items = { this.getItems( 1 ) } title = {{ name: "" }}  size = {{ height: "25" }}
              className = "cutSlider"
            />
          </div>
          <div className = "third box">
            <Slider items = { this.getItems( 2 ) } title = {{ name: "" }}  size = {{ height: "25" }}
              className = "cutSlider"
            />
          </div>
          <div className = "third box">
            <Slider items = { this.getItems( 3 ) } title = {{ name: "" }}  size = {{ height: "25" }}
              className = "cutSlider"
            />
          </div>
        </div>
      )
    }else if( this.state.cut === "Two" ){
      return(
        <div className = "pattern-container">
          <div className = "half box">
            <Slider items = { this.getItems( 1 ) } title = {{ name: "" }}  size = {{ height: "25" }}
              className = "cutSlider"
            />
          </div>
          <div className = "half box">
            <Slider items = { this.getItems( 2 ) } title = {{ name: "" }}  size = {{ height: "25" }}
              className = "cutSlider"
            />
          </div>
        </div>
      )
    }else if( this.state.cut === "One" ){
      return(
        <div className = "pattern-container">
          <div className = "full box">
            <Slider items = { this.getItems( 1 ) } title = {{ name: "" }}  size = {{ height: "25" }}
              className = "cutSlider"
            />
          </div>
        </div>
      )
    }
  },

  render(){
    return(
      <div>
        <RenderShirt style = { this.state.style } one = { this.state.one } two = { this.state.two } three = { this.state.three } alt = { this.alt() }/>
        {
          this.getInterface()
        }
        <div className = "prev-step box button" onClick = { this.prevStep }>Back</div>
        <div className = "next-step box button" onClick = { this.nextStep }>Next</div>
        <div className = "box button-space"/>
      </div>
    )
  }
})
