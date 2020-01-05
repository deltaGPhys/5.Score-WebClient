import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundClimberViewComponent } from './round-climber-view.component';

describe('RoundClimberViewComponent', () => {
  let component: RoundClimberViewComponent;
  let fixture: ComponentFixture<RoundClimberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundClimberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundClimberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
