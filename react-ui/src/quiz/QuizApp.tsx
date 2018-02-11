import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import QuizPanel from './QuizPanel';
import { Question } from './Model';
import { 
  QuizReducerState, 
  loadQuestions, LoadQuestions,
  choseOption, ChoseOption,
  checkResults, CheckResults,
} from './quizReducer';

interface StateProps {
  questions: Question[] | null;
  score: number | undefined;
  isFetching: boolean;
}

interface DispatchProps {
  loadQuestions: LoadQuestions;
  choseOption: ChoseOption;
  checkResults: CheckResults;
}

class QuizApp extends React.Component<StateProps & DispatchProps> {
  componentDidMount() {
    this.props.loadQuestions();
  }

  render() {
    const { isFetching, questions, score } = this.props;
    return (
      <div className="App-intro">
        {!questions || isFetching
          ? 'Fetching questions from API...'
          : <QuizPanel 
              questions={questions!} 
              onChange={this.props.choseOption} 
              onFinish={this.props.checkResults} 
              score={score}
          />}
      </div> 
    );
  }
}

const mapStateToProps = (state: QuizReducerState, ownProps: {}): StateProps => {
    return { ...state };
  };

const mapDispatchToProps = (dispatch: Dispatch<QuizReducerState>): DispatchProps => {
  return bindActionCreators({ loadQuestions, checkResults, choseOption }, dispatch);
};

export default connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
  )(QuizApp);
