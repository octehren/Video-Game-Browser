import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { APIResponse, Game } from 'src/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sortBy!: string;
  public games?: Array<Game>;
  // refactor: register subscriptions as attributes to avoid memory leaks
  private routeSub?:Subscription;
  private gameSub?:Subscription;
  

  // connect http service & router
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.initialize(); // needs to be initialized
  }

  initialize() {
    this.sortBy = "";
  }
  // on first render, fetch game data sorted by metacritic score
  ngOnInit(): void { // first phase in component lifecycle
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) { // if there are search params, perform search
        this.fetchGamesData('metacrit', params['game-search']); // sort results by score by default
      } else {
        this.fetchGamesData('metacrit'); // API looks for 'metacrit', not 'metacritic'
      }
    });
  }

  fetchGamesData(sortBy: string, search?: string):void {
    this.gameSub = this.httpService
      .getGameList(sortBy, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log("Fetched games:\n", gameList.results);
      });
  }

  openGameDetails(gameId: number):void {
    this.router.navigate(['details', gameId]);
    console.log("Opening details page for Game #", gameId, "\n");
  }

}
