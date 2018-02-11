import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import QuizApp from './quiz/QuizApp';
import { quizReducer } from './quiz/quizReducer';
import ReduxThunk from 'redux-thunk';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={createStore(quizReducer, applyMiddleware(ReduxThunk))}>
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
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
