import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Zone } from '../models/zone';
import { tap, catchError } from 'rxjs/operators';
import { CompetitionRound } from '../models/competition-round';
import { RoundService } from './round.service';
export const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  @Inject(apiUrl) private apiUrl: string;
  private zoneUrl: string = apiUrl+"/zones";
  selectedZone$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  zones$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedRound: CompetitionRound;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private roundService: RoundService) {
    this.roundService.selectedRound$.subscribe(data => {this.selectedRound = data; this.updateZones(this.selectedRound.id);});
  }

  /** GET all zones for a compRound from the server */
  getAllZones(compRoundId: number): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.zoneUrl+"/round/"+compRoundId)
      .pipe(
        
        catchError(this.handleError<Zone[]>('getzones'))
      )
  }

  /** GET one Zone from the server */
  getZone(zoneId: number): Observable<Zone> {
    return this.http.get<Zone>(this.zoneUrl+"/"+zoneId);
  }

  /** Change the selectedZone variable */
  chooseZone(id: number) {
    this.getZone(id).subscribe(data => this.selectedZone$.next(data));
  }

  /** Update the zones variable when selectedRound is changed */
  updateZones(roundId: number) {
    if (roundId != null) {
      this.getAllZones(this.selectedRound.id).subscribe(data => this.zones$.next(data));
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
