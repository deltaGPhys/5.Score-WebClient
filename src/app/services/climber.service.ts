import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Zone } from '../models/zone';
import { tap, catchError } from 'rxjs/operators';
import { CompetitionRound } from '../models/competition-round';
import { RoundService } from './round.service';
import { Climber } from '../models/climber';
 export const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ClimberService {
  @Inject(apiUrl) private apiUrl: string;
  private climberUrl: string = apiUrl+"/climbers";
  selectedClimber$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  climbers$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedRound: CompetitionRound;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private roundService: RoundService) {
    this.roundService.selectedRound$.subscribe(data => {this.selectedRound = data; this.updateClimbers(this.selectedRound.id);});
  }

  /** GET all Climbers for a compRound from the server */
  getAllClimbers(compRoundId: number): Observable<Climber[]> {
    return this.http.get<Climber[]>(this.climberUrl+"/round/"+compRoundId)
      .pipe(
        
        catchError(this.handleError<Climber[]>('getClimbers'))
      )
  }

  /** GET one Climber from the server */
  getClimber(ClimberId: number): Observable<Climber> {
    return this.http.get<Climber>(this.climberUrl+"/"+ClimberId);
  }

  /** Change the selectedClimber variable */
  chooseClimber(id: number) {
    this.getClimber(id).subscribe(data => this.selectedClimber$.next(data));
  }

  /** Update the Climbers variable when selectedRound is changed */
  updateClimbers(roundId: number) {
    if (roundId != null) {
      this.getAllClimbers(this.selectedRound.id).subscribe(data => this.climbers$.next(data));
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
