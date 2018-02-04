import * as React from 'react';
import QuizPanel from './QuizPanel';
import { Question } from './Model';
import { QuizApi } from './QuizApi';

interface QuizAppState {
  questions: Question[] | null;
  score: number | undefined;
}

class QuizApp extends React.Component<{}, QuizAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      questions: null,
      score: undefined,
    };
    this.onChange = this.onChange.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    QuizApi.LoadQuestions()
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
    QuizApi.checkResults(questions!)
      .then(result => this.setState({
        questions: result.questions,
        score: result.score,
      }))
      .catch(e => {
        this.setState({ questions: null });
        alert(e);
      });
  }

  render() {
    const { questions, score } = this.state;
    return (
      <div className="App-intro">
        {!questions
          ? 'Fetching questions from API...'
          : <QuizPanel 
              questions={questions!} 
              onChange={this.onChange} 
              onFinish={this.onFinish} 
              score={score}
          />}
      </div> 
    );
  }
}

export default QuizApp;
