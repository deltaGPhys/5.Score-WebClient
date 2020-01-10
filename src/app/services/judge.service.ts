import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { CompetitionRound } from '../models/competition-round';
import { RoundService } from './round.service';
import { Judge } from '../models/judge';
 export const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JudgeService {

  @Inject(apiUrl) private apiUrl: string;
  private judgeUrl: string = apiUrl+"/judges";
  selectedJudge$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  judges$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedRound: CompetitionRound;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private roundService: RoundService) {
    this.roundService.selectedRound$.subscribe(data => {this.selectedRound = data; this.updateJudges(this.selectedRound.id);});
  }

  /** GET all Judges for a compRound from the server */
  getAllJudges(compRoundId: number): Observable<Judge[]> {
    return this.http.get<Judge[]>(this.judgeUrl+"/round/"+compRoundId)
      .pipe(
        
        catchError(this.handleError<Judge[]>('getJudges'))
      )
  }

  /** GET one Judge from the server */
  getJudge(judgeId: number): Observable<Judge> {
    return this.http.get<Judge>(this.judgeUrl+"/"+judgeId);
  }

  /** GET Round associated with a judge from the server */
  getRoundForJudge(judgeId: number): Observable<CompetitionRound> {
    return this.http.get<CompetitionRound>(this.judgeUrl+"/single/"+judgeId);
  }

  /** Change the selectedJudge variable */
  chooseJudge(id: number) {
    this.getJudge(id).subscribe(data => this.selectedJudge$.next(data));
  }

  /** Update the Judges variable when selectedRound is changed */
  updateJudges(roundId: number) {
    if (roundId != null) {
      this.getAllJudges(this.selectedRound.id).subscribe(data => this.judges$.next(data));
    }
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
