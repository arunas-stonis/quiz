import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import QuizApp from './quiz/QuizApp';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">

          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React Quiz</h2>
          </div>

          <QuizApp />  

          <div className="App-footer">
            Good luck!
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
