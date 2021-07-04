import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  public gameRating:number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  getColor(value: number): string {
    let hexColor:string;
    if (value > 75) {
      hexColor = "#5ee432";
    } else if (value > 50) {
      hexColor = "#fffa50";
    } else if (value > 30) {
      hexColor = "f7aa38";
    } else {
      hexColor = "#ef4655";
    }
    return hexColor;
  }

}
