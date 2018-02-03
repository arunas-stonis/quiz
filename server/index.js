const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const data = [
  {
    question: 'Please seleect a colour',
    options: ['Red', 'Apple', 'Cold', 'Ocean', 'Jazz', 'Music'],
    answer: 0,
  },
  {
    question: 'Please seleect a colour',
    options: ['Red', 'Apple', 'Cold', 'Ocean', 'Jazz', 'Music'],
    answer: 1,
  },
  {
    question: 'Please seleect a colour',
    options: ['Red', 'Apple', 'Cold', 'Ocean', 'Jazz', 'Music'],
    answer: 2,
  },
  {
    question: 'Please seleect a colour',
    options: ['Red', 'Apple', 'Cold', 'Ocean', 'Jazz', 'Music'],
    answer: 3,
  },
  {
    question: 'Please seleect a colour',
    options: ['Red', 'Apple', 'Cold', 'Ocean', 'Jazz', 'Music'],
    answer: 4,
  },
]

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

app.get('/api/answers', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(
    data.map(item => ({ 
      answer: item.answer,
    }))
  ));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
