const React = require('react');
const Mask = require('../util/mask')

module.exports = React.createClass({

  getInitialState(){
    let masks = this.getMasks( this.props );
    let originals = this.getOriginals( this.props );
    return({
      alt: this.props.alt,
      style: this.props.style,
      masks: masks,
      originals: originals,
      queue: []
    })
  },

  componentWillReceiveProps( props ){
    let masks = this.getMasks( props );
    let originals = this.getOriginals( props );
    if( props.one !== this.state.one || ( !this.state.one && props.one) ){
      this.changePattern( props.one, masks[0], originals );
    }

    if( props.two !== this.state.two || ( !this.state.two && props.two) ){
      this.changePattern( props.two, masks[1], originals );
    }

    if( props.three !== this.state.three || ( !this.state.three && props.three) ){
      this.changePattern( props.three, masks[2], originals );
    }

    this.setState({
      one: props.one,
      two: props.two,
      three: props.three,
      alt: props.alt,
      style: props.style,
      masks: masks,
      originals: originals
    }, this.preload)
  },

  getMasks( props ){
    if( props.three ){
      if( props.alt ){
        return([
          {
            url: "./assets/images/masks/4/1.png"
          },
          {
            url: "./assets/images/masks/4/2.png"
          },
          {
            url: "./assets/images/masks/4/3.png"
          },
        ])
      }else{
        return([
          {
            url: "./assets/images/masks/3/1.png"
          },
          {
            url: "./assets/images/masks/3/2.png"
          },
          {
            url: "./assets/images/masks/3/3.png"
          },
        ])
      }
    }else if( props.two ){
      return([
        {
          url: "./assets/images/masks/2/1.png"
        },
        {
          url: "./assets/images/masks/2/2.png"
        },
      ])
    }else{
      return([
        {
          url: "./assets/images/masks/1/1.png"
        }
      ])
    }
  },

  getOriginals( props ){
    if( props.style === "Short" ){
      return(
        {
          url:"./assets/images/shirt_final/normal/1/1.png"
        }
      )
    }else if( props.style === "Long" ){
      return(
        {
          url:"./assets/images/shirt_final/long/1/1.png"
        }
      )
    }else{
      return(
        {
          url:"./assets/images/shirt_final/tank/1/1.png"
        }
      )
    }
  },

  componentDidMount(){
    let canvas = this.refs.canvas;
    canvas.style.pointerEvents = "none";
    let ctx = canvas.getContext("2d");
    canvas.width = this.refs.container.offsetWidth;
    canvas.height = this.refs.container.offsetHeight;
    this.refs.container.appendChild( canvas );
    this.setState({ canvas: canvas, ctx: ctx })
  },

  preload(){
    this.loadMasks( () => { this.loadOriginals( this.drawCanvas ) } );
  },

  loadMasks( callback ){
    let count = 0;
    for (var i = 0; i < this.state.masks.length; i++) {
      let img = new Image;
      let mask = this.state.masks[i]
      img.onload = function(){
        count++;
        if( count === this.state.masks.length - 1 ){
          callback()
        }
      }.bind( this )
      img.src = mask.url;
    }
  },

  loadOriginals( callback ){
    let count = 0;
    let image = new Image;
    image.onload = callback;
    image.src = this.state.originals.url;
  },

  changePattern( patt, msk, orig ){
    let pattern = new Image();
    let obj = {}
    pattern.src = patt;
    pattern.dataset["url"] = patt;
    pattern.onload = () => { obj.pattern = pattern; this.checkLoaded() }
    let mask = new Image();
    mask.src = msk.url;
    mask.dataset["url"] = msk.url;
    mask.onload = () => { obj.mask = mask; this.checkLoaded() }
    let original = new Image();
    original.src = orig.url;
    original.dataset["url"] = orig.url;
    original.onload = () => { obj.original = original; this.checkLoaded() }
    this.state.queue.push( obj );
  },

  checkLoaded(){
    if( this.state.queue[0] ){
      if( this.state.queue[0].pattern &&
        this.state.queue[0].mask &&
        this.state.queue[0].original ){
        let mask = this.state.queue[0].mask;
        let pattern = this.state.queue[0].pattern;
        let original = this.state.queue[0].original;
        Mask.maskImage( pattern, mask, original, 5, this.refs.container.offsetHeight / 8, this.state.canvas, this.state.ctx );
        this.setState({ patternLoaded: false, maskLoaded: false, originalLoaded: false })
        this.state.queue.shift();
      }else{
        window.setTimeout( this.checkLoaded, 200 );
      }
    }
  },

  render(){
    return(
      <div ref = "container" className = "chooseStyle box">
        <div className = "slider">
          <div className = "step">Design</div>
        </div>
        <canvas ref = "canvas" className = "patt-canv"/>
      </div>
    )
  }
})
