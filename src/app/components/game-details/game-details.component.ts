import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Game } from 'src/models';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  public gameRating: number = 0;
  public gameId!: string;
  public game!: Game;
  private routeSub?: Subscription;
  private gameSub?: Subscription;

  constructor(
    private  ActivatedRoute: ActivatedRoute, // provides with API of the route once activated
    private httpService: HttpService // custom service to communicate with api
  ) { }

  ngOnInit(): void {
    // activatedRoute gets from active route in url bar
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['gameId'];
      this.setGameDetails(this.gameId);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

  setGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        })
      });
  }

  getColor(value: number): string {
    let hexColor:string;
    if (value > 75) {
      hexColor = "#5ee432";
    } else if (value > 50) {
      hexColor = "#fffa50";
    } else if (value > 30) {
      hexColor = "#f7aa38";
    } else {
      hexColor = "#ef4655";
    }
    return hexColor;
  }

}
