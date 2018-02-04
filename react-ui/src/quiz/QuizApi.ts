import { Question } from './Model';
import * as _ from 'lodash';

export interface ResultResponse {
    questions: Question[];
    score: number;
}

export class QuizApi {
    static LoadQuestions(): Promise<Question[]> {
      return fetch('/api/questions')
        .then(response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
        })
        .then(questions => questions)
        .catch(error => {
          throw error;
        });
    }

    static checkResults(questions: Question[]): Promise<ResultResponse> {
        const request = new Request('/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questions),
        });
        return fetch(request)
          .then(response => {
            if (!response.ok) {
              throw new Error(`status ${response.status}`);
            }
            return response.json();
          })
          .then((result: ResultResponse) => ({
            questions: _.merge(questions, result.questions as Question[]),
            score: result.score,
          }))
          .catch(error => {
            throw error;
          });
    }
}
