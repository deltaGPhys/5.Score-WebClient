import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Competition } from '../models/competition';

@Injectable({
  providedIn: 'root'
})
export class CompService {

  @Inject(apiUrl) private apiUrl: string;
  private compUrl: string = apiUrl+"/competitions";
  selectedComp$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  comps: Competition[] = [];

  /** GET all competitions from server */
  getAllComps(gymId: number): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.compUrl+"/gym/"+gymId)
      .pipe(
        tap(data => {this.comps = data;}),
        catchError(this.handleError<Competition[]>('getComps'))
      )
  }

  /** GET one competition from server */
  getComp(compId: number): Observable<Competition> {
    return this.http.get<Competition>(this.compUrl+"/"+compId)
      .pipe(
        catchError(this.handleError<Competition>('getComps'))
      )
  }

  /** Change the selectedComp variable */
  chooseComp(id: number) {
    this.getComp(id).subscribe(data => this.selectedComp$.next(data));
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
