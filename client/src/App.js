import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard'
import EmplActionInterface from './components/EmplActionInterface';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} /> 
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/emplInterface/:phone/:lat/:lon" component={EmplActionInterface} />
        </Switch>
      </div>
    );
  }
}

export default App;
