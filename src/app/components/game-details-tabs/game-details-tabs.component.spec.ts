import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsTabsComponent } from './game-details-tabs.component';

describe('GameDetailsTabsComponent', () => {
  let component: GameDetailsTabsComponent;
  let fixture: ComponentFixture<GameDetailsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
