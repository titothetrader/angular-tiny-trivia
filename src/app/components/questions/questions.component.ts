import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { scoreDetails } from 'src/app/interfaces/player';
import { Question } from 'src/app/interfaces/question';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnChanges {
  @Input() questions: Question[] = [
    {
      category: '',
      correctAnswer: '',
      incorrectAnswers: [],
      regions: [],
      question: '',
      tags: [],
      type: '',
      difficulty: '',
      id: '',
    },
  ];

  @Input() userName: string = '';
  @Input() difficulty: string = '';

  playerRightAnswers: number = 0;
  playerScore: number = 0;
  totalQuestions: number = 0;

  answeredQuestions = new Set();
  currentQuestion: number = 0;

  showHighScores: boolean = false;
  scoreMultiplier: number = 1;

  database: scoreDetails[] = [];

  newHighScore: boolean = false;

  constructor(private databaseService: DatabaseService) {
    this.answeredQuestions = new Set();
  }

  ngOnInit(): void {
    this.playerRightAnswers = 0;
    this.calculateScore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['questions']);
  }

  getSelectedResult(event: any, index: number) {
    this.answeredQuestions.add(index);
    this.getMultiplier();
    if (event === this.questions[index].correctAnswer) {
      this.playerRightAnswers += 1;
      this.currentQuestion += 1;
    } else {
      this.currentQuestion += 1;
      this.playerRightAnswers -= 1;
      this.playerRightAnswers < 0
        ? (this.playerRightAnswers = 0)
        : (this.playerRightAnswers = this.playerRightAnswers);
    }
    this.calculateScore();
  }

  calculateScore() {
    this.playerScore =
      ((this.playerRightAnswers * this.scoreMultiplier) /
        this.questions.length) *
      100;
  }

  getMultiplier() {
    switch (this.difficulty) {
      case 'easy':
        this.scoreMultiplier = 1;
        break;
      case 'medium':
        this.scoreMultiplier = 3;
        break;
      case 'hard':
        this.scoreMultiplier = 5;
        break;
      default:
        this.scoreMultiplier = 1;
    }
    console.log(this.scoreMultiplier);
  }

  submitScore() {
    this.answeredQuestions = new Set();
    this.showHighScores = true;
    this.addScore();
  }

  addScore() {
    this.databaseService
      .addScore(this.userName, this.playerScore)
      .subscribe(() => {
        this.loadDatabase(); // reloading db
      });
  }

  loadDatabase() {
    this.databaseService.getScores().subscribe((newDatabase) => {
      this.database = newDatabase;
      this.sortHighScores();
    });
  }

  sortHighScores() {
    this.database = this.database
      .sort((a, b) => {
        return b.highscore - a.highscore;
      })
      .slice(0, 15);
    this.checkNewHighScore();
  }

  checkNewHighScore() {
    if (this.database[0]?.playerName === this.userName) {
      this.newHighScore = true;
    }
  }
}
