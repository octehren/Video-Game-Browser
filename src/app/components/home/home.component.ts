import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sortBy!: string;

  constructor() { 
    this.initialize(); // needs to be initialized
  }

  initialize() {
    this.sortBy = "";
  }

  ngOnInit(): void {

  }

}
