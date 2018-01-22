import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {time: new Date().toLocaleTimeString()};
  }

  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick() {
    this.timerId = setInterval(() => {
      console.log("tick");
      this.setState({time: new Date().toLocaleTimeString()});
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>It is now {this.state.time}</h2>
      </div>
    );
  }
}

export default App;
