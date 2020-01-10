import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringPaneComponent } from './scoring-pane.component';

describe('ScoringPaneComponent', () => {
  let component: ScoringPaneComponent;
  let fixture: ComponentFixture<ScoringPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
