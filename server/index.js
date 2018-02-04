const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const _ = require('lodash');

const app = express();
const PORT = process.env.PORT || 5000;

const data = [
  {
    question: 'Please seleect a colour',
    options: [
      'Red', 
      'Apple', 
      'Cold', 
      'Ocean', 
      'Jazz', 
      'Music'
    ],
    answer: 0,
  },
  {
    question: 'What is "React"?',
    options: [
      'A winner of Eurovision 2017', 
      'JavaScript library developed by Facebook', 
      'Name of the first Atomic bomb'
    ],
    answer: 1,
  },
  {
    question: 'What is DOM?',
    options: [
      'Best TV movie 2017', 
      'A city where React have born', 
      'Document Object Model (DOM) is a programming API for documents'
    ],
    answer: 2,
  },
  {
    question: 'What is JSX?',
    options: [
      'A popular band group in Europe',
      'Improved Java library. It stands for Java String Extensions', 
      'A new planet in solar system', 
      'A syntax extension to JavaScript',
      'React internal engine for time travel'
    ],
    answer: 3,
  },
  {
    question: 'What is Redux time travel?',
    options: [
      'New style of music', 
      'An old method of accounting', 
      'New crypto-currency', 
      'An algorythm which find the bugs while replying git commits', 
      'A possibility to inspect the state and travel back in time to a previous application state without reloading'
    ],
    answer: 4,
  },
]

app.use(bodyParser.json())

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api/questions', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(
    data.map(item => ({ 
      question: item.question,
      options: item.options,
    }))
  ));
});

app.post('/api/answers', function (req, res) {
  const chosen = req.body;
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({
    questions: data.map(item => ({ 
      answer: item.answer,
    })),
    score: _.merge(data, chosen)
      .map(question => (question.answer === question.chosen ? 1 : 0))
      .reduce((prev, curr) => prev + curr, 0) / data.length,
  }));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
