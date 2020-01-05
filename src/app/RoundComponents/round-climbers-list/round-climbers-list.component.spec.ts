import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundClimbersListComponent } from './round-climbers-list.component';

describe('RoundClimbersListComponent', () => {
  let component: RoundClimbersListComponent;
  let fixture: ComponentFixture<RoundClimbersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundClimbersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundClimbersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
