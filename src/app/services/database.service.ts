import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { scoreDetails } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private baseUrl = environment.databaseURL;
  private apiKey = environment.databaseKey;

  constructor(private http: HttpClient) {}

  getScores(): Observable<scoreDetails[]> {
    return this.http.get<scoreDetails[]>(`${this.baseUrl}`, {
      headers: { 'x-api-key': this.apiKey },
    });
  }
  addScore(userName: string, playerScore: number): Observable<scoreDetails> {
    let NewScore: scoreDetails = {
      playerName: userName,
      highscore: playerScore,
    };
    return this.http.post<scoreDetails>(`${this.baseUrl}`, NewScore, {
      headers: { 'x-api-key': this.apiKey },
    });
  }
  removeScore(_id?: string): Observable<void> {
    if (!_id) {
      return of();
    }
    return this.http.delete<void>(`${this.baseUrl}/${_id}`, {
      headers: { 'x-api-key': this.apiKey },
    });
  }
}
