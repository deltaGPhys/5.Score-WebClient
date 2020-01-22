import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private localStorageService: LocalStorageService) {

    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.localStorageService.retrieve("authenticationToken");
        console.log("Token",idToken);
        console.log(req);

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            console.log(cloned);
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}