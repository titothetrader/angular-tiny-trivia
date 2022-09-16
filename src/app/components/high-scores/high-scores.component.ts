import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

import { scoreDetails } from 'src/app/interfaces/player';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css'],
})
export class HighScoresComponent implements OnInit, OnChanges {
  @Input() userName: string | undefined;
  @Input() playerScore: number | undefined;

  @Input() database: scoreDetails[] = [];

  @Input() newHighScore: boolean = false;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.sortHighScores();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
    } else {
      this.newHighScore = false;
    }
  }

  removeScore(database: scoreDetails) {
    this.database = [];
    this.databaseService.removeScore(database._id).subscribe(() => {
      this.loadDatabase();
    });
  }

  loadDatabase() {
    this.databaseService.getScores().subscribe((newDatabase) => {
      this.database = newDatabase;
      this.sortHighScores();
    });
  }
}
