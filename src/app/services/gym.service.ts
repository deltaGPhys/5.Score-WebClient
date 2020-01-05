import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, BehaviorSubject } from 'rxjs';
import { Gym } from '../models/gym';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GymService {
  
  @Inject(apiUrl) private apiUrl: string;
  private gymUrl: string = apiUrl+"/gyms";
  gyms: Gym[] = [];
  selectedGym$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /** GET all gyms from the server */
  getAllGyms(): Observable<Gym[]> {
    return this.http.get<Gym[]>(this.gymUrl)
      .pipe(
        tap(data => {this.gyms = data;}),
        catchError(this.handleError<Gym[]>('getGyms'))
      )
  }

  /** Pull a gym from existing gym list */
  openGym(id: number): Observable<Gym> {
    let result: Gym = this.gyms.filter(gym => gym.id == id)[0];
    return of(result);
  }

  /** GET one gym from the server */
  getGym(id: number): Observable<Gym> {
    return this.http.get<Gym>(this.gymUrl+"/"+id)
      .pipe(
        //tap(data => {this.gyms = data;}),
        catchError(this.handleError<Gym>('getGyms'))
      )
  }

  /** Change the selectedGym variable */
  chooseGym(id: number) {
    this.getGym(id).subscribe(data => this.selectedGym$.next(data));
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


