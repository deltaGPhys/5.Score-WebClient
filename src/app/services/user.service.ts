import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthResponse } from '../models/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth-request';
import { tap } from 'rxjs/operators';
export const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  @Inject(apiUrl) private apiUrl: string;
  private authUrl: string = apiUrl+"/api/auth";
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** authenticate admin user from backend */
  verifyUser(email: string, password: string): Observable<User> {
    //Todo: authenticate admin user from backend
    let user = new User();
    user.id = 1;
    user.email = "spam@aol.com";
    this.currentUser$.next(user);
    return of(user);
  }

  /** authenticate admin user from backend */
  authenticate(username: string, password: string): Observable<boolean> {
    console.log("AUTH");
    //Todo: authenticate admin user from backend
    let request: AuthRequest = new AuthRequest();
    request.username = username;
    request.password = password;
    console.log(request);
    console.log(this.authUrl+"/login");
    this.http.post<AuthResponse>(this.authUrl+"/login",request,this.httpOptions).subscribe(data => {
        console.log("data",data);
        this.localStorageService.store("username", data.username);
        this.localStorageService.store("authenticationToken", data.token);
      });
    
    return of(true);
  }
}
