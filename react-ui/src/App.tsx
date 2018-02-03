import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import QuizPanel from './quiz/QuizPanel';
import { Question } from './quiz/Model';
import * as _ from 'lodash';

const logo = require('./logo.svg');

interface AppState {
  questions: Question[] | null;
  answered: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      questions: null,
      answered: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    fetch('/api/questions')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(questions => this.setState({ questions }))
      .catch(e => {
        this.setState({ questions: null });
        alert(e);
      });
  }

  onChange(chosenQuestion: number, chosenOption: number) {
    const { questions } = this.state;
    this.setState({
      questions: questions!.map((question: Question, qIndex: number) => {
        return (qIndex !== chosenQuestion)
          ? question
          : {
            ...question,
            chosen: chosenOption,
            };
      }),
    });
  }

  onFinish() {
    const { questions } = this.state;
    fetch('/api/answers')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(answers => this.setState({
        questions: _.merge(questions, answers),
        answered: true,
      }))
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { questions, answered } = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">

          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React Quiz</h2>
          </div>

          <div className="App-intro">
            {!questions
              ? 'Fetching questions from API...'
              : <QuizPanel 
                  questions={questions!} 
                  onChange={this.onChange} 
                  onFinish={this.onFinish} 
                  answered={answered}
              />}
          </div> 

          <div className="App-footer">
            Thank you!
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
