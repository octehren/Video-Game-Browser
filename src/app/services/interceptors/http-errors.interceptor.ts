import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable, throwError as observableThrowError  } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable() 
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor() {}
    
    intercept( // from HttpInterceptor interface
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                console.log(err);
                return observableThrowError(err);
            })
        );
    }
}