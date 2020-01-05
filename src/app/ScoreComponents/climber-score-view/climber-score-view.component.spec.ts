import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimberScoreViewComponent } from './climber-score-view.component';

describe('ClimberScoreViewComponent', () => {
  let component: ClimberScoreViewComponent;
  let fixture: ComponentFixture<ClimberScoreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimberScoreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimberScoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
