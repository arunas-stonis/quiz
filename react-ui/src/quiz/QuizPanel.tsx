import * as React from 'react';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import { Question } from './Model';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { green500, red500 } from 'material-ui/styles/colors';

interface QuizPanelProps {
  questions: Question[];
  score?: number;
  onChange: (qIndex: number, oIndex: number) => void;
  onFinish: () => void;
}

interface QuizPanelState {
  stepIndex: number;
}

class QuizPanel extends React.Component<QuizPanelProps, QuizPanelState> {
  constructor(props: QuizPanelProps) {
    super(props);
    this.state = { stepIndex: 0 };
    this.handleNext = this.handleNext.bind(this); 
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({ stepIndex: stepIndex + 1 });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleNav(index: number) {
    this.setState({ stepIndex: index });
  }

  render() {
    const { stepIndex } = this.state;
    const { questions, onChange, onFinish, score } = this.props;

    return (
      <div style={{ maxWidth: 600, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical" linear={false}>
          {questions.map((question: Question, qIndex: number) =>
            <Step 
              key={qIndex}
              completed={(question.chosen === undefined)}
            >
              <StepButton onClick={() => this.handleNav(qIndex)}>
                {question.question}
              </StepButton>
              <StepContent>
                <div>
                  <RadioButtonGroup 
                    name={String(qIndex)} 
                    defaultSelected={question.chosen}
                  >
                    {question.options.map((option: string, oIndex: number) =>
                      <RadioButton
                        key={oIndex}
                        value={oIndex}
                        label={option}
                        onClick={() => onChange(qIndex, oIndex)}
                        disabled={question.answer !== undefined}
                        labelStyle={
                          question.answer !== undefined 
                            ? question.answer === oIndex
                              ? { color: green500 }
                              : question.chosen === oIndex
                                ? { color: red500 }
                                : { }
                            : { }
                        }
                      />
                    )}
                  </RadioButtonGroup>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                    primary={true}
                  />
                  <FlatButton
                    label={'Next'}
                    style={{marginRight: 12}}
                    onClick={this.handleNext}
                    primary={true}
                  />
                </div>
              </StepContent>
            </Step>
          )}
        </Stepper>
        {score === undefined
          ? <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'left' }}>
              <RaisedButton 
                label="Finish"
                onClick={() => onFinish()}
                secondary={true}
              />
            </div>
          : <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'left' }}>
              <h3>Score: {score * 100}%</h3>
              <p>
                {questions
                  .map(question => (question.answer === question.chosen ? 1 : 0))
                  .reduce((prev: number, curr: number) => prev + curr, 0)
                }/{questions.length}
              </p>
            </div>
        }
      </div>
    );
  }
}

export default QuizPanel;