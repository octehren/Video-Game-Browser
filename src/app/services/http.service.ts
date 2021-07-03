import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from 'src/models';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // ? operator means this var might be null; parameter is optional
  getGameList(
    order: string, 
    search?: string
  ): Observable<APIResponse<Game>> {
    let params:HttpParams; // immutable class, all changes return new instance

    if (search) {
      params = new HttpParams().set('ordering', order).set('search', search);
    } else {
      params = new HttpParams().set('ordering', order);
    }

    return this.http.get<APIResponse<Game>>(`${env.vidyaApiURL}/games`, {
      params: params,
    });
  }
}
