import { Question } from './Model';
import { QuizApi, ScoredResults } from './QuizApi';

// Actions
const LOAD_QUIZ_REQUEST = 'LOAD_QUIZ_REQUEST';
const LOAD_QUIZ_SUCCESS = 'LOAD_QUIZ_SUCCESS';
const CHOSE_OPTION = 'CHOSE_OPTION';
const LOAD_CHECK_RESULT_REQUEST = 'LOAD_CHECK_RESULT_REQUEST';
const LOAD_CHECK_RESULT_SUCCESS = 'LOAD_CHECK_RESULT_SUCCESS';

// Reducer
interface QuizAction {
  type: string;
  questions: Question[];
  score: number;
  chosenQuestion: number;
  chosenOption: number;
}

export interface QuizReducerState {
  questions: Question[] | null;
  score: number | undefined;
  isFetching: boolean;
}

const initialState: QuizReducerState = {
  questions: null,
  score: undefined,
  isFetching: true,
};

export const quizReducer =
(state: QuizReducerState = initialState, action: QuizAction): QuizReducerState => {
  switch (action.type) {
    case LOAD_QUIZ_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_QUIZ_SUCCESS:
      return {
        ...state,
        questions: action.questions!,
        isFetching: false,
      };
    case CHOSE_OPTION:
      return {
        ...state,
        questions: state.questions!.map((question: Question, qIndex: number) => {
          return (qIndex !== action.chosenQuestion)
            ? question
            : {
              ...question,
              chosen: action.chosenOption,
            };
        }),
      };
    case LOAD_CHECK_RESULT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_CHECK_RESULT_SUCCESS:
      return {
        ...state,
        questions: action.questions!,
        score: action.score,
        isFetching: false,
      };
    default:
      return state;
  }
};

// Action Creators
export interface LoadQuestions {
  (): (dispatch: Function) => Promise<void>;
}

export const loadQuestions: LoadQuestions = () => {
  return (dispatch: Function) => {
    dispatch({ type: LOAD_QUIZ_REQUEST });
    return QuizApi.loadQuestions().then((questions: Question[]) => {
      dispatch({ type: LOAD_QUIZ_SUCCESS, questions });
    }).catch((error: Error) => {
      throw (error);
    });
  };
};

export interface ChoseOption {
  (chosenQuestion: number, chosenOption: number): (dispatch: Function) => void;
}

export const choseOption: ChoseOption = (chosenQuestion: number, chosenOption: number) => {
  return (dispatch: Function) => {
    dispatch({ type: CHOSE_OPTION, chosenQuestion, chosenOption });
  };
};

export interface CheckResults {
  (questions: Question[]): (dispatch: Function) => Promise<void>;
}

export const checkResults: CheckResults = (chosens: Question[]) => {
  return (dispatch: Function) => {
    dispatch({ type: LOAD_CHECK_RESULT_REQUEST });
    return QuizApi.checkResults(chosens).then((results: ScoredResults) => {
      const { questions, score } = results;
      dispatch({ type: LOAD_CHECK_RESULT_SUCCESS, questions, score });
    }).catch((error: Error) => {
      throw (error);
    });
  };
};
