import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount } from 'enzyme';
import * as expect from  'expect';
import QuizPanel, { QuizPanelProps } from './QuizPanel';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

function setup() {
  configure({ adapter: new Adapter() });

  const muiTheme = getMuiTheme();

  const props: QuizPanelProps = {
    questions: [{
      question: 'Test',
      options: ['1', '2', '3'],
      chosen: undefined,
      answer: undefined, 
    }],
    onChange: () => undefined,
    onFinish: () => undefined,
    score: undefined,
  };

  return mount(
    <QuizPanel {...props} />, {
      context: {muiTheme},
      childContextTypes: {muiTheme: PropTypes.object}
    }
  );
}

describe('QuizPanel', () => {
  const wrapper = setup();

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('has one Question', () => {
    expect(wrapper.find('Step').length).toEqual(1);
  });

  it('has one Question with 3 options', () => {
    expect(wrapper.find('RadioButton').length).toEqual(3);
  });
  
  it('the first question has disabled Back button', () => {
    console.log(wrapper.find('Step'));
    expect(wrapper.find('Step').at(0).find('FlatButton').at(0).props().disabled).toEqual(true);
  });
  
});
