import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const Index = require('./components/router');

const App = React.createClass({
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component= { Index } landing = { true }/>
    <Route path="/landing" component = { Index } landing = { true } />
    <Route path="/signIn" component = { Index } signIn = { true } />
    <Route path="/signUp" component = { Index } signUp = { true } />
    <Route path="/chooseStyle" component = { Index } chooseStyle = { true } />
    <Route path="/choosePattern/short/one" component = {Index} choosePattern = {true} cut = "One" style = "Short"/>
    <Route path="/choosePattern/short/two" component = {Index} choosePattern = {true} cut = "Two" style = "Short"/>
    <Route path="/choosePattern/short/three" component = {Index} choosePattern = {true} cut = "Three" style = "Short"/>
    <Route path="/choosePattern/short/threeAlt" component = {Index} choosePattern = {true} cut = "Three Alt" style = "Short"/>
    <Route path="/choosePattern/long/one" component = {Index} choosePattern = {true} cut = "One" style = "Long"/>
    <Route path="/choosePattern/long/two" component = {Index} choosePattern = {true} cut = "Two" style = "Long"/>
    <Route path="/choosePattern/long/three" component = {Index} choosePattern = {true} cut = "Three" style = "Long"/>
    <Route path="/choosePattern/long/threeAlt" component = {Index} choosePattern = {true} cut = "Three Alt" style = "Long"/>
    <Route path="/choosePattern/tank/one" component = {Index} choosePattern = {true} cut = "One" style = "Tank"/>
    <Route path="/choosePattern/tank/two" component = {Index} choosePattern = {true} cut = "Two" style = "Tank"/>
    <Route path="/choosePattern/tank/three" component = {Index} choosePattern = {true} cut = "Three" style = "Tank"/>
    <Route path="/choosePattern/tank/threeAlt" component = {Index} choosePattern = {true} cut = "Three Alt" style = "Tank"/>
    <Route path="/pay" component = { Index } pay = { true } />
    <Route path="/accesorize" component = { Index } accesorize = { true } />
  </Route>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Router routes={routes} history={hashHistory}>
  </Router>, document.getElementById("content")
);
});
