import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models';

@Component({
  selector: 'app-game-details-tabs',
  templateUrl: './game-details-tabs.component.html',
  styleUrls: ['./game-details-tabs.component.scss']
})
export class GameDetailsTabsComponent implements OnInit {
  @Input() game!: Game;

  constructor() { }

  ngOnInit(): void {
    
  }

}
