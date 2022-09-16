import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/interfaces/question';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() title: string = '';
  @Input() categories: string[] = [];
  @Input() difficulties: string[] = [];
  @Input() questions: Question[] = [];
  @Output() userName: string = '';
 
  triviaForm: FormGroup;

  constructor(private trivia: TriviaService) {
    this.triviaForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      difficulty: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  startTrivia(): void {
    this.questions = this.trivia.getQuestions(
      this.triviaForm.value.category,
      this.triviaForm.value.difficulty
    );
    this.userName = this.triviaForm.value.userName;
  }
}
