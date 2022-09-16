import { Component, OnInit } from '@angular/core';
import { TriviaService } from './services/trivia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Tiny Trivia';

  categories: string[] = [];
  difficulties: string[] = ['easy', 'medium', 'hard'];

  constructor(private trivia: TriviaService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories = this.trivia.getCategories();
  }
}
