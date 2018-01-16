const React = require('react');
const Order = require('./order');
const Style = require('./style');
const Table = require('./table');


module.exports = React.createClass({
  getInitialState(){
    return({
      pattern: false,
      shirts: [
        { type: "one" },
        { type: "two" },
        { type: "three" },
        { type: "four" }
      ],
      chosen: {},
      scroll: 0,
      order: false,
    })
  },

  design(){
    let shirt = this.state.shirts[ Math.abs(this.state.scroll) ];
    this.setState({ pattern: shirt });
  },

  leftClick(){
    if( this.state.scroll < 0 ){
      this.setState({ scroll: this.state.scroll + 1 });
    }
  },

  rightClick(){
    if( this.state.scroll >= ( 2 - this.state.shirts.length ) ){
      this.setState({ scroll: this.state.scroll - 1 });
    }
  },

  clickOption( name, image ){
    let chosen = this.state.chosen;
    chosen[name] = image;
    this.setState({ chosen: chosen })
  },

  table(){
    if( this.state.pattern && !this.state.order ){
      return(
        <Table order = { this.order } back = { this.back } clickOption = { this.clickOption } pattern = { this.state.pattern } ></Table>
      )
    }
  },

  getStyle(){
    if( this.state.order ){
      return({
        bottom: "100vh"
      })
    }else if( this.state.pattern ){
      return({
        bottom: "35vh"
      })
    }
  },

  orderPage(){
    if( this.state.order ){
      return(
        <Order back = { this.orderBack }></Order>
      )
    }
  },

  controlls(){
    if( !this.state.pattern ){
      return(
        <div>
          <div className = "left-arrow" onClick = { this.leftClick }></div>
          <div className = "right-arrow" onClick = { this.rightClick }></div>
          <div className = "style-design" onClick = { this.design }>Design Shirt</div>
        </div>
      )
    }
  },

  mapShirts(){
    return this.state.shirts.map(
      function( el, index ){
        return(
          <Style order = { this.state.order } chosen = { this.state.chosen } key = { index } pattern = { this.state.pattern } type = { el.type } index = { index } scroll = { this.state.scroll }></Style>
        )
      }.bind( this )
    )
  },

  dragStart( e ){
    if( !this.state.pattern ){
      this.setState({ startTime: new Date().getTime() ,touch: e.touches[0].clientX })
    }
  },

  drag( e ){
    if( !this.state.pattern ){
      this.setState({ move: e.touches[0].clientX })
    }
  },

  dragEnd( e ){
    if( !this.state.pattern ){
      let time = new Date().getTime();
      if( (time - this.state.startTime) / 1000 > .1 ){
        if( Math.abs( this.state.move && this.state.touch && this.state.touch - this.state.move ) > 80 ){
          if( this.state.touch - this.state.move > 0 ){
            this.rightClick();
          }else if( this.state.touch - this.state.move < 0 ){
            this.leftClick();
          }
        }
      }else{
        this.design();
      }
    }

    this.setState({ touch: false, move: false })
  },

  render(){
    return(
      <div>

        <div className = "shirt-container" style = { this.getStyle() } onTouchStart = { this.dragStart } onTouchEnd = { this.dragEnd } onTouchMove = { this.drag }>
          {
            this.mapShirts()
          }
          {
            this.controlls()
          }
          {
            this.orderPage()
          }

        </div>
        {
          this.table()
        }
      </div>
    )
  }
})
