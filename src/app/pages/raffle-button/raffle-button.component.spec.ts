import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleButtonComponent } from './raffle-button.component';

describe('RaffleButtonComponent', () => {
  let component: RaffleButtonComponent;
  let fixture: ComponentFixture<RaffleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
