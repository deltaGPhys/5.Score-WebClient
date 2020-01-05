import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Competition } from '../models/competition';
import { CompetitionRound } from '../models/competition-round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  @Inject(apiUrl) private apiUrl: string;
  private compUrl: string = apiUrl+"/competitionRounds";
  selectedRound$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  zoneWindow$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  peopleWindow$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  rounds: CompetitionRound[] = [];

  /** GET all CompetitionRounds from the server */
  getAllRounds(compId: number): Observable<CompetitionRound[]> {
    return this.http.get<CompetitionRound[]>(this.compUrl+"/competition/"+compId)
      .pipe(
        tap(data => {this.rounds = data;}),
        catchError(this.handleError<CompetitionRound[]>('getRounds'))
      )
  }

  /** GET one CompetitionRound from the server */
  getRound(roundId: number): Observable<CompetitionRound> {
    return this.http.get<CompetitionRound>(this.compUrl+"/"+roundId);
  }

  /** Change the selectedRound variable */
  chooseRound(id: number) {
    this.getRound(id).subscribe(data => this.selectedRound$.next(data));
  }

  changeZoneWindow(choice: string) {
    this.zoneWindow$.next(choice);
  }

  changePeopleWindow(choice: string) {
    this.peopleWindow$.next(choice);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}