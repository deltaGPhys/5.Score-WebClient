import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  /** authenticate admin user from backend */
  verifyUser(email: string, password: string): Observable<User> {
    //Todo: authenticate admin user from backend
    let user = new User();
    user.id = 1;
    user.email = "spam@aol.com";
    this.currentUser$.next(user);
    return of(user);
  }
}
