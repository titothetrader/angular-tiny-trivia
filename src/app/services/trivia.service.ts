import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Question } from '../interfaces/question';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  @Output() categories: string[] = [];
  @Output() questions: Question[] = [];

  question: Question;

  constructor(private httpClient: HttpClient) {
    this.question = {
      category: '',
      correctAnswer: '',
      incorrectAnswers: [],
      regions: [],
      question: '',
      tags: [],
      type: '',
      difficulty: '',
      id: '',
    };
  }

  getCategories(): string[] {
    this.httpClient
      .get(environment.triviaURL + 'categories')
      .pipe(
        map((response) => {
          for (let key in response) {
            this.categories.push(key);
          }
        })
      )
      .subscribe((response) => {
        // console.log(this.categories);
      });
    return this.categories;
  }

  getQuestions(category: string, difficulty: string): Question[] {
    this.questions.length = 0;
    let questionURL =
      environment.triviaURL +
      'questions?categories=' +
      category +
      '&difficulty=' +
      difficulty +
      '&region=US&limit=5';
    this.httpClient
      .get<Question[]>(questionURL)
      .pipe(
        map((response) => {
          for (let index in response) {
            this.questions.push(response[index]);
          }
        })
      )
      .subscribe((response) => {
        // console.log(response);
      });
    return this.questions;
  }
}
