import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Competition } from '../models/competition';
import { CompetitionRound } from '../models/competition-round';
import { ZoneService } from './zone.service';
import { Zone } from '../models/zone';
import { Route } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  @Inject(apiUrl) private apiUrl: string;
  private routeUrl: string = apiUrl+"/routes";
  selectedRoute$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  routes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedZone: Zone;

  constructor(private http: HttpClient, private zoneService: ZoneService) {
    this.zoneService.selectedZone$.subscribe(data => {this.selectedZone = data; this.updateRoutes(this.selectedZone.id);});
  }

  /** GET all Routes for a compRound from the server */
  getAllRoutes(zoneId: number): Observable<Route[]> {
    return this.http.get<Route[]>(this.routeUrl+"/round/"+zoneId)
      .pipe(
        catchError(this.handleError<Route[]>('getRoutes'))
      )
  }

  /** GET one Route from the server */
  getRoute(routeId: number): Observable<Route> {
    return this.http.get<Route>(this.routeUrl+"/"+routeId);
  }

  /** PUT Route: edit route properties */
  editRoute (editedRoute: Route) {
    return this.http.put<Route>(this.routeUrl+"/"+editedRoute.id,editedRoute)
      .pipe(
        tap(data => {this.selectedRoute$.next(data); this.updateRoutes(this.selectedZone.id);}),
        catchError(this.handleError<Route>('editRoute'))
      )
  }

  /** POST Route: edit route properties */
  createRoute (newRoute: Route) {
    return this.http.post<Route>(this.routeUrl,newRoute)
      .pipe(
        tap(data => {this.updateRoutes(this.selectedZone.id);}),
        catchError(this.handleError<Route>('editRoute'))
      )
  }

  /** Change the selectedRoute variable */
  chooseRoute(id: number) {
    this.getRoute(id).subscribe(data => this.selectedRoute$.next(data));
  }

  /** Update the Routes variable when selectedZone is changed */
  updateRoutes(zoneId: number) {
    if (zoneId != null) {
      this.getAllRoutes(zoneId).subscribe(data => this.routes$.next(data));
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
