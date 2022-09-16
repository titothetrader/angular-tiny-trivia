import { Component, OnInit } from '@angular/core';

import { scoreDetails } from 'src/app/interfaces/player';
import { DatabaseService } from 'src/app/services/database.service';
//   import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  database: scoreDetails[] = [];
  loading = true;


  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.loadDatabase();
  }

  loadDatabase() {
    this.loading = true;
    this.databaseService.getScores().subscribe(newDatabase => {
      this.database = newDatabase;
      this.loading = false;
    });
  }

  
  removeScore(database: scoreDetails) {
    this.database = [];
    this.loading = true;
    this.databaseService.removeScore(database._id).subscribe(() => {
    this.loadDatabase(); // reloading db
    })
  
   }
}
