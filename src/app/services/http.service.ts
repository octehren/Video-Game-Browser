import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from 'src/models';
import { forkJoin, Observable } from "rxjs";
import { map } from 'rxjs/operators';

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

  getGameDetails(
    gameId: string
  ): Observable<Game> {
    const baseUrlForReq = `${env.vidyaApiURL}/games/${gameId}`;
    const gameInfoRequest = this.http.get(baseUrlForReq);
    const gameTrailersRequest = this.http.get(`${baseUrlForReq}/movies`);
    const gameScreenshotsRequest = this.http.get(`${baseUrlForReq}/screenshots`);
    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest
    }).pipe(
      map((resp: any) => {
        const gameDetailsObj = { // spread operator, will make all of gameInfoRequest fields into fields of the returned object
          ...resp['gameInfoRequest'], 
          trailers: resp['gameTrailersRequest']?.results,
          screenshots: resp['gameScreenshotsRequest']?.results,
        };
        console.log("Game details:\n", gameDetailsObj);
        return gameDetailsObj;
      })
    );
  }
}
