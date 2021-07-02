import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from 'src/environments/environment';

@Injectable() 
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor() {}
    
    intercept( // from HttpInterceptor interface
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({ // clones request being sent, attaches API auth properties below:
            setHeaders: {
                "x-rapidapi-key": env.rapidApiKey,
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
            },
            setParams: {
                key: env.rawgDbApiKey,
            }
        });
        return next.handle(req);
    }
}