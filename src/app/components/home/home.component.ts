import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { APIResponse, Game } from 'src/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sortBy!: string;
  public games!: Array<Game>;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.initialize(); // needs to be initialized
  }

  initialize() {
    this.sortBy = "";
  }

  ngOnInit(): void { // first phase in component lifecycle
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) { // if there are search params, perform search
        this.fetchGamesData('metacritic', params['game-search']); // sort results by score by default
      } else {
        this.fetchGamesData('metacritic');
      }
    });
  }

  fetchGamesData(sortBy: string, search?: string):void {
    this.httpService
      .getGameList(sortBy, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log("Fetched games:\n", gameList);
      });
  }

}
