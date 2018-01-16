const React = require('react');
const Canv = require('./canv')

module.exports = React.createClass({
  getInitialState(){
    return({
      image: this.props.el.path,
      canvas: this.props.el.images,
      title: this.props.el.name,
      index: this.props.index,
      scroll: this.props.scrollIndex,
      opacity: this.props.opacity,
      lock: this.props.lock
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      image: props.el.path,
      canvas: this.props.el.images,
      title: props.el.name,
      index: props.index,
      scroll: props.scrollIndex,
      opacity: props.opacity,
      lock: props.lock
    })
  },

  dragStart( e ){
    if( !this.state.pattern ){
      this.setState({ startTime: new Date().getTime() ,touch: e.touches[0] })
    }
  },

  drag( e ){
    if( !this.state.pattern ){
      this.setState({ move: e.touches[0] })
    }
  },

  dragEnd(){
    if( !this.state.touch || !this.state.touch.clientX || !this.state.touch.clientY || !this.state.move || !this.state.move.clientX || !this.state.move.clientY ){
      return
    }
    let time = new Date().getTime();
    if( (time - this.state.startTime) / 1000 > .1 ){
      let diffX = this.state.touch.clientX - this.state.move.clientX;
      let diffY = this.state.touch.clientY - this.state.move.clientY;
      if(
        this.state.move &&
        this.state.touch &&
        ( Math.abs( diffX ) > 80 ||  Math.abs( diffY ) > 40 )
      ){
        if( Math.abs( diffX ) > Math.abs( diffY ) ){
          if( !this.state.lock ){
            if( diffX > 0 ){
              this.props.add();
            }else if( diffX < 0 ){
              this.props.sub();
            }
          }
        }else{
          console.log(diffY);
          if( diffY > 0 ){
            this.props.next();
          }else{
            this.props.prev();
          }
        }
      }
    }
  },

  applyScrollIndex(){
    return({
      left: ( this.state.index - ( this.state.scroll ) ) * 120 + "vw"
    })
  },

  getTitle(){
    let opacity = 1;
    if( this.state.opacity ){
      opacity = .2;
    }
    if( this.state.index === this.state.scroll ){
      return({
        marginLeft: ( this.state.index - ( this.state.scroll ) ) * 100 + "vw",
        opacity: opacity
      })
    }else{
      return({
        opacity: opacity
      })
    }
  },

  click(){
    this.props.back();
  },


  getMapStyle( el, index ){
    if( this.state.index === this.state.scroll ){
      let style = {
        backgroundImage: `url('${el.path}')`
      }
      let params;
      if( el.animation.end ){
        params = Object.keys( el.animation.begin );
      }else{
        params = [];
      }
      for (var i = 0; i < params.length; i++) {
        let param = params[i];
        let value = el.animation.end[param];
        style[param] = value;
      }
      return( style )
    }else{
      let style = {
        backgroundImage: `url('${el.path}')`
      }
      let params;
      if( el.animation.end ){
        params = Object.keys( el.animation.begin );
      }else{
        params = [];
      }
      for (var i = 0; i < params.length; i++) {
        let param = params[i];
        let value = el.animation.begin[param];
        style[param] = value;
      }
      return( style )
    }
  },

  mapCanvas(){
    return this.state.canvas.map(
      function( el, index ){
        return(
          <div key = {index + "ass"} style = { this.getMapStyle( el, index ) } id = { `img${index}` } className = "image"></div>
        )
      }.bind( this )
    );
  },

  image(){
    if( this.state.canvas ){
      return(
        this.mapCanvas()
      )
    }else{
      return(
        <div className = "image" style = {{ backgroundImage: `url('${this.state.image}')` }}></div>
      )
    }

  },

  render(){
    return(
      <div className = "scroll" style = { this.applyScrollIndex() } onTouchStart = { this.dragStart } onTouchEnd = { this.dragEnd } onTouchMove = { this.drag }>
        {
          this.image()
        }
        <div className = "name">{ this.state.title }</div>
      </div>
    )
  }
})
